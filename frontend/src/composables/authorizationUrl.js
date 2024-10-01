import axios from 'axios';
import { baseUrl } from '../data';


export const getGoogleAuthorizationUrl = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/getAuthorizationUrl`);
    window.location.href = response?.data?.url;
}

export const getFacebookAuthorizationUrl = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/getLoginDialogUrl`);
    window.location.href = response?.data?.url;
}

export const getInstaAuthorizationUrl = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/getInstaAuthorizationUrl`);
    window.location.href = response?.data?.url;
}

const getGithubAuthorizationUrl = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/getGithubAuthorizationUrl`);
    window.location.href = response?.data?.url;
}

export const getPintrestAuthorizationUrl = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/getPintrestAuthorizationUrl`);
    window.location.href = response?.data?.url;
}

export const getTwitterAuthorizationUrl = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/getTwitterAuthorizationUrl`);
    window.location.href = response?.data?.url;
}

export default {
    getGoogleAuthorizationUrl,
    getFacebookAuthorizationUrl,
    getInstaAuthorizationUrl,
    getGithubAuthorizationUrl,
    getPintrestAuthorizationUrl,
    getTwitterAuthorizationUrl,
}