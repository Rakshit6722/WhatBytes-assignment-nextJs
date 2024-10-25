import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rank:1,
    percentile:30,
    score:10
}

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        updateScores: (state,action) => {
            state.rank = action.payload.rank
            state.percentile = action.payload.percentile
            state.score = action.payload.score
        }
    }
})

export const {updateScores} = userSlice.actions
export default userSlice.reducer