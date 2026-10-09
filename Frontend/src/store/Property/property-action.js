import {propertyActions} from './property-slice';
import {axiosInstance} from '../../utils/axios';

export const getAllProperties =() => async (dispatch,getState) => {
    try{
        console.log("API Started");
        dispatch(propertyActions.getRequest());
        const { SearchParams } = getState().properties;

console.log("SEARCH PARAMS:", SearchParams);

const response = await axiosInstance.get(
    `/v1/rent/listing`,
    { params: { ...SearchParams } }
);
        const {data}=response;
        console.log(data);
        dispatch(propertyActions.getProperties(data));

    } catch (error) {
        dispatch(propertyActions.getErrors(error.message));
    }
}