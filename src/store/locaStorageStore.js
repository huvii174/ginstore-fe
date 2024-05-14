import { createSlice } from '@reduxjs/toolkit';

let productIds = localStorage.getItem('productIds') ? JSON.parse(localStorage.getItem('productIds')) : [];

const initialState = {
    productIds: productIds
}

export const localStorageSlice = createSlice({
    name: 'productIds',
    initialState,
    reducers: {
        getProductIds: (state, action) => {
            let productIds = localStorage.getItem('productIds');
            state.productIds = JSON.parse(productIds);
        },
        addItemProductId: (state, action) => {
            console.log('----------- action: ', action);
            const itemInCart = state.productIds.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                // itemInCart.quantity += action.payload.quantity;
                console.log('Đã tồn tại ID '+  itemInCart);
            } else {
                state.productIds.push({ ...action.payload});
                console.log('ADD ')
            }
            localStorage.setItem('productIds', JSON.stringify(state.productIds));
        },
        // incrementQuantity: (state, action) => {
        //     const item = state.listCart.find((item) => item.id === action.payload.id);
        //     item.quantity++;
        //     localStorage.setItem('cart', JSON.stringify(state.listCart))
        // },
        // decrementQuantity: (state, action) => {
        //     const item = state.listCart.find((item) => item.id === action.payload.id)
        //     if (item.quantity === 1) {
        //         item.quantity = 1;
        //     } else {
        //         item.quantity--;
        //     }
        //
        //     localStorage.setItem('cart', JSON.stringify(state.listCart));
        // },
        // removeItem: (state, action) => {
        //     let removeItem = state.listCart.filter((item) => item.id !== action.payload.id)
        //     state.listCart = removeItem;
        //     localStorage.setItem('cart', JSON.stringify(state.listCart))
        // },
        // removeAll: (state, action) => {
        //     state.listCart = [];
        //     localStorage.setItem('cart', JSON.stringify(state.listCart));
        // }
    }
})

export const { getProductIds, addItemProductId } = localStorageSlice.actions

export default localStorageSlice.reducer;
