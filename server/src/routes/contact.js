import express from 'express';
import Contact from '../models/Contact.js';
import { uploadMultiple } from '../middleware/upload.js';

const router = express.Router();

// POST /api/contact - Handle contact form submission
router.post('/', uploadMultiple('attachments', 3), async (req, res) => {
  try {
    const { name, email, phone, subject, message, category } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, subject, and message are required',
      });
    }

    // Prepare contact data
    const contactData = {
      name,
      email,
      phone,
      subject,
      message,
      category: category || 'General Inquiry',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    };

    // Add attachments if any
    if (req.files && req.files.length > 0) {
      contactData.attachments = req.files.map((file) => ({
        url: file.path,
        publicId: file.filename,
        originalName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
      }));
    }

    // Create and save contact
    const contact = new Contact(contactData);
    await contact.save();

    // Add initial note
    await contact.addNote('New contact form submission received', 'system');

    res.status(200).json({
      success: true,
      message:
        'Thank you for your message. Dr. Quadri will get back to you soon!',
      data: {
        id: contact._id,
        status: contact.status,
        category: contact.category,
      },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send message. Please try again later.',
    });
  }
});

// GET /api/contact - Get all contacts (admin)
router.get('/', async (req, res) => {
  try {
    const { status, category, page = 1, limit = 20, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    let contactsQuery = Contact.find(query);

    if (search) {
      contactsQuery = contactsQuery.sort({ score: { $meta: 'textScore' } });
    } else {
      contactsQuery = contactsQuery.sort({ createdAt: -1 });
    }

    const contacts = await contactsQuery.skip(skip).limit(limitNum);
    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      count: contacts.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: contacts,
    });
  } catch (error) {
    console.error('Contacts fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts',
    });
  }
});

// GET /api/contact/unread - Get unread contacts
router.get('/unread', async (req, res) => {
  try {
    const contacts = await Contact.getUnread();

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Unread contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch unread contacts',
    });
  }
});

// GET /api/contact/pending - Get contacts pending response
router.get('/pending', async (req, res) => {
  try {
    const contacts = await Contact.getPendingResponse();

    res.json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Pending contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pending contacts',
    });
  }
});

// GET /api/contact/stats - Get contact statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Contact.getStatistics();
    const totalContacts = await Contact.countDocuments({});
    const todayContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });

    res.json({
      success: true,
      data: {
        total: totalContacts,
        today: todayContacts,
        byStatus: stats,
        categories: await Contact.aggregate([
          { $group: { _id: '$category', count: { $sum: 1 } } },
        ]),
      },
    });
  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get contact statistics',
    });
  }
});

// GET /api/contact/:id - Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found',
      });
    }

    res.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error('Contact fetch error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact',
    });
  }
});

// PUT /api/contact/:id/status - Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, respondedBy } = req.body;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found',
      });
    }

    contact.status = status;
    if (status === 'replied') {
      contact.respondedAt = new Date();
      contact.respondedBy = respondedBy || 'Dr. Quadri';
    }

    await contact.save();

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Contact status update error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update contact status',
    });
  }
});

// POST /api/contact/:id/notes - Add note to contact
router.post('/:id/notes', async (req, res) => {
  try {
    const { id } = req.params;
    const { content, addedBy } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        error: 'Note content is required',
      });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: 'Contact not found',
      });
    }

    await contact.addNote(content, addedBy || 'admin');

    res.json({
      success: true,
      message: 'Note added successfully',
      data: contact,
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add note',
    });
  }
});

// GET /api/contact/info - Get contact information
router.get('/info', (req, res) => {
  try {
    const contactInfo = {
      email: 'dr.quadri@example.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Medical Center Dr',
        city: 'Healthcare City',
        state: 'HC',
        zipCode: '12345',
        country: 'USA',
      },
      socialMedia: {
        twitter: '@drquadri',
        linkedin: 'linkedin.com/in/dr-syed-quadri',
        instagram: '@dr.syed.quadri',
      },
      officeHours: {
        monday: '9:00 AM - 5:00 PM',
        tuesday: '9:00 AM - 5:00 PM',
        wednesday: '9:00 AM - 5:00 PM',
        thursday: '9:00 AM - 5:00 PM',
        friday: '9:00 AM - 3:00 PM',
        saturday: 'Closed',
        sunday: 'Closed',
      },
    };

    res.json({
      success: true,
      data: contactInfo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact information',
    });
  }
});

export default router;
