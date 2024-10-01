// src/components/OAuthTimeline.js
// import React from "react";
import { Link } from "react-router-dom";
import OAuthDetailCard from "./OAuthDetailCard";
import { motion } from "framer-motion"; // Import Framer Motion

const OAuthTimeline = () => {
    const oauthDetails = [
        {
            version: "OAuth 1.0a",
            description:
                "OAuth 1.0a is the first iteration of OAuth, primarily focusing on resource owner authorization. It uses signature-based verification and is much more complex compared to OAuth 2.0.",
            technologies: ["HMAC-SHA1", "RSA-SHA1"],
            flow: "OAuth 1.0a uses a 3-legged flow involving user authorization, request tokens, and access tokens.",
            link: '/oauth1'
        },
        {
            version: "OAuth 2.0",
            description:
                "OAuth 2.0 simplifies the process by using tokens and is less complex compared to OAuth 1.0a. It is widely adopted and offers better security with its use of HTTPS.",
            technologies: ["Bearer Tokens", "HTTPS"],
            flow: "OAuth 2.0 has different flows like Authorization Code Flow, Client Credentials Flow, and Implicit Flow.",
            link: '/oauth2'
        },
        {
            version: "OAuth 2.1",
            description:
                "OAuth 2.1 builds on OAuth 2.0 by including several security best practices such as PKCE (Proof Key for Code Exchange) and refresh token management improvements. It aims to enhance security and usability.",
            technologies: ["PKCE", "Refresh Token Rotation"],
            flow: "OAuth 2.1 follows the same core principles as OAuth 2.0 but adds stronger protections against certain attack vectors.",
            link: '/oauth2-1'
        },
        {
            version: "OpenID Connect",
            description:
                "OpenID Connect is an authentication layer built on top of OAuth 2.0. It provides user identity information, making OAuth usable for Single Sign-On (SSO) scenarios.",
            technologies: ["JWT", "ID Tokens"],
            flow: "OpenID Connect adds an ID Token to the OAuth flow, making it suitable for authentication as well as authorization.",
            link: '/openid-connect'
        },
    ];

    return (
        <motion.section
            className="py-12 bg-white"
            initial={{ opacity: 0, y: 20 }} // Start animation state
            animate={{ opacity: 1, y: 0 }} // End animation state
            transition={{ duration: 0.8 }} // Animation speed
        >
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Evolution of OAuth</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {oauthDetails.map((detail, index) => (
                        <Link
                            key={index}
                            to={detail.link}
                        >
                            <OAuthDetailCard
                                version={detail.version}
                                description={detail.description}
                                technologies={detail.technologies}
                                flow={detail.flow}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default OAuthTimeline;
