/**
 * Cookie Model
 * Stores LinkedIn cookies for users
 * Each user can only have ONE cookie (enforced by unique userId)
 */

import mongoose from 'mongoose';

const cookieSchema = new mongoose.Schema(
  {
    // User ID - unique index ensures one cookie per user
    userId: {
      type: String,
      required: true,
      unique: true, // Prevents duplicate cookies for same user
      index: true,  // Speeds up queries
    },
    
    // LinkedIn cookie string
    cookie: {
      type: String,
      required: true,
    },
    
    // Creation timestamp
    createdAt: {
      type: Date,
      default: Date.now,
    },
    
    // Last update timestamp
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Automatically manage createdAt and updatedAt
    timestamps: true,
  }
);

const Cookie = mongoose.model('Cookie', cookieSchema);

export default Cookie;
