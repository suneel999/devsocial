import { configureStore } from "@reduxjs/toolkit"

import userReducer from "./UserSlice"
import feedReducer from "./FeedSlice"
import connectionReducer from "./ConnectionSlice"
import requestsReducer from "./RequestSlice"

const appStore = configureStore({
    reducer: {
        feed: feedReducer,
        user: userReducer,
        connection: connectionReducer,
        requests: requestsReducer

    }
})

export default appStore;