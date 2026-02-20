
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// LocalStorage Utilities
const loadCartFromStorage = () => {
    try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : { products: [], totalPrice: 0 };
    } catch (e) {
        console.error("Error loading cart from storage:", e);
        return { products: [], totalPrice: 0 };
    }
};

const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
        console.error("Error saving cart to storage:", e);
    }
};

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Async Thunks
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/cart`, { params: { userId, guestId } });
        return res.data;
    } catch (err) {
        console.error("Fetch cart failed:", err);
        return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
});

export const addToCart = createAsyncThunk("cart/addToCart", async ({ userId, guestId, productId, quantity }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/cart`, { userId, guestId, productId, quantity });
        return res.data;
    } catch (err) {
        console.error("Add to cart failed:", err);
        return rejectWithValue(err.response?.data?.message || "Failed to add product to cart");
    }
});

export const updateCartQuantity = createAsyncThunk("cart/updateCartQuantity", async ({ userId, guestId, productId, quantity }, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${BASE_URL}/api/cart`, { userId, guestId, productId, quantity });
        return res.data;
    } catch (err) {
        console.error("Update quantity failed:", err);
        return rejectWithValue(err.response?.data?.message || "Failed to update cart quantity");
    }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ userId, guestId, productId }, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${BASE_URL}/api/cart`, { data: { userId, guestId, productId } });
        return res.data;
    } catch (err) {
        console.error("Remove from cart failed:", err);
        return rejectWithValue(err.response?.data?.message || "Failed to remove product");
    }
});

export const mergeCart = createAsyncThunk("cart/mergeCart", async ({ guestId, userId }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/cart/merge`, { guestId, userId });
        return res.data;
    } catch (err) {
        console.error("Merge cart failed:", err);
        return rejectWithValue(err.response?.data?.message || "Failed to merge cart");
    }
});

// Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        status: "idle",
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [], totalPrice: 0 };
            saveCartToStorage(state.cart);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(mergeCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;


/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [], totalPrice: 0 };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                params: { userId, guestId },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch cart"
            );
        }
    }
);

// Add product to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, guestId, productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                userId,
                guestId,
                productId,
                quantity,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add product to cart"
            );
        }
    }
);

// Update product quantity in cart
export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, guestId, productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                userId,
                guestId,
                productId,
                quantity,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update cart quantity"
            );
        }
    }
);

// Remove product from cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ userId, guestId, productId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                data: { userId, guestId, productId },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to remove product"
            );
        }
    }
);

// Merge guest cart into user cart on login
export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({ guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, {
                guestId,
                userId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to merge cart"
            );
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        status: "idle",
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [], totalPrice: 0 };
            saveCartToStorage(state.cart);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer; */





/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [], totalPrice: 0 };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                params: { userId, guestId },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch cart");
        }
    }
);

// Add product to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, guestId, productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                userId,
                guestId,
                productId,
                quantity,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to add product to cart");
        }
    }
);

// Update product quantity in cart
export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ userId, guestId, productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                userId,
                guestId,
                productId,
                quantity,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update cart quantity");
        }
    }
);

// Remove product from cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async ({ userId, guestId, productId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                data: { userId, guestId, productId },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove product");
        }
    }
);

// Merge guest cart into user cart on login
export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({ guestId, userId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, {
                guestId,
                userId,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to merge cart");
        }
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        status: "idle",
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [], totalPrice: 0 };
            saveCartToStorage(state.cart);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
export const { updateCartItemQuantity } = cartSlice.actions; */
































/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [], totalPrice: 0 };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, { params: { userId, guestId } });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Add an item to the cart
export const addToCart = createAsyncThunk("cart/addToCart", async ({ productId, quantity, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, { productId, quantity, guestId, userId });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk("cart/updateCartItemQuantity", async ({ productId, quantity, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, { productId, quantity, guestId, userId });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Remove an item from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({ productId, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, { data: { productId, guestId, userId } });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({ guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, { guestId, userId }, {
            headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: { cart: loadCartFromStorage(), loading: false, error: null },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [], totalPrice: 0 };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch cart";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.cart = action.payload;
                saveCartToStorage(action.payload);
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer; */























/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
       const storedCart = localStorage.getItem("cart");
       return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async ({ userId, guestId }, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                {
                    params: {userId, guestId},
                }
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return rejectWithValue(error.response.data);
        }
    }
);

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk("cart/addToCart", async({productId, quantity, size, color, guestId, userId}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productId,
            quantity,
            size,
            color,
            guestId,
            userId,
        }
    );
    return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}
);


// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
     "cart/updateCartItemQuantity", async ({ productId, quantity, guestId, userId, size, color},
        {rejectWithValue}) => {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                    {
                        productId,
                        quantity,
                        guestId,
                        userId,
                        size,
                        color,
                    }
                );
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response.data);
            }
        }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({
    productId, guestId, userId, color}, {rejectWithValue}) => {
        try {
            const response = await axios({

                method: "DELETE",
                url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
                data: {productId, guestId, userId, size, color},
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
 );

 // Merge guest cart into user cart
 export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async ({ guestId, user}, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
                { guestId, user },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
 );

 const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { product: [] };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(fetchCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Failed to fetch cart";
        })
        //
        .addCase(addToCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to add to cart";
        })
        //
        .addCase(updateCartItemQuantity.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(updateCartItemQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to update item quantity";
        })
        //
        .addCase(removeFromCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to remove item";
        })
        //
        .addCase(mergeCart.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(mergeCart.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload;
            saveCartToStorage(action.payload);
        })
        .addCase(mergeCart.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.message || "Failed to merge cart";
        });
    },
 });


 export const { clearCart } = cartSlice.actions;
 export default cartSlice.reducer; */