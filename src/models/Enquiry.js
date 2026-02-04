import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'VISITED', 'NEGOTIATION', 'CLOSED', 'LOST'],
      default: 'NEW',
    },
    notes: { type: String, default: '' },
    followUpDate: { type: Date, default: null },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model('Enquiry', enquirySchema);

