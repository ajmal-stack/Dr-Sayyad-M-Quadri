import mongoose from 'mongoose';

const treatmentCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'Category type is required'],
      enum: ['Mental Health', 'General Health'],
    },
    subcategories: [{
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    treatmentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
treatmentCategorySchema.index({ type: 1, isActive: 1 });
treatmentCategorySchema.index({ name: 1 });

// Method to add subcategory if it doesn't exist
treatmentCategorySchema.methods.addSubcategoryIfNotExists = function(subcategoryName) {
  const exists = this.subcategories.some(
    sub => sub.name.toLowerCase() === subcategoryName.toLowerCase()
  );
  
  if (!exists) {
    this.subcategories.push({
      name: subcategoryName,
      createdAt: new Date(),
    });
    return true;
  }
  return false;
};

// Static method to get or create category
treatmentCategorySchema.statics.getOrCreate = async function(categoryName, type) {
  let category = await this.findOne({ name: categoryName, type });
  
  if (!category) {
    category = await this.create({
      name: categoryName,
      type,
      subcategories: [],
    });
  }
  
  return category;
};

const TreatmentCategory = mongoose.model('TreatmentCategory', treatmentCategorySchema);

export default TreatmentCategory;
