import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  INewProduct,
  addProduct,
  deleteProduct,
  getAllProducts,
  getExactCategory,
} from "./operations";

export interface IProduct extends INewProduct {
  id: number;
}

interface IProductInitialState {
  product: Array<IProduct>;
  isLoading: boolean;
  error: string;
}

const initialState: IProductInitialState = {
  product: [],
  isLoading: false,
  error: "",
};

const handlePending = (state: { isLoading: boolean; error: string }) => {
  state.isLoading = true;
  state.error = "";
};

// const check: IProduct = {
//   id: 25,
//   title: "kim",
//   price: 15,
//   description: "lorem ipsum lalalal",
//   image:
//     "https://cdn.pixabay.com/photo/2017/06/15/13/06/retro-2405404_1280.jpg",
//   category: "jewelry",
// };

// console.log(check);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllProducts.pending, handlePending)
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error";
      })
      .addCase(addProduct.pending, handlePending)
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.isLoading = false;
          state.product = [...state.product, action.payload];
        }
      )
      .addCase(
        deleteProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          const deleteProductIndex = state.product.findIndex(
            (product) => product.id === action.payload.id
          );
          state.product.splice(deleteProductIndex, 1);
        }
      )
      .addCase(
        getExactCategory.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.product = action.payload;
        }
      );
  },
});

export const productReducer = productSlice.reducer;
