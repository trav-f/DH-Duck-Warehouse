import mongoose from "mongoose";

const DuckSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  color: {
    type: String,
    required: true,
    enum: ['Red', 'Green', 'Yellow', 'Black']
  },
  size: {
    type: String,
    required: true,
    enum: ['XLarge', 'Large', 'Medium', 'Small', 'XSmall']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer'
    }
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Index for better query performance
// Id is marked as unique, so we don't need to index it
DuckSchema.index({ deleted: 1 });

const Duck = mongoose.model("Duck", DuckSchema);

export default Duck;
