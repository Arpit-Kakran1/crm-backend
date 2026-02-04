import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    propertyType: {
      type: String,
      required: true,
      enum: ['Apartment', 'House', 'Plot', 'Commercial','Flat','Villa'],
    },
    status: {
      type: String,
      enum: ['Available', 'Sold', 'Rented'],
    },
    description: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },
     bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    balconies: { type: Number, default: 0 },
    parking: { type: Number, default: 0 },

    area: { type: Number }, // sqft
    facing: {
      type: String,
      enum: [
        'North',
        'South',
        'East',
        'West',
        'North-East',
        'North-West',
        'South-East',
        'South-West',
      ],
    },

    furnishing: {
      type: String,
      enum: ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'],
    },

    floorNumber: { type: Number },
    totalFloors: { type: Number },
    propertyAge: {
      type: String,
      enum: ['New Construction', '1-3 years', '3-5 years', '5-10 years','10+ years'],
    },

    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

export default mongoose.model('Property', propertySchema);

