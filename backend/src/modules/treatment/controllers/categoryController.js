import TreatmentCategory from '../models/TreatmentCategory.js';
import Treatment from '../models/Treatment.js';

/**
 * Get all categories with their subcategories
 */
export const getAllCategories = async (req, res) => {
  try {
    const { type } = req.query;
    
    const query = { isActive: true };
    if (type) {
      query.type = type;
    }
    
    const categories = await TreatmentCategory.find(query)
      .sort({ order: 1, name: 1 });
    
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message,
    });
  }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await TreatmentCategory.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category',
      error: error.message,
    });
  }
};

/**
 * Create a new category
 */
export const createCategory = async (req, res) => {
  try {
    const { name, type, description, icon, subcategories } = req.body;
    
    // Check if category already exists
    const existingCategory = await TreatmentCategory.findOne({ name, type });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists',
      });
    }
    
    const category = await TreatmentCategory.create({
      name,
      type,
      description,
      icon,
      subcategories: subcategories || [],
    });
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create category',
      error: error.message,
    });
  }
};

/**
 * Add or get category (auto-create if doesn't exist)
 */
export const getOrCreateCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({
        success: false,
        message: 'Category name and type are required',
      });
    }
    
    const category = await TreatmentCategory.getOrCreate(name, type);
    
    res.status(200).json({
      success: true,
      data: category,
      created: category.createdAt === category.updatedAt,
    });
  } catch (error) {
    console.error('Error getting/creating category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get or create category',
      error: error.message,
    });
  }
};

/**
 * Add subcategory to a category
 */
export const addSubcategory = async (req, res) => {
  try {
    const { categoryName, type, subcategoryName, description } = req.body;
    
    if (!categoryName || !type || !subcategoryName) {
      return res.status(400).json({
        success: false,
        message: 'Category name, type, and subcategory name are required',
      });
    }
    
    // Get or create the category
    let category = await TreatmentCategory.getOrCreate(categoryName, type);
    
    // Check if subcategory already exists
    const exists = category.subcategories.some(
      sub => sub.name.toLowerCase() === subcategoryName.toLowerCase()
    );
    
    if (exists) {
      return res.status(200).json({
        success: true,
        message: 'Subcategory already exists',
        data: category,
        created: false,
      });
    }
    
    // Add the subcategory
    category.subcategories.push({
      name: subcategoryName,
      description: description || '',
      createdAt: new Date(),
    });
    
    await category.save();
    
    res.status(200).json({
      success: true,
      message: 'Subcategory added successfully',
      data: category,
      created: true,
    });
  } catch (error) {
    console.error('Error adding subcategory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add subcategory',
      error: error.message,
    });
  }
};

/**
 * Get all subcategories for a category
 */
export const getSubcategories = async (req, res) => {
  try {
    const { categoryName, type } = req.query;
    
    if (!categoryName || !type) {
      return res.status(400).json({
        success: false,
        message: 'Category name and type are required',
      });
    }
    
    const category = await TreatmentCategory.findOne({ 
      name: categoryName, 
      type,
      isActive: true 
    });
    
    if (!category) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'Category not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: category.subcategories,
    });
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subcategories',
      error: error.message,
    });
  }
};

/**
 * Update category
 */
export const updateCategory = async (req, res) => {
  try {
    const { name, description, icon, order, isActive } = req.body;
    
    const category = await TreatmentCategory.findByIdAndUpdate(
      req.params.id,
      { name, description, icon, order, isActive },
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update category',
      error: error.message,
    });
  }
};

/**
 * Delete category
 */
export const deleteCategory = async (req, res) => {
  try {
    // Check if any treatments use this category
    const treatmentCount = await Treatment.countDocuments({ 
      category: req.params.id 
    });
    
    if (treatmentCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. ${treatmentCount} treatment(s) are using it.`,
      });
    }
    
    const category = await TreatmentCategory.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category',
      error: error.message,
    });
  }
};

/**
 * Sync categories from existing treatments
 */
export const syncCategoriesFromTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find({}, 'category subcategory');
    
    const categoryMap = new Map();
    
    // Group treatments by category
    treatments.forEach(treatment => {
      if (!categoryMap.has(treatment.category)) {
        categoryMap.set(treatment.category, new Set());
      }
      if (treatment.subcategory) {
        categoryMap.get(treatment.category).add(treatment.subcategory);
      }
    });
    
    const results = [];
    
    // Create or update categories
    for (const [categoryName, subcategories] of categoryMap) {
      const type = categoryName === 'Mental Health' ? 'Mental Health' : 'General Health';
      
      let category = await TreatmentCategory.findOne({ name: categoryName, type });
      
      if (!category) {
        category = await TreatmentCategory.create({
          name: categoryName,
          type,
          subcategories: Array.from(subcategories).map(name => ({
            name,
            createdAt: new Date(),
          })),
        });
        results.push({ action: 'created', category: categoryName });
      } else {
        // Add missing subcategories
        let updated = false;
        for (const subName of subcategories) {
          const added = category.addSubcategoryIfNotExists(subName);
          if (added) updated = true;
        }
        if (updated) {
          await category.save();
          results.push({ action: 'updated', category: categoryName });
        }
      }
    }
    
    res.status(200).json({
      success: true,
      message: 'Categories synced successfully',
      data: results,
    });
  } catch (error) {
    console.error('Error syncing categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to sync categories',
      error: error.message,
    });
  }
};
