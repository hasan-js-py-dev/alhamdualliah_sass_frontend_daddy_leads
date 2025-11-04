import Cookie from '../models/Cookie.js';

export const saveCookie = async (req, res) => {
  try {
    const { cookie } = req.body;
    const userId = req.user.id;

    if (!cookie || !cookie.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Cookie value is required',
      });
    }

    // Check if cookie already exists for user
    const existingCookie = await Cookie.findOne({ userId });

    if (existingCookie) {
      // Update existing cookie
      existingCookie.cookie = cookie;
      existingCookie.updatedAt = Date.now();
      await existingCookie.save();

      return res.json({
        success: true,
        message: 'Cookie updated successfully',
        data: {
          userId,
          updatedAt: existingCookie.updatedAt,
        },
      });
    }

    // Create new cookie
    const newCookie = new Cookie({
      userId,
      cookie,
    });

    await newCookie.save();

    res.status(201).json({
      success: true,
      message: 'Cookie saved successfully',
      data: {
        userId,
        createdAt: newCookie.createdAt,
      },
    });
  } catch (error) {
    console.error('Save cookie error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save cookie',
      error: error.message,
    });
  }
};

export const getCookie = async (req, res) => {
  try {
    const userId = req.user.id;

    const cookie = await Cookie.findOne({ userId });

    if (!cookie) {
      return res.status(404).json({
        success: false,
        message: 'No cookie found for user',
      });
    }

    res.json({
      success: true,
      data: {
        cookie: cookie.cookie,
        updatedAt: cookie.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get cookie error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve cookie',
      error: error.message,
    });
  }
};

export const deleteCookie = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await Cookie.deleteOne({ userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'No cookie found for user',
      });
    }

    res.json({
      success: true,
      message: 'Cookie deleted successfully',
    });
  } catch (error) {
    console.error('Delete cookie error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete cookie',
      error: error.message,
    });
  }
};
