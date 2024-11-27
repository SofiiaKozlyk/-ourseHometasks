"use client"

import React from "react";
import LoginPage from "./login";
// import { Provider } from "react-redux";
// import store from "@/store/store";

import StoreProvider from "@/components/StoreProvider";

const LoginWrapper = () => {

    return (
        <StoreProvider>
            <LoginPage />
        </StoreProvider>
        // <Provider store={store}>
        //     <LoginPage />
        // </Provider>
    )
}

export default LoginWrapper;