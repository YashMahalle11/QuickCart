const mongoose = require("mongoose");

// Schema for ordered items
const orderItemSchema = new mongoose.Schema(
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
            required: true,
            min: 1,
        },
        collections: {
            type: [String],
            default: [],
        },
        tags: {
            type: [String],
        },
    },
    { _id: false }
);

// Order Schema
const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [orderItemSchema],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        paymentStatus: {
            type: String,
            default: "pending",
        },
        status: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing",
        },
        paymentDetails: {
            type: Object,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

/*const mongoose = require("mongoose");

// Schema for ordered items
const orderItemSchema = new mongoose.Schema(
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
            required: true,
            min: 1,
        },
        collections: {
            type: [String],
            default: [],
        },
        tags: {
            type: [String],
        },
    },
    { _id: false }
);

// Order Schema
const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        orderItems: [orderItemSchema],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        isPaid: {
            type: Boolean,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        paymentStatus: {
            type: String,
            default: "pending",
        },
        status: {
            type: String,
            enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Processing",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema); */




/*const mongoose = require("mongoose");

const orderItemScheme = new mongoose.Schema({
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
    size: String,
    color: String,
    quantity: {
        type: Number,
        required: true,
    },
},{_id: false});

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems : [orderItemScheme],
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    paymentStatus: {
        type: String,
        default: "pending",
    },
    status: {
        type: String,
        enum: ["Processing","Shipped","Delivered","Cancelled"],
        default: "Processing",
    },
},
{timeseries: true}
);
module.exports = mongoose.model("order",orderSchema); */