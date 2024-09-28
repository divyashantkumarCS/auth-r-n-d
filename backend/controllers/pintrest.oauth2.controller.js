

import axios from 'axios';
import jwt from 'jsonwebtoken';
import appconf from '../config/config.js'


// https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/#authorization-code-grant
export const getPintrestAuthorizationUrl = async (req, res) => {
    const endpoint = "https://www.pinterest.com/oauth/";
    const parameters = {
        client_id: appconf.PINTREST_APP_ID,
        redirect_uri: appconf.PINTREST_REDIRECT_URL,
        response_type: "code",
        // https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/#choose-scopes
        scope: "user_accounts:read",
        state: "your_optional_string"  // kind of secret to prevent CSRF attack
    }

    let queryParams = '';
    Object.keys(parameters).forEach(key => {
        queryParams += `${key}=${parameters[key]}&`
    })

    queryParams = queryParams.slice(0, -1);

    // https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/#example-request-to-the-oauth-page
    res.status(200).send({
        url: `${endpoint}?${queryParams}`,
    })
}

// https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/#step-1-redirect-the-user-to-the-pinterest-oauth-page
export const getUserAccessToken = async (client_id, client_secret, redirect_uri, code) => {
    const endpoint = "https://api.pinterest.com/v5/oauth/token";
    const body = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
    }

    const authorizationString = `${client_id}:${client_secret}`;
    const base64Encoded = Buffer.from(authorizationString).toString('base64');

    // https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/#example-requests
    const response = await axios.post(endpoint, body, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${base64Encoded}`
        }
    })
    // https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/#example-response
    return response?.data;
}

// https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/#choose-scopes
export const getUserData = async (user_access_token) => {
    // https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/#choose-scopes
    const endpoint = "https://api.pinterest.com/v5/user_account";

    const response = await axios.get(endpoint, {
        headers: {
            "Authorization": `Bearer ${user_access_token}`
        }
    });

    return response?.data;
    /*
        userData :  {
            account_type: 'BUSINESS',
            board_count: 0,
            pin_count: 0,
            follower_count: 0,
            about: '',
            website_url: 'http://www.checkedspot.com',
            monthly_views: -1, 
            business_name: 'Checked Spot',
            id: '949063458882707648',
            following_count: 0,
            username: string,
            profile_image: string_url
        }
    */

}

export const pintrestOAuthCallback = async (req, res) => {
    // https://developers.pinterest.com/docs/getting-started/set-up-authentication-and-authorization/#step-2-receive-the-authorization-code-with-your-redirect-uri
    const authorizationCode = req?.query?.code;
    console.log("1. authorizationCode : ", authorizationCode);

    // Get the User Access Token by exchanging authorizationCode
    const { access_token } = await getUserAccessToken(appconf.PINTREST_APP_ID, appconf.PINTREST_APP_SECRET, appconf.PINTREST_REDIRECT_URL, authorizationCode);
    console.log("2. user_access_token : ", access_token);

    const userData = await getUserData(access_token);
    console.log("3. userData : ", userData);

    // replace true with some comdition like data save in ds success or not
    if (true) {
        const tokenSignature = {
            userData: {
                "email": userData?.email,
                "name": userData?.name,
                "picture": userData?.profile_image,
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

export const pintrestDeauthorize = async (req, res) => {

}

export const pintrestDataDeletion = async (req, res) => {

}


/*
    *****We cannot get email of a user from "pinterest api" --> You cant get email address of Authenticated user via API. Pintrest do not provide that detail through API.. 
    *****And in case of some github account the name parameter in response is also NULL.
    *****So we must handle that part ourselves. 
*/