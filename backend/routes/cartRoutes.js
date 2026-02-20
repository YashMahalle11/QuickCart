
const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// Helper function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity, guestId, userId } = req.body;

    try {
        // Validate quantity
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than 0" });
        }

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Determine the price to consider (use discountPrice if available)
        const price = product.discountPrice ? product.discountPrice : product.price;

        // Determine if the user is logged in or a guest
        let cart = await getCart(userId, guestId);

        if (cart) {
            // Check if the product is already in the cart
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId
            );

            if (productIndex > -1) {
                // Update quantity of existing product
                cart.products[productIndex].quantity += quantity;
            } else {
                // Add new product to cart
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images.length > 0 ? product.images[0].url : "",
                    price: product.price,
                    discountPrice: product.discountPrice || null,
                    category: product.category,
                    type: product.type,
                    freshness: product.freshness,
                    brand: product.brand || [],
                    colors: product.colors || [],
                    unit: product.unit,
                    weight: typeof product.weight === "number" ? product.weight : 0,
                    quantity,
                    isFeatured: product.isFeatured,
                    isPublished: product.isPublished,
                    rating: product.rating,
                    numReviews: product.numReviews,
                    collections: product.collections || [],
                    tags: product.tags || [],
                    dimensions: product.dimensions || {},
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart for the guest or user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: userId ? undefined : guestId || "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images.length > 0 ? product.images[0].url : "",
                        price: product.price,
                        discountPrice: product.discountPrice || null,
                        category: product.category,
                        type: product.type,
                        freshness: product.freshness,
                        brand: product.brand || [],
                        colors: product.colors || [],
                        unit: product.unit,
                        weight: typeof product.weight === "number" ? product.weight : 0,
                        quantity,
                        isFeatured: product.isFeatured,
                        isPublished: product.isPublished,
                        rating: product.rating,
                        numReviews: product.numReviews,
                        collections: product.collections || [],
                        tags: product.tags || [],
                        dimensions: product.dimensions || {},
                    },
                ],
                totalPrice: price * quantity,
            });

            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged-in user
// @access Public
router.put("/", async (req, res) => {
    const { productId, quantity, guestId, userId } = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );

        if (productIndex > -1) {
            if (quantity > 0) {
                // Update product quantity
                cart.products[productIndex].quantity = quantity;
            } else {
                // Remove product if quantity is 0
                cart.products.splice(productIndex, 1);
            }

            // Recalculate total price using discountPrice if available
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});


// @route DELETE /api/cart
// @desc Remove a product from the cart for a guest or logged-in user
// @access Public
router.delete("/", async (req, res) => {
    const { productId, guestId, userId } = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        // Find product index in the cart
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );

        if (productIndex > -1) {
            // Remove the product from cart
            cart.products.splice(productIndex, 1);

            // Recalculate total price using discountPrice if available
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});


// @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public

