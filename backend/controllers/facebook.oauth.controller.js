
import { config } from "dotenv";
import axios from 'axios';
import jwt from 'jsonwebtoken';

config();


export const getLoginDialog = async (req, res) => {
    const endpoint = 'https://www.facebook.com/v20.0/dialog/oauth';

    const parameters = {
        client_id: process.env.APP_ID,
        redirect_uri: process.env.YOUR_REDIRECT_URL,
        scope: "email,public_profile",
        response_type: "code",
        state: "{st=state123abc,ds=123456789}", // kind of secret to prevent CSRF attack
    }

    let queryParams = `${endpoint}?`;
    Object.keys(parameters).forEach(element => {
        queryParams += `${element}=${parameters[element]}&`
    })
    queryParams = queryParams.slice(0, -1);

    res.send({ status: 200, "url": queryParams })
}

// Confirming Identity
// Exchanging Code for an Access Token(user access token)
// https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/
export const getUserAccessToken = async (code, app_id, app_secret, redirect_uri) => {
    const token_endpoint = "https://graph.facebook.com/v20.0/oauth/access_token";
    const parameters = {
        client_id: app_id,
        client_secret: app_secret,
        redirect_uri: redirect_uri,
        code: code
    }

    let queryParams = `${token_endpoint}?`
    for (const parameter in parameters) {
        queryParams += `${parameter}=${parameters[parameter]}&`
    }
    queryParams = queryParams.slice(0, -1);

    // Get USER ACCESS TOKEN
    const response = await axios.get(queryParams);

    return response?.data?.access_token;
}

// Generating an App Access Token
// https://developers.facebook.com/docs/facebook-login/guides/access-tokens/
export const getAppAccesToken = async (app_id, app_secret) => {
    const response = await axios.get(`https://graph.facebook.com/oauth/access_token?client_id=${app_id}&client_secret=${app_secret}&grant_type=client_credentials`);

    return response?.data?.access_token;
}

// Inspecting Access Tokens
// https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/
export const getInspectedTokenData = async (input_token, access_token) => {
    const inspect_token_endpoint = `https://graph.facebook.com/debug_token?input_token=${input_token}&access_token=${access_token}`

    const response = await axios.get(inspect_token_endpoint);

    return response?.data?.data;
}

// User permissions
// https://developers.facebook.com/docs/graph-api/reference/user/permissions
export const getAllowedScopesByUser = async (userId, user_access_token) => {
    const endpoint = `https://graph.facebook.com/v20.0/${userId}/permissions?access_token=${user_access_token}`;

    const response = await axios.get(endpoint);

    return response?.data?.data;
}

// It's OK to ask a person again to grant your app permissions that they've declined
// https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/
export const reRequestPermissions = (app_id, redirect_uri, scope) => {
    return `https://www.facebook.com/v20.0/dialog/oauth? client_id=${app_id}&redirect_uri=${redirect_uri}&auth_type=rerequest&scope=${scope}`
}

// Fields
// https://developers.facebook.com/docs/graph-api/overview/
export const getUserData = async (userId, user_access_token) => {
    const endpoint = `https://graph.facebook.com/${userId}?fields=id,name,email,picture&access_token=${user_access_token}`;

    const response = await axios.get(endpoint);

    return response?.data;
}

// https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/
export const facebookOauth = async (req, res) => {

    const app_id = process.env.APP_ID;
    const app_secret = process.env.APP_SECRET;
    const redirect_uri = process.env.YOUR_REDIRECT_URL;
    const code_params = req?.query?.code;

    // Confirming Identity and Get  USER ACCESS TOKEN
    const user_access_token = await getUserAccessToken(code_params, app_id, app_secret, redirect_uri);

    // Get APP TOKEN
    const app_token = await getAppAccesToken(app_id, app_secret);

    // INSPECT the Access Tokens(access_token->userToken) with app_token(admin_token);
    const resData = await getInspectedTokenData(user_access_token, app_token);
    const userId = resData?.user_id;

    // Check the granted permissions by user
    const permissionsData = await getAllowedScopesByUser(userId, user_access_token);

    // if user has denied status for his/her email scope --> call reRequestPermissions() and push the rerequest url in the response
    // and load the url into browser
    for (let i = 0; i < permissionsData.length; i++) {
        if (permissionsData[i].permission == "email" && permissionsData[i].status == "declined") {
            res.redirect(reRequestPermissions(app_id, redirect_uri, 'email'));
        }
    }

    // else make api call to get the user data and store it in db  and the login the user in the application.
    const userData = await getUserData(userId, user_access_token);
    console.log(userData)

    /*
        userData :  {
            id: '494087093523459',
            name: 'Checked Spot',
            email: 'checkedspot.hsn@gmail.com',
            picture: {
                data: {
                height: 50,
                is_silhouette: false,
                url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=494087093523459&height=50&width=50&ext=1729846076&hash=AbbPSh84xrUg5gmkHaYRKiI2',
                width: 50
                }
            }
        }
    */

    // replace true with some comdition like data save in ds success or not
    if (true) {
        const tokenSignature = {
            userData: {
                "email": userData?.email,
                "name": userData?.name,
                "picture": userData?.picture?.data?.url,
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


/**
 * for (let i = 0; i < permissionsData.length; i++) {
        if (permissionsData[i].permission == "email" && permissionsData[i].status == "declined") {
            res.redirect(reRequestPermissions(app_id, redirect_uri, 'email'));
        }
    }
        
    IN THE ABOVE CODE SNIPPET,
    
    The use will be redirected to the same page n which the were,
    in this case i will feel like they got stuck in login process and they will leave.
    
    Therefore it is advisable that use some kind of indicator (like a pop-up message) that they have to grant the email permission to login himself/herself.
    
    So instead of directly redirecting to the same page we can choose some other alternatives.
 */

    /*
        // Detecting When People Uninstall Apps
        // https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/

        If want nottification, if user uninsall app from their facebook account(meaning if delete the websites on which they have loggedin using their facebook account -> here our website(not exactly meaning it but somewhere similar to that))
        
        Then setup and enable a deauthorize callback through the App Dashboard.
        // Data Deletion Request Callback
        // https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback
     */