import {createSlice} from "@reduxjs/toolkit";

const loadGuestCart = () => {
    try {
        const savedCart = localStorage.getItem("guestcart");
        return savedCart ? JSON.parse(savedCart) : [];
    } catch {
        return [];
    }
}

const initialState = {
    items: loadGuestCart(),
    isLoggedIn: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.items.find((i) => i._id === item._id && i.color === item.color && i.size === item.size);
            if(existing) {
                existing.quantity += 1;
            } else {
                state.items.push({...item, quantity: 1});
            }

            if(!state.isLoggedIn) {
                localStorage.setItem("guestcart", JSON.stringify(state.items));
            }
        },
        decQuantity: (state, action) => {
            const item = action.payload;
            const existing = state.items.find((i) => i._id === item._id);
            existing.quantity -= 1;
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (i) =>
                !(
                    i._id === action.payload._id &&
                    i.color === action.payload.color &&
                    i.size === action.payload.size
                )
            );
            if(!state.isLoggedIn) {
                localStorage.setItem("guestcart", JSON.stringify(state.items));
            }
        },
        clearCart: (state, action) => {
            state.items = [];
            if(!state.isLoggedIn) {
                localStorage.removeItem("guestcart");
            }
        },
        setCart: (state, action) => {
            state.items = action.payload.items;
            state.isLoggedIn = action.payload.isLoggedIn || false;

            if(!state.isLoggedIn) {
                localStorage.setItem("guestcart", JSON.stringify(state.items));
            } else {
                localStorage.removeItem("guestcart");
            }
        }
    }
})

export const {addToCart, removeFromCart, clearCart, setCart, decQuantity} = cartSlice.actions;
export default cartSlice.reducer;