import { userActions } from "./user-slice";
import { axiosInstance } from "../../utils/axios";

export const getSignup = (userData) => async (dispatch) => {
    try {
        dispatch(userActions.getSignupRequest());

        const { data } = await axiosInstance.post(
            "/v1/rent/user/signup",
            userData
        );

        dispatch(userActions.getSignupDetails(data.user));
    } catch (error) {
        dispatch(
            userActions.getError(
                error.response?.data?.message || error.message
            )
        );
    }
};

export const getLogin = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getLoginRequest());

        const { data } = await axiosInstance.post(
            "/v1/rent/user/login",
            user
        );

        dispatch(userActions.getLoginDetails(data.user));
    } catch (error) {
        dispatch(
            userActions.getError(
                error.response?.data?.message || error.message
            )
        );
    }
};

export const currentUser = () => async (dispatch) => {
    try {
        dispatch(userActions.getCurrentRequest());

        const { data } = await axiosInstance.get(
            "/v1/rent/user/me"
        );

        dispatch(userActions.getCurrentUser(data.user));
    } catch (error) {
        dispatch(userActions.getLogout());
    }
};

export const updateUser = (updateUser) => async (dispatch) => {
    try {
        dispatch(userActions.getUpdateUserRequest());

        const { data } = await axiosInstance.patch(
            "/v1/rent/user/updateMe",
            updateUser
        );

        console.log(data);

        const response = await axiosInstance.get(
            "/v1/rent/user/me"
        );

        dispatch(userActions.getCurrentUser(response.data.user));
    } catch (error) {
        dispatch(
            userActions.getError(
                error.response?.data?.message || error.message
            )
        );
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        await axiosInstance.post(
            "/v1/rent/user/forgotPassword",
            { email }
        );
    } catch (error) {
        dispatch(
            userActions.getError(
                error.response?.data?.message || error.message
            )
        );
    }
};

export const resetPassword = (token, password) => async (dispatch) => {
    try {
        await axiosInstance.patch(
            `/v1/rent/user/resetPassword/${token}`,
            { password }
        );
    } catch (error) {
        dispatch(
            userActions.getError(
                error.response?.data?.message || error.message
            )
        );
    }
};

export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch(userActions.getPasswordRequest());

        await axiosInstance.patch(
            "/v1/rent/user/updateMyPassword",
            passwords
        );

        dispatch(userActions.getPasswordSuccess(true));
    } catch (error) {
        dispatch(
            userActions.getError(
                error.response?.data?.message || error.message
            )
        );
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axiosInstance.get(
            "/v1/rent/user/logout"
        );

        dispatch(userActions.getLogout());
    } catch (error) {
        dispatch(
            userActions.getError(
                error.response?.data?.message || error.message
            )
        );
    }
};