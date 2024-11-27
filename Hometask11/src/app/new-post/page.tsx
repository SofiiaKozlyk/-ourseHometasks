"use client"

import React from "react";
import NewPostPage from "./newPost";
// import { Provider } from "react-redux";
// import store from "@/store/store";

import StoreProvider from "@/components/StoreProvider";

const NewPostWrapper = () => {

    return (
        <StoreProvider>
            <NewPostPage />
        </StoreProvider>

        // <Provider store={store}>
        //     <NewPostPage />
        // </Provider>
    )
}

export default NewPostWrapper;