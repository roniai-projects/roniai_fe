import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import companyReducer from "./companyReducer ";
import productReducer from "./productReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    company: companyReducer,
    product: productReducer,
  },
});
