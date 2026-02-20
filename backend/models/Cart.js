
const mongoose = require("mongoose");

// Define schema for cart items
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (value) {
          return value == null || value < this.price;
        },
        message: "Discount price must be lower than the original price.",
      },
    },
    category: {
      type: String,
      enum: ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"],
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Leafy", "Root", "Cruciferous", "Exotic",
        "Citrus", "Berries", "Tropical", "Dry Fruits", "Seasonal",
        "Milk", "Cheese", "Butter & Ghee", "Yogurt",
        "Rice", "Wheat", "Pulses", "Millets"
      ],
    },
    freshness: {
      type: String,
      enum: ["Fresh", "Organic", "Pesticide-Free", "Frozen"],
    },
    brand: {
      type: [String],
      validate: {
        validator: function (value) {
          const brands = {
            Vegetables: ["Local Organic", "Farm Fresh", "Nature's Basket", "Green Harvest"],
            Fruits: ["Local Organic", "Imported", "FreshCart", "Fruiticana", "TropiFresh"],
            "Dairy Products": ["Amul", "Mother Dairy", "Nestle", "Gowardhan", "Britannia", "Aavin"],
            "Grains & Pulses": ["Fortune", "Local Organic", "India Gate", "24 Mantra", "Tata Sampann", "Organic Tattva"],
          };
          return value.every((brand) => brands[this.category]?.includes(brand));
        },
        message: "Brand is not valid for the selected category.",
      },
    },
    unit: {
      type: String,
      enum: ["kg", "g", "liters", "ml", "dozen", "pieces"],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    collections: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
  },
  { _id: false }
);

// Define the cart schema
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);

/*const mongoose = require("mongoose");

// Define schema for cart items
const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discountPrice: {
            type: Number,
            validate: {
                validator: function (value) {
                    return value == null || value < this.price;
                },
                message: "Discount price must be lower than the original price.",
            },
        },
        category: {
            type: String,
            enum: ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"],
            required: true,
        },
        type: {
            type: String,
            enum: [
                "Leafy", "Root", "Cruciferous", "Exotic", 
                "Citrus", "Berries", "Tropical", "Dry Fruits", "Seasonal", 
                "Milk", "Cheese", "Butter & Ghee", "Yogurt", 
                "Rice", "Wheat", "Pulses", "Millets"
            ],
        },
        freshness: {
            type: String,
            enum: ["Fresh", "Organic", "Pesticide-Free", "Frozen"],
        },
        brand: {
            type: [String],
            enum: ["Amul", "Mother Dairy", "Fortune", "Nestle", "Local Organic", "Imported"],
        },
        colors: {
            type: [String],
        },
        unit: {
            type: String,
            enum: ["kg", "g", "liters", "ml", "dozen", "pieces"],
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1, // Ensures quantity is always positive
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        collections: {
            type: [String],
            default: [],
        },
        tags: {
            type: [String],
        },
        dimensions: {
            length: Number,
            width: Number,
            height: Number,
        },
    },
    { _id: false }
);

// Define schema for the cart
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        guestId: {
            type: String,
        },
        products: [cartItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);  */























/*const mongoose = require("mongoose");

// Define schema for cart items
const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"],
            required: true,
        },
        weight: {
            type: String, // Example: "500g", "1kg", "5L"
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1, // Ensure quantity is always positive
        },
    },
    { _id: false }
);

// Define schema for the cart
const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        guestId: {
            type: String,
        },
        products: [cartItemSchema],
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);

/*const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: String,
    image: String,
    price: String,
    size: String,
    color: String,
    quantity: {
        type:Number,
        default:1,
    },
},
 {_id: false}
);

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    guestId: {
        type: String,
    },
    products: [cartItemSchema],
    totalPrice:{
        type: Number,
        required: true,
        default: 0,
    },
},
{ timestamps: true}
);
module.exports = mongoose.model("Cart", cartItemSchema); */