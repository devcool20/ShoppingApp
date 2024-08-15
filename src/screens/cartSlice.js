import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemId = action.payload.id;
      if (state.items[itemId]) {
        state.items[itemId].quantity += 1;
      } else {
        state.items[itemId] = { ...action.payload, quantity: 1 };
      }
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId]) {
        state.items[itemId].quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      if (state.items[itemId] && state.items[itemId].quantity > 1) {
        state.items[itemId].quantity -= 1;
      } else {
        delete state.items[itemId]; 
      }
    },
  },
});

export const { addItemToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
