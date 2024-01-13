import axios from "axios";
import { URL_SHORTENER_API_HOST_DEV } from "../constants/URLs";
import { REQUEST_PATH_URL_SHOERTENER_ALL } from "../constants/Variables";
import { REQUEST_PATH_URL_SHOERTENER } from "../constants/Variables";

const listAllShortUrls = async () => {

    const headers = {
        "Content-Type": "application/json",
    };

    const data = await axios
        .get(`${URL_SHORTENER_API_HOST_DEV}/${REQUEST_PATH_URL_SHOERTENER_ALL}`, {
            headers: headers,
        })
        .then((response) => {
            return response.data.message;
        });
    return data;
};


const deleteShortUrl = async (shortPath) => {

    const headers = {
        "Content-Type": "application/json",
    };

    const data = await axios
        .delete(`${URL_SHORTENER_API_HOST_DEV}/${REQUEST_PATH_URL_SHOERTENER}/${shortPath}`,{
            headers: headers,
        })
        .then((response) => {
            return response.data.message;
        });
    return data;
};


const postShortUrls = async (productName, shortName, urlMapping) => {

    if (productName === '' || productName === undefined || shortName === '' || shortName === undefined || urlMapping === '' || urlMapping === undefined) {
        return;
    }

    const headers = {
        "Content-Type": "application/json",
    };
    const data = await axios
        .post(`${URL_SHORTENER_API_HOST_DEV}/${REQUEST_PATH_URL_SHOERTENER}`, {
            productName: productName,
            shortName: shortName,
            urlMapping: urlMapping
        }, {
            headers: headers,
        })
        .then((response) => {
            return response.data.message;
        });
    return data;
};

export {
    listAllShortUrls, deleteShortUrl, postShortUrls
};