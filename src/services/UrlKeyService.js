import axios from "axios";
import { URL_SHORTENER_API_HOST_DEV } from "../constants/URLs";
import { REQUEST_PATH_URL_KEY } from "../constants/Variables";

const getUrlKey = async (productName) => {

    const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };

    const data = await axios
        .post(`${URL_SHORTENER_API_HOST_DEV}/${REQUEST_PATH_URL_KEY}`,{productName: productName}, {
            headers: headers,
        })
        .then((response) => {
            return response.data.message;
        });
    return data;
};

export {
    getUrlKey
};