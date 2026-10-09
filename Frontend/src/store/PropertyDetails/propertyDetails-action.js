import { propertyDetailsActions } from "./propertyDetails-slice";
import { axiosInstance } from "../../utils/axios";

export const getPropertyDetails = (id) => async (dispatch) => {
    try {
        dispatch(propertyDetailsActions.getListingRequest());

        const response = await axiosInstance(`/v1/rent/listing/${id}`);

        console.log(response);

        if (!response) {
            throw new Error("Could not fetch property details");
        }

        const { data } = response.data;

        dispatch(propertyDetailsActions.getPropertyDetails(data));

    } catch (error) {
        dispatch(propertyDetailsActions.getErrors(error.response.data.error));
    }
};