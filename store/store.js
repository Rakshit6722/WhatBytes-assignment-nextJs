const { configureStore } = require("@reduxjs/toolkit");
import userSlice from './slice/slice.js'

export const store = configureStore({
    reducer:{
        "user":userSlice
    }
})