router.get("/", async (req, res) => {
    const { userId, guestId } = req.query; // Fixed typo from `req.quert` to `req.query`

    try {
        const cart = await getCart(userId, guestId);
        
        if (cart) {
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", async (req, res) => {
    const { guestId, userId } = req.body;

    try {
        const guestCart = await getCart(null, guestId);
        const userCart = await getCart(userId, null);

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: "Guest cart is empty" });
            }

            if (userCart) {
                // Merge guest cart into user cart
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex(
                        (item) =>
                            item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color
                    );

                    if (productIndex > -1) {
                        // If the item exists in the user cart, update the quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    } else {
                        // Otherwise, add the guest item to the cart
                        userCart.products.push(guestItem);
                    }
                });

                // Recalculate total price
                userCart.totalPrice = userCart.products.reduce(
                    (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
                    0
                );

                await userCart.save();

                // Remove the guest cart after merging
                await Cart.findOneAndDelete({ guestId });

                return res.status(200).json({
                    _id: userCart._id,
                    products: userCart.products,
                    totalPrice: userCart.totalPrice,
                    createdAt: userCart.createdAt,
                    updatedAt: userCart.updatedAt,
                    __v: userCart.__v,
                    user: userCart.user, // ✅ Added user field in response
                });
            } else {
                // If the user has no existing cart, assign the guest cart to the user
                guestCart.user = userId;
                guestCart.guestId = undefined;
                await guestCart.save();

                return res.status(200).json({
                    _id: guestCart._id,
                    products: guestCart.products,
                    totalPrice: guestCart.totalPrice,
                    createdAt: guestCart.createdAt,
                    updatedAt: guestCart.updatedAt,
                    __v: guestCart.__v,
                    user: guestCart.user, // ✅ Added user field in response
                });
            }
        } else {
            return userCart
                ? res.status(200).json({
                      _id: userCart._id,
                      products: userCart.products,
                      totalPrice: userCart.totalPrice,
                      createdAt: userCart.createdAt,
                      updatedAt: userCart.updatedAt,
                      __v: userCart.__v,
                      user: userCart.user, // ✅ Added user field in response
                  })
                : res.status(404).json({ message: "Guest cart not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});



module.exports = router;

/*const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// Helper function to get a cart by user ID or guest ID
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged-in user
// @access Public
router.post("/", async (req, res) => {
    const { productId, quantity, guestId, userId } = req.body;

    try {
        // Validate quantity
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: "Quantity must be greater than 0" });
        }

        // Find the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Determine if the user is logged in or guest
        let cart = await getCart(userId, guestId);

        if (cart) {
            // Check if the product is already in the cart
            const productIndex = cart.products.findIndex(
                (p) => p.productId.toString() === productId
            );

            if (productIndex > -1) {
                // Update quantity of existing product
                cart.products[productIndex].quantity += quantity;
            } else {
                // Add new product to cart
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.image || "",
                    price: product.price,
                    category: product.category,
                    weight: product.weight, // Weight must be provided
                    quantity,
                });
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else {
            // Create a new cart for the guest or user
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: userId ? undefined : guestId || "guest_" + new Date().getTime(),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.image || "",
                        price: product.price,
                        category: product.category,
                        weight: product.weight, // Include weight in cart items
                        quantity,
                    },
                ],
                totalPrice: product.price * quantity,
            });

            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;




/*const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//Helper function to get a cart by user Id or guest
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    }else if (guestId){
        return await Cart.findOne({ guestId });
    }
    return null;
};


// @route POST /api/cart
// @desc Add a product to the cart for a guest or logged in user
// @access Public

router.post("/", async(req, res) => {
    const { productId , quantity, size , color , guestId, userId } = req.body;
    try{
       const product = await Product.findById(productId);
       if (!product) return res.status(404).json({ message: "Product not found"});

       // Determine if the user is logged in or guest
       let cart = await getCart(userId, guestId);

       // If the cart exists, update it
       if (cart) {
             const productIndex = cart.products.findIndex(
                (p) => 
                    p.productId.toString() === productId &&
                    p.size === size && 
                    p.color === color
             );

             if(productIndex > -1){
                //If the product already exists, update the quantity
                cart.products[productIndex].quantity += quantity;
             }else{
                // add new product
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                });
             }

             // reculculate the total price
             cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
             );
             await cart.save();
             return res.status(200).json(cart);

       }else{
        // create a new cart for the guest or user 
        const newCart = await Cart.create({
            userId: userId ? userId : undefined,
            guestId: guestId ? guestId : "guest_" + new Date().getTime(),
            products:[
                {
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity,
                },
            ],
            totalPrice: product.price * quantity,
        });
        return res.status(201).json(newCart);
       }
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Server Error"});
    }
});



// @route PUT /api/cart
// @desc Update product quantity in the cart a guesr for a guest or logged-in user
// @access Public
router.put("/", async (req, res) => {
    const{ productId, quantity, size, color, guestId, userId } = req.body;

    try{
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found "});

        const productIndex = cart.products.findIndex(
            (p) => 
                p.productId.toString() === productId  &&
                p.size === size && 
                p.color === color
        );

        if (productIndex > -1){
            // update quantity
            if (quantity > 0){
                cart.products[productIndex].quantity = quantity;
            } else{
                cart.products.splice(productIndex, 1);  // remove product if quantity is 0
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart"});
        }
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server Error" });
    }
});

// @route DELETE /api/cart
// @desc Remove a product from the cart
// @ access Public

router.delete("/", async (req, res) => {
    const { productId, size ,color, guestId, userId } = req.body;
    try{
        let cart = await getCart(userId, guestId);

        if (!cart) return res.status(404).json({ message: "cart not found"});

        const productIndex = cart.products.findIndex(
            (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        );

        if (productIndex > -1){
            cart.products.splice(productIndex,1);

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            await cart.save();
            return res.status(200).json(cart);
        } else{
            return res.status(404).json({ message: "Product not found in cart"});
        }

    }catch (error) {
        console.error(error);
        return res.status(500).json({message: "Server Error"});
    }
})

/ @route GET /api/cart
// @desc Get logged-in user's or guest user's cart
// @access Public

router.get("/", async (req, res) => {
    const { userId, guestId } = req.quert;

    try{
        const cart = await getCart(userId, guestId);
        if (cart){
            res.json(cart);
        }else{
            res.status(404).json({ message: "Cart not found" });
        }
    }catch (error){
       console.error(error);
       res.status(500).json({ message: "Server error" });
    }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", async (req, res) => {
    const { guestId, userId } = req.body;

    try {
        const guestCart = await getCart(null, guestId);
        const userCart = await getCart(userId, null);

        if (!guestCart) {
            return userCart
                ? res.status(200).json(userCart) // Guest cart already merged, return user cart
                : res.status(404).json({ message: "Guest cart not found" });
        }

        if (guestCart.products.length === 0) {
            return res.status(400).json({ message: "Guest cart is empty" });
        }

        if (!userCart) {
            // If the user has no existing cart, assign the guest cart to the user
            guestCart.user = userId;
            guestCart.guestId = undefined;
            await guestCart.save();
            return res.status(200).json(guestCart);
        }

        // Merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
            const productIndex = userCart.products.findIndex(
                (item) =>
                    item.productId.toString() === guestItem.productId.toString() &&
                    item.size === guestItem.size &&
                    item.color === guestItem.color
            );

            if (productIndex > -1) {
                // If the item exists in the user cart, update the quantity
                userCart.products[productIndex].quantity += guestItem.quantity;
            } else {
                // Otherwise, add the guest item to the cart
                userCart.products.push(guestItem);
            }
        });

        // Recalculate total price
        userCart.totalPrice = userCart.products.reduce(
            (acc, item) => acc + (item.discountPrice || item.price) * item.quantity,
            0
        );

        await userCart.save();

        // Remove the guest cart after merging
        await Cart.findOneAndDelete({ guestId });

        return res.status(200).json(userCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});



module.exports = router; */