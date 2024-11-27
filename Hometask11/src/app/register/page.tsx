"use client"

import React from "react";
import RegisterPage from "./register";
// import { Provider } from "react-redux";
// import store from "@/store/store";
import StoreProvider from "@/components/StoreProvider";

const RegisterWrapper = () => {

    return (
        <StoreProvider>
            <RegisterPage />
        </StoreProvider>
        // <Provider store={store}>
        //     <RegisterPage />
        // </Provider>
    )
}

export default RegisterWrapper;