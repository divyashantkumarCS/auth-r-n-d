import { config } from "dotenv";
import axios from 'axios';

import jwt from 'jsonwebtoken';

config();

// Authentication
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/overview
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login#embed-the-business-login-url
export const getInstaAuthorizationUrl = async (req, res) => {
    const endpoint = 'https://www.instagram.com/oauth/authorize';
    const parameters = {
        client_id: process.env.INSTAGRAM_APP_ID,
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URL,
        response_type: 'code',
        scope: 'business_basic'
    }
    // scope='business_basic,business_manage_messages,business_manage_comments,business_content_publish'
    let queryParams = '';

    for (const key in parameters) {
        queryParams += `${key}=${parameters[key]}&`
    }
    queryParams = queryParams.slice(0, -1);

    res.send({
        status: 200,
        url: `${endpoint}?${queryParams}`
    });
}

// Step 2. Exchange the Code For a Token(short-lived access token)
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login#embed-the-business-login-url
export const getUserAccessToken = async (app_id, app_secret, redirect_uri, code) => {
    const endpoint = 'https://api.instagram.com/oauth/access_token';

    const formData = new FormData();
    formData.append('client_id', app_id);
    formData.append('client_secret', app_secret);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', redirect_uri);
    formData.append('code', code);

    const response = await axios.post(endpoint, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });

    /*
        response.data: {
            access_token: '<access_token>',
            user_id: numbers,
            permissions: [
                'instagram_business_basic',
                'instagram_business_manage_messages',
                'instagram_business_content_publish',
                'instagram_business_manage_comments'
            ]
        }
     */
    return response?.data;
}

// Step . Exchange the user's short-lived access token For a user's long-lived access token Token(60 days)
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login#embed-the-business-login-url
export const getLongLivedUserAccessToken = async (app_secret, user_access_token) => {
    const endpoint = 'https://graph.instagram.com/access_token';
    const parameters = {
        grant_type: 'ig_exchange_token',
        client_secret: app_secret,
        access_token: user_access_token
    }

    let queryParams = '';

    Object.keys(parameters).forEach(key => {
        queryParams += `${key}=${parameters[key]}&`;
    });

    queryParams = queryParams.slice(0, -1);

    const response = await axios.get(`${endpoint}?${queryParams}`);
    return response?.data?.access_token;
}

// Get the app user ID & username
// https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/get-started
export const getUserData = async (user_access_token) => {
    const endpoint = "https://graph.instagram.com/v20.0/me";

    const parameters = {
        fields: "user_id,username,name,account_type,profile_picture_url,followers_count,follows_count,media_count",
        access_token: user_access_token
    }

    let queryParams = "";
    Object.keys(parameters).forEach(key => {
        queryParams += `${key}=${parameters[key]}&`;
    })
    queryParams = queryParams.slice(0, -1);
    const response = await axios.get(`${endpoint}?${queryParams}`)
    /*
        response.data :  {
            user_id: string,
            username: 'checkedspot',
            name: 'Checked Spot',
            account_type: 'MEDIA_CREATOR',
            profile_picture_url: string<url>,
            followers_count: number,
            follows_count: number,
            media_count: number,
            id: string
        }
    */
    return response.data;
}

export const oAuthCallback = async (req, res) => {
    // if will only exist if user denied the authorization
    // Canceled authorization
    // https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login#embed-the-business-login-url
    if (req?.query?.error) {
        // it is better to redirect to login page
        res.redirect(process.env.REDIRECT_TO_UI);
    }
    const app_id = process.env.INSTAGRAM_APP_ID;
    const app_secret = process.env.INSTAGRAM_APP_SECRET;
    const redirect_uri = process.env.INSTAGRAM_REDIRECT_URL;
    const authorization_code = req?.query?.code;

    // Exchange Authorization code to get Access Token(User Access Token)
    const userAccessTokenData = await getUserAccessToken(app_id, app_secret, redirect_uri, authorization_code);

    const user_access_token = userAccessTokenData?.access_token;
    const userId = userAccessTokenData?.user_id;

    // Exchange User acces Token to get long-lived user access token(60 days)
    const longLivedUserAccesstoken = await getLongLivedUserAccessToken(app_secret, user_access_token);

    const userData = await getUserData(longLivedUserAccesstoken);

     // replace true with some comdition like data save in ds success or not
     if (true) {
        const tokenSignature = {
            userData: {
                "email": userData?.email,
                "name": userData?.name,
                "picture": userData?.profile_picture_url,
                "roles": userData?.roles
            }
        };

        const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), ...tokenSignature }, 'privetKey', { algorithm: 'HS256' });

        res.cookie("token", `Bearer ${token}`, {
            maxAge: (3600000 * 24),
            httpOnly: false,
            //here domain, which can access this cookie like localhost, www.checkedspot.com
            //specify .checkedspot.com, isetn this case all the subdomains can also access this cookie like blog.checkedspot.com, checkedspot.com
            domain: process.env.DOMAIN,
            path: "/",
            secure: true,
            sameSite: "Lax",
        })
        res.redirect(process.env.REDIRECT_TO_UI);
    } else {
        res.redirect(process.env.ERROR_REDIRECT_TO_UI)
    }
}

export const instagramDeauthorize = async (req, res) => {

}

export const instagramDataDeletion = async (req, res) => {

}

/*
    *****We cannot get email of a user from "Instagram API with Instagram Login" APIs. 
    *****So we must handle that part ourselves.
*/

/*
    We can include refresh token login also using refersh token api provided by 'Business Login for Instagram' the url is given below: 
    // To exchange your app user's long-lived token that is set to expire, send a GET request to the /refresh_access_token endpoint with the following parameters:
    // https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/business-login

    Sample Requests
        curl -i -X GET "https://graph.instagram.com/refresh_access_token
        ?grant_type=ig_refresh_token
        &access_token=<LONG_LIVED_ACCESS_TOKEN>"

    On success, your app receives a JSON response with your app user's long-lived access token, the token type, and the expiration.
        {
            "access_token":"<LONG_LIVED_ACCESS_TOKEN>",
            "token_type": "bearer",
            "expires_in": 5183944  // Number of seconds until token expires
        }
*/


