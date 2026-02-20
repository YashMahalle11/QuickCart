
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a Razorpay checkout session
export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async (checkoutData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("userToken");
            if (!token) throw new Error("User not authenticated");

            const dataWithCurrency = {
                ...checkoutData,
                currency: "INR", // Razorpay uses INR by default, but explicit is better
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                dataWithCurrency,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Store for persistence
            localStorage.setItem("latestCheckout", JSON.stringify(response.data));

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Checkout failed" }
            );
        }
    }
);

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: JSON.parse(localStorage.getItem("latestCheckout")) || null,
        loading: false,
        error: null,
    },
    reducers: {
        setCheckout: (state, action) => {
            state.checkout = action.payload;
            localStorage.setItem("latestCheckout", JSON.stringify(action.payload));
        },
        clearCheckout: (state) => {
            state.checkout = null;
            localStorage.removeItem("latestCheckout");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Checkout failed";
            });
    },
});

// Export actions
export const { setCheckout, clearCheckout } = checkoutSlice.actions;

// Optional selector
export const selectCheckout = (state) => state.checkout.checkout;

// Export reducer
export default checkoutSlice.reducer;



/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a checkout session 
export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async (checkoutdata, { rejectWithValue }) => {
        try {
            const dataWithCurrency = {
                ...checkoutdata,
                currency: 'INR'  // ✅ Updated currency here
            };

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                dataWithCurrency,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                }
            );

            // Store in localStorage for use after reload
            localStorage.setItem("latestCheckout", JSON.stringify(response.data));

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {
        setCheckout: (state, action) => {
            state.checkout = action.payload;
        },
        clearCheckout: (state) => {
            state.checkout = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    }
});

// Exporting actions
export const { setCheckout, clearCheckout } = checkoutSlice.actions;

// Exporting reducer
export default checkoutSlice.reducer; */



/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a checkout session 
export const createCheckout = createAsyncThunk(
    "checkout/createCheckout",
    async (checkoutdata, { rejectWithValue }) => {
        try {

            const dataWithCurrency = {
                ...checkoutdata,
                currency: 'USD' 
              };

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout`,
                dataWithCurrency,
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

const checkoutSlice = createSlice({
    name: "checkout",
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createCheckout.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCheckout.fulfilled, (state, action) => {
            state.loading = false;
            state.checkout = action.payload;
        })
        .addCase(createCheckout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    }
});

export default checkoutSlice.reducer; */