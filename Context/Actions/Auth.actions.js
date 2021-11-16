import jwt_decode from "jwt-decode"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Toast from "react-native-toast-message"
import
baseURL
from '../../assets/common/baseURL'
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = async (user, dispatch) => {
    console.log(user)
    fetch(`${baseURL}users/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Login Successfully",
                    visibilityTime: 250
                });
                const token = data.token;
                AsyncStorage.setItem("jwt", token)
                const decoded = jwt_decode(token)
                console.log('the decoded value is ', decoded)
                dispatch(setCurrentUser(decoded, user))
            } else {
                logoutUser(dispatch)
            }
        })
        .catch((err) => {
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please provide correct credentials",
            });
            logoutUser(dispatch)
            return
        });
};

export const getUserProfile = (id) => {
    fetch(`${baseURL}users/login/${id}`, {
            method: "GET",
            body: JSON.stringify(user),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
        .then((res) => res.json())
        .then((data) => console.log("the data", data)).catch((error) => {
            console.log(error.message)
        })
}

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentUser({}))
}

export const setCurrentUser = (decoded, user) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
        userProfile: user
    }
}