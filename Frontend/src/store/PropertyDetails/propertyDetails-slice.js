import {createSlice} from "@reduxjs/toolkit";
const propertyDetailsSlice = createSlice({
    name: "propertyDetails",
    initialState: {
        propertyDetails:null,
        loading:false,
        error:null
    },
    reducers:{
        getListingRequest:(state)=>{
            state.loading=true;
    },
    getPropertyDetails:(state,action)=>{
        state.propertyDetails=action.payload;
        state.loading=false;
    },
    getErrors:(state,action)=>{
        state.error=action.payload;
    }
}
});

export const propertyDetailsActions=propertyDetailsSlice.actions;
export default propertyDetailsSlice;