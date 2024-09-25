import { Router } from "express";
import { 
    getAuthorizationUrlFromGoogle, 
    getTokensFromGoogle 
} from "../controllers/google.oauth.controller.js";
import { facebookOauth, getLoginDialog } from "../controllers/facebook.oauth.controller.js";

export const oAuthRouter = Router();

// GOOGLE oauth routes
oAuthRouter.get('/getAuthorizationUrl', getAuthorizationUrlFromGoogle);

oAuthRouter.get('/google-callback/auth', getTokensFromGoogle)


// FACEBOOK oauth routes
oAuthRouter.get('/getLoginDialogUrl', getLoginDialog);

oAuthRouter.get('/facebook-oauth', facebookOauth);

// oAuthRouter.get('/google-callback/auth', getTokensFromGoogle)