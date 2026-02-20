const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");


const router = express.Router();

// @route   POST /api/products
// @desc    Create a new Product
// @access  Private/Admin
router.post("/", protect, admin, async(req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            type,
            freshness,
            brand,
            colors,
            collections,
            images, // Should be array [{ url, altText }]
            isFeatured,
            isPublished,
            tags,
            dimensions, // { length, width, height }
            weight,
            metaTitle,
            metaDescription,
            metaKeywords
        } = req.body;

        // Ensure category is valid
        const validCategories = ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: "Invalid category selected." });
        }

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            type,
            freshness,
            brand: Array.isArray(brand) ? brand : [brand], // Ensure array format
            colors,
            collections,
            images: images?.map(img => ({
                url: img.url,
                altText: img.altText || ""
            })),
            isFeatured,
            isPublished,
            tags,
            dimensions: dimensions ? {
                length: dimensions.length,
                width: dimensions.width,
                height: dimensions.height
            } : undefined,
            weight,
            metaTitle,
            metaDescription,
            metaKeywords,
            rating: 0, // Default rating
            numReviews: 0, // Default numReviews
            user: req.user._id, // Admin user reference
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.put("/:id", protect, admin, async (req,res) => {
    try{
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            sku,
            category,
            type,
            freshness,
            brand,
            colors,
            collections,
            images, // Should be array [{ url, altText }]
            isFeatured,
            isPublished,
            tags,
            dimensions, // { length, width, height }
            weight,
            metaTitle,
            metaDescription,
            metaKeywords
        } = req.body;

        //Find product by ID
        const product = await Product.findById(req.params.id);

        if(product){
            //Update product fields
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.sku = sku || product.sku;
            product.category = category || product.category;
            product.type = type || product.type;
            product.freshness = freshness || product.freshness;
            product.brand = brand || product.brand;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.images = images || product.images; // Should be array [{ url, altText }]
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions; // { length, width, height }
            product.weight = weight || product.weight;
            product.metaTitle = metaTitle || product.metaTitle;
            product.metaDescription = metaDescription || product.metaDescription;
            product.metaKeywords = metaKeywords || product.metaKeywords;

            //Save the updated product
            const updatedProduct = await product.save();
            res.json(updatedProduct);
            
        }else{
            res.status(404).json({ message: "Product not found"});
        }

    }catch(error){
          console.error(error);
          res.status(500).send("Server Error");
    }
});


// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin
router.delete("/:id", protect, admin, async(req, res) => {
    try{
        //Find the product by ID
        const product = await Product.findById(req.params.id);

        if(product){
            //Remove the product from DB
            await product.deleteOne();
            res.json({message: "Product removed"});
        }else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(error){
       console.error(error);
       res.status(500).send("Server Error");

    }
});



router.get("/", async (req, res) => {
    try {
        const { category, type, freshness, brand, minPrice, maxPrice, sortBy, search, limit } = req.query;

        let query = {};

        // Category Filter
        if (category && category.toLowerCase() !== "all") {
            query.category = category;
        }

        // Type Filter
        if (type) {
            query.type = { $in: type.split(",") };
        }

        // Freshness Filter
        if (freshness) {
            query.freshness = { $in: freshness.split(",") };
        }

        // Brand Filter
        if (brand) {
            query.brand = { $in: brand.split(",") };
        }

        // Price Range Filter
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        // Search Filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        // Sorting Logic
        let sort = {};
        if (sortBy) {
            switch (sortBy) {
                case "priceAsc":
                    sort = { price: 1 };
                    break;
                case "priceDesc":
                    sort = { price: -1 };
                    break;
                case "popularity":
                    sort = { rating: -1 };
                    break;
                default:
                    break;
            }
        }

        // Fetch products with applied filters, sorting, and limit
        const products = await Product.find(query).sort(sort).limit(Number(limit) || 0);

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// @route GET /api/products/best-seller
// @desc Retrieve the product with highrst rating
// @access Public
router.get("/best-seller", async(req, res) => {
    try{
      const bestSeller = await Product.findOne().sort({ rating: -1});
      if (bestSeller){
        res.json(bestSeller);
      }else{
        res.status(404).json({ message: "No best seller found"});
      }
    }catch (error){
        console.error(error);
        res.status(500).send("Server Error");
    }
});

//@route GET /api/products/new-arrivals
// @desc Retrieve lattest 8 Products - creation date
// @access public
/*router.get("/new-arrivals", async(req, res) => {
    try{
        //Fetch latest 8 products
        const newArrivals = await Product.find().sort({ createdAt: -1}).limit(8);
        res.json(newArrivals);
    }catch (error){
        console.error(error);
        res.status(500).send("Server Error");
    }
});*/
router.get("/new-arrivals", async (req, res) => {
    try {
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
        res.json(newArrivals);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});



// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public

router.get("/:id", async(req, res) => {
    try{
       const product = await Product.findById(req.params.id);
       if (product){
           res.json(product);
       }else{
         res.status(404).json({ message: "Product Not Found" });
       }
    }catch (error){
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's category, type, freshness, and brand
// @access Public

/*router.get("/similar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Define query for similar products
        const query = {
            _id: { $ne: id }, // Exclude current product
            category: product.category, // Match category
        };

        // Include optional filters if present
        if (product.type) query.type = { $in: product.type };
        if (product.freshness) query.freshness = { $in: product.freshness };
        if (product.brand) query.brand = product.brand;

        // Fetch similar products
        const similarProducts = await Product.find(query).limit(4);

        res.json(similarProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}); */
/*router.get("/similar/:id", async (req, res) => {
    const { id } = req.params; // Make sure we're getting the ID from params, not body
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Rest of your similar products logic...
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });*/
  router.get("/similar/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Define similarity query
        const query = {
            _id: { $ne: id }, // Exclude current product
            category: product.category,
            type: { $in: Array.isArray(product.type) ? product.type : [product.type] },
            freshness: { $in: Array.isArray(product.freshness) ? product.freshness : [product.freshness] },
            brand: { $in: Array.isArray(product.brand) ? product.brand : [product.brand] },
        };

        const similarProducts = await Product.find(query).limit(4);
        res.json(similarProducts);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});






module.exports = router;
