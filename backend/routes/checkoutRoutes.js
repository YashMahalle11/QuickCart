const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST  /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout" });
    }

    for (const item of checkoutItems) {
        if (
            !item.productId ||
            typeof item.name !== "string" ||
            typeof item.image !== "string" ||
            typeof item.price !== "number" ||
            typeof item.quantity !== "number" ||
            typeof item.weight !== "number" ||
            typeof item.unit !== "string" ||
            typeof item.category !== "string"
        ) {
            return res.status(400).json({ message: "Invalid or missing fields in checkoutItems" });
        }
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });

        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("❌ Error Creating checkout session:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid) {
            return res.status(400).json({ message: "Checkout is already paid" });
        }

        if (paymentStatus.toLowerCase() === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid Payment Status" });
        }
    } catch (error) {
        console.error("❌ Error updating payment status:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            const orderItems = checkout.checkoutItems.map(item => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity || 1,
                weight: item.weight || 0,
                unit: item.unit || "N/A",
                category: item.category || "Uncategorized",
                type: item.type,
                price: item.price,
                discountPrice: item.discountPrice,
                image: item.image,
                freshness: item.freshness,
                brand: item.brand,
                colors: item.colors,
                tags: item.tags,
                collections: item.collections,
            }));

            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            await Cart.findOneAndDelete({ user: checkout.user });

            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        console.error("❌ Error finalizing checkout:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;

/*const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST  /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout" });
    }

    // 🐞 Debug log
    console.log("Received checkoutItems:", JSON.stringify(checkoutItems, null, 2));

    // ✅ Better validation for each item
    for (const item of checkoutItems) {
        if (
            !item.productId ||
            typeof item.name !== "string" ||
            typeof item.image !== "string" ||
            typeof item.price !== "number" ||
            typeof item.quantity !== "number" ||
            typeof item.weight !== "number" ||
            typeof item.unit !== "string" ||
            typeof item.category !== "string"
        ) {
            return res.status(400).json({ message: "Invalid or missing fields in checkoutItems" });
        }
    }

    try {
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });

        console.log(`✅ Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("❌ Error Creating checkout session:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid) {
            return res.status(400).json({ message: "Checkout is already paid" });
        }

        if (paymentStatus.toLowerCase() === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid Payment Status" });
        }
    } catch (error) {
        console.error("❌ Error updating payment status:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            // 🐞 Debug log
            console.log("Checkout Items Before Order Creation:", checkout.checkoutItems);

            const orderItems = checkout.checkoutItems.map(item => ({
                product: item.productId,
                name: item.name,
                quantity: item.quantity || 1,
                weight: item.weight || "N/A",
                unit: item.unit || "N/A",
                category: item.category || "Uncategorized",
                price: item.price,
                image: item.image,
            }));

            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            await Cart.findOneAndDelete({ user: checkout.user });

            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        console.error("❌ Error finalizing checkout:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;*/





/*const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST  /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout" });
    }

    // ✅ Validate required fields for each item
    for (const item of checkoutItems) {
        if (!item.productId || !item.name || !item.image || !item.price || !item.quantity || !item.weight || !item.unit || !item.category) {
            return res.status(400).json({ message: "Missing required fields in checkoutItems" });
        }
    }

    try {
        // Create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });

        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error Creating checkout session:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid) {
            return res.status(400).json({ message: "Checkout is already paid" });
        }

        if (paymentStatus.toLowerCase() === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
        } else {
            res.status(400).json({ message: "Invalid Payment Status" });
        }
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout not found" });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            // Log checkoutItems for debugging
            console.log("Checkout Items Before Order Creation:", checkout.checkoutItems);

            // Ensure all required fields exist in orderItems
            const orderItems = checkout.checkoutItems.map(item => ({
                product: item.product, 
                name: item.name,
                quantity: item.quantity || 1, // Default to 1 if missing
                weight: item.weight || "N/A", // Default value
                unit: item.unit || "N/A", // Default value
                category: item.category || "Uncategorized", // Default value
                price: item.price, 
                image: item.image
            }));

            // Create the final order
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            // Mark checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            // Delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user });

            res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            res.status(400).json({ message: "Checkout already finalized" });
        } else {
            res.status(400).json({ message: "Checkout is not paid" });
        }
    } catch (error) {
        console.error("Error finalizing checkout:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router; */




















/*const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router()
// @route POST  /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if(!checkoutItems || checkoutItems.length === 0){
        return res.status(400).json({ message: "no items in checkout" });
    }

    try {
        // Create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            totalPrice,
            paymentStatus: "Pending",
            isPaid: false,
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (error) {
        console.error("Error Creating checkout session:", error);
        res.status(500).json({ message: "Server Error"});
    }
});

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", protect, async(req, res)=> {
    const { paymentStatus, paymentDetails }= req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

         if (!checkout){
            return res.status(404).json({message: "Checkout not found"});
         }
         if (paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.paidAt = Date.now();
            await checkout.save();

            res.status(200).json(checkout);
         }else {
            res.status(400).json({ message: "Invalid Payment Status"});
         }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}); 

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order sfter payment confirmation
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
    try{
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({ message: "Checkout not found"});
        }

        if (checkout.isPaid && !checkout.isFinalized){
            // Create final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.orderItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            // Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Data.now();
            await checkout.save();
            // Delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user });
            res.status(201).json(finalOrder);
 
        }else if (checkout.isFinalized){
            res.status(400).json({ message: "Checkout already finalized" });
        }else{
            res.status(400).json({ message: "Checkout is not paid"});
        }
    } catch (error) {
         console.error(error);
         res.status(500).json({message: "Server Error"});
    }    
});

module.exports = router; */
