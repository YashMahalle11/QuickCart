const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"],
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
    
    productOptionLabel: {
      type: String,
      default: "Select Option",
    },
    productOptions: {
      type: [String],
      default: [],
    },
    unit: {
      type: String,
      enum: ["kg", "g", "liters", "ml", "dozen", "pieces"],
      required: true,
    },
    collections: {
      type: [String],
      default: [],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
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
    tags: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

// ✅ Optimized Indexes
productSchema.index({ category: 1, price: -1 });
productSchema.index({ tags: "text" });

module.exports = mongoose.model("Product", productSchema);

/*const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"],
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

    // ✅ Dynamic option fields replacing 'colors'
    productOptionLabel: {
      type: String,
      default: "Select Option",
    },
    productOptions: {
      type: [String],
      default: [],
    },

    unit: {
      type: String,
      enum: ["kg", "g", "liters", "ml", "dozen", "pieces"],
      required: true,
    },
    collections: {
      type: [String],
      default: [],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
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
    tags: {
      type: [String],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

// ✅ Optimized Indexes
productSchema.index({ category: 1, price: -1 });
productSchema.index({ tags: "text" });

module.exports = mongoose.model("Product", productSchema); */


/*const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
          return value == null || value < this.price; // Allow null but validate if provided
        },
        message: "Discount price must be lower than the original price.",
      },
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"],
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
      type: [String], // Allow multiple brands
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
    collections: {
      type: [String], // Allow multiple collections
      default: [],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
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
    tags: {
      type: [String], // Full-text search index applied below
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String,
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

/** ✅ Optimized Indexes */
/*productSchema.index({ category: 1, price: -1 }); // Optimized price sorting within categories
productSchema.index({ tags: "text" }); // Full-text search on tags

module.exports = mongoose.model("Product", productSchema); */






/*const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"], // Match frontend categories
    },
    type: {
      type: String,
      enum: [
        "Leafy", "Root", "Cruciferous", "Exotic", 
        "Citrus", "Berries", "Tropical", "Dry Fruits", "Seasonal", 
        "Milk", "Cheese", "Butter & Ghee", "Yogurt", 
        "Rice", "Wheat", "Pulses", "Millets"
      ], // Subcategories
    },
    freshness: {
      type: String,
      enum: ["Fresh", "Organic", "Pesticide-Free", "Frozen"],
    },
    brand: {
      type: [String], // Corrected from `[string]`
      enum: ["Amul", "Mother Dairy", "Fortune", "Nestle", "Local Organic", "Imported"],
    },
    colors: {
      type: [String], // Corrected from `[string]`
    },
    collections: {
      type: String,
      required: true,
    },
    material: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        altText: {
          type: String,
        },
      },
    ],
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
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    tags: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    metaTitle: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    metaKeywords: {
      type: String, // Fixed typo (was `metaKeywoeds`)
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    weight: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);*/
