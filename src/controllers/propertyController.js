import mongoose from "mongoose";
import Property from "../models/Property.js";

/* =========================
   GET /api/properties (public)
========================= */
export async function getProperties(req, res, next) {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "Properties fetched",
      data: properties,
    });
  } catch (err) {
    next(err);
  }
}

/* =========================
   GET /api/properties/:id (public)
========================= */
export async function getPropertyById(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property id",
        data: null,
      });
    }

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Property fetched",
      data: property,
    });
  } catch (err) {
    next(err);
  }
}

//Create Property
export async function createProperty(req, res, next) {
  try {
    const {
      title,
      location,
      price,
      propertyType,
      status,
      description,
      images,
      isFeatured,

      // property features
      area,
      bedrooms,
      bathrooms,
      balconies,
      parking,
      furnishing,
      floorNumber,
      totalFloors,
      facing,
      propertyAge,
    } = req.body

    // 🔒 minimal required field check (do NOT overdo)
    if (
      !title ||
      !location ||
      price === undefined ||
      price === null ||
      !propertyType ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      })
    }

    const property = await Property.create({
      title,
      location,
      price,
      propertyType,
      status,
      description,

      images: Array.isArray(images) ? images : [],

      // features
      area,
      bedrooms,
      bathrooms,
      balconies,
      parking,
      furnishing,
      floorNumber,
      totalFloors,
      facing,
      propertyAge,

      isFeatured: Boolean(isFeatured),
    })

    return res.status(201).json({
      success: true,
      message: 'Property created successfully',
      data: property,
    })
  } catch (err) {
    next(err)
  }
}


// PUT /api/properties/:id (admin)

export async function updateProperty(req, res, next) {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid property id',
        data: null,
      })
    }

    // 1️⃣ Fetch document FIRST
    const property = await Property.findById(id)
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
        data: null,
      })
    }

    const {
      title,
      location,
      price,
      propertyType,
      status,
      description,
      images,
      isFeatured,
      area,
      bedrooms,
      bathrooms,
      balconies,
      parking,
      furnishing,
      floorNumber,
      totalFloors,
      facing,
      propertyAge,
    } = req.body || {}

    // 2️⃣ Assign fields safely
    if (title !== undefined) property.title = title
    if (location !== undefined) property.location = location
    if (price !== undefined) property.price = price
    if (propertyType !== undefined) property.propertyType = propertyType
    if (status !== undefined) property.status = status
    if (description !== undefined) property.description = description
    if (typeof isFeatured === 'boolean') property.isFeatured = isFeatured

    if (area !== undefined) property.area = area
    if (bedrooms !== undefined) property.bedrooms = bedrooms
    if (bathrooms !== undefined) property.bathrooms = bathrooms
    if (balconies !== undefined) property.balconies = balconies
    if (parking !== undefined) property.parking = parking
    if (furnishing !== undefined) property.furnishing = furnishing
    if (floorNumber !== undefined) property.floorNumber = floorNumber
    if (totalFloors !== undefined) property.totalFloors = totalFloors
    if (facing !== undefined) property.facing = facing
    if (propertyAge !== undefined) property.propertyAge = propertyAge

    // 3️⃣ Append images (NO overwrite)
    if (Array.isArray(images) && images.length > 0) {
      property.images.push(...images)
    }

    // 4️⃣ Save
    await property.save({ validateBeforeSave: true })


    return res.json({
      success: true,
      message: 'Property updated',
      data: property,
    })
  } catch (err) {
    next(err)
  }
}


/* =========================
   DELETE /api/properties/:id (admin)
========================= */
export async function deleteProperty(req, res, next) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property id",
        data: null,
      });
    }

    const property = await Property.findByIdAndDelete(id);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Property deleted",
      data: property,
    });
  } catch (err) {
    next(err);
  }
}
