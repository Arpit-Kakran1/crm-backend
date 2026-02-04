import mongoose from "mongoose";
import Enquiry from "../models/Enquiry.js";
import Property from "../models/Property.js";


// POST /api/enquiries (public)
async function createEnquiry(req, res, next) {
  try {
    const { name, email, phone, message, propertyId } = req.body || {};
    const required = { name, email, phone, message, propertyId };
    for (const [key, val] of Object.entries(required)) {
      if (val === undefined || val === null || val === "") {
        return res.status(400).json({
          success: false,
          message: `${key} is required`,
          data: null,
        });
      }
    }

    if (!mongoose.isValidObjectId(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid propertyId",
        data: null,
      });
    }

    const propertyExists = await Property.exists({ _id: propertyId });
    if (!propertyExists) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
        data: null,
      });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      message,
      propertyId,
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted",
      data: enquiry,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/enquiries (admin)
async function getEnquiries(req, res, next) {
  try {
    const enquiries = await Enquiry.find()
      .populate("propertyId", "title location price propertyType status images isFeatured")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      message: "Enquiries fetched",
      data: enquiries,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/enquiries/:id (admin)
async function getEnquiryById(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid enquiry id", data: null });
    }

    const enquiry = await Enquiry.findById(id).populate(
      "propertyId",
      "title location price propertyType status images isFeatured"
    );
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found", data: null });
    }

    return res.json({ success: true, message: "Enquiry fetched", data: enquiry });
  } catch (err) {
    next(err);
  }
}

// PUT /api/enquiries/:id (admin)
async function updateEnquiry(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid enquiry id", data: null });
    }

    const allowed = ["status", "notes", "followUpDate"];
    const updates = {};
    for (const key of allowed) {
      if (req.body && Object.prototype.hasOwnProperty.call(req.body, key)) {
        updates[key] = req.body[key];
      }
    }

    // Normalize followUpDate
    if (Object.prototype.hasOwnProperty.call(updates, "followUpDate")) {
      if (updates.followUpDate === "" || updates.followUpDate === null) {
        updates.followUpDate = null;
      } else {
        const parsed = new Date(updates.followUpDate);
        if (Number.isNaN(parsed.getTime())) {
          return res.status(400).json({
            success: false,
            message: "followUpDate must be a valid date",
            data: null,
          });
        }
        updates.followUpDate = parsed;
      }
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate("propertyId", "title location price propertyType status images isFeatured");

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found", data: null });
    }

    return res.json({
      success: true,
      message: "Enquiry updated",
      data: enquiry,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/enquiries/:id (admin)
async function deleteEnquiry(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ success: false, message: "Invalid enquiry id", data: null });
    }

    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found", data: null });
    }

    return res.json({
      success: true,
      message: "Enquiry deleted",
      data: enquiry,
    });
  } catch (err) {
    next(err);
  }
}

export {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};

