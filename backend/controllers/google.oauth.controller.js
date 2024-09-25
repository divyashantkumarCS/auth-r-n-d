
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const getAuthorizationUrlFromGoogle = async (req, res) => {
    let data;
    
    const authorizationEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    const parameters = {
        redirect_uri: process.env.YOUR_REDIRECT_URL,
        client_id: process.env.YOUR_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
    }

    let queryParams = `${authorizationEndpoint}?`;
    Object.keys(parameters).forEach(element => {
        queryParams += `${element}=${parameters[element]}&`
    })
    queryParams = queryParams.slice(0, -1)

    res.send({ status: 200, "url": queryParams })
}

export const getTokensFromGoogle = async (req, res) => {
    try {
        const authorizationCode = req?.query?.code;
        const tokenEndpoint = "https://oauth2.googleapis.com/token";
        const bodyParameters = {
            code: authorizationCode,
            client_id: process.env.YOUR_CLIENT_ID,
            client_secret: process.env.YOUR_CLIENT_SECRET,
            redirect_uri: process.env.YOUR_REDIRECT_URL,
            grant_type: "authorization_code",
        };

        const response = await axios.post(tokenEndpoint, bodyParameters, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        const decodedIdToken = jwt.decode(response?.data?.id_token, {
            complete: true
        });

        // const data = await userServices.findUserService({ email: decodedIdToken?.payload?.email });
        // let userData;
        // if (!data?.email) {
        //     const session = neo4jDB.getDriver().session();
        //     const result = await session.executeWrite(
        //         tx => tx.run(
        //             `
        //                 MERGE (u:User {email : $email, userId: $userId})
        //                 SET u.name = $name, u.mobile = "", u.picture = $picture, u.email_verified = $email_verified, u.mobile_verified = false, u.roles = ['user']
        //                 RETURN u
        //             `,
        //             {
        //                 name: (decodedIdToken?.payload?.name).toLowerCase(),
        //                 email: (decodedIdToken?.payload?.email).toLowerCase(),
        //                 userId: uuidv4(),
        //                 picture: decodedIdToken?.payload?.picture,
        //                 email_verified: decodedIdToken?.payload?.email_verified
        //             }
        //         )
        //     );

        //     userData = result?.records[0]?.get('u')?.properties;

        //     await session?.close();
        // } else if (data?.email_verified === false || data?.picture === '') {
        //     const session = neo4jDB.getDriver().session();
        //     const result = await session.executeWrite(
        //         tx => tx.run(
        //             `
        //                 MATCH (u:User {email : $email})
        //                 SET u.picture = $picture, u.email_verified = true
        //                 RETURN u
        //             `,
        //             {
        //                 email: (decodedIdToken?.payload?.email).toLowerCase(),
        //                 picture: decodedIdToken?.payload?.picture
        //             }
        //         )
        //     );

        //     userData = result?.records[0]?.get('u')?.properties;

        //     await session?.close();
        // } else {
        //     userData = data;
        // }
        // console.log("decoded token : ", decodedIdToken);
        if (true) {
            const tokenSignature = {
                userData: {
                    "email": decodedIdToken?.payload?.email,
                    "name": decodedIdToken?.payload?.name,
                    "picture": decodedIdToken?.payload?.picture,
                    "roles": decodedIdToken?.payload?.roles
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
    } catch (err) {
        console.log(err)
    }
}