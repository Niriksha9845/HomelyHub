import {createSlice} from '@reduxjs/toolkit';
const propertySlice = createSlice({
    name: 'property',
    initialState: {
        properties: [],
        totalProperties: 0,
        SearchParams: {},
        loading: false,
        error: null
    },
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        getProperties(state, action) {
            state.properties = action.payload.data;
            state.totalProperties = action.payload.all_properties;
            state.loading = false;
        },
        updateSearchParams: (state, action) => {
            state.SearchParams = Object.keys(action.payload).length > 0 ? {
                ...state.SearchParams,
                ...action.payload,
            } : state.SearchParams;
        },
        getErrors: (state, action) => {
            state.error = action.payload;
        }
    }
});
export const propertyActions = propertySlice.actions;

export default propertySlice;