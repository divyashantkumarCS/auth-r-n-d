/* eslint-disable react/no-unescaped-entities */
// src/pages/OpenIDConnectPage.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiLock, FiShield } from "react-icons/fi";

const OpenIDConnectPage = () => {
    const [isKeyConcepts, setIsKeyConcepts] = useState(false); // Key Concepts Accordion
    const [isFlowOpen, setIsFlowOpen] = useState(false);
    const [isTechOpen, setIsTechOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <motion.div
            className="py-12 bg-gray-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-4xl font-bold mb-4">OpenID Connect: Identity Layer on OAuth 2.0</h1>
                    <p className="text-lg">Enhancing OAuth 2.0 for user authentication and identity.</p>
                </header>

                <section className="mt-12">
                    <motion.div
                        className="bg-white rounded-lg shadow-lg p-8 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Historical Context</h2>
                        <p className="text-gray-700">
                            OpenID Connect was developed to add an authentication layer to the existing OAuth 2.0 framework, allowing clients to verify the identity of end-users based on the authentication performed by an authorization server.
                        </p>
                    </motion.div>

                    <div className="bg-blue-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsKeyConcepts(!isKeyConcepts)}>
                            <h3 className="text-xl font-semibold">Key Features</h3>
                            {isKeyConcepts ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                        </div>
                        {isKeyConcepts && (
                            <motion.div
                                className="mt-4 text-gray-700"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="mb-2">
                                    Key features of OpenID Connect include:
                                </p>
                                <ul className="pl-6 list-disc">
                                    <li>
                                        <strong>ID Token</strong>: A JSON Web Token (JWT) that contains user identity information.
                                    </li>
                                    <li>
                                        <strong>UserInfo Endpoint</strong>: An endpoint to retrieve user profile information.
                                    </li>
                                    <li>
                                        <strong>Standard Scopes</strong>: Includes scopes like openid, profile, and email for specific user data access.
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-purple-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsFlowOpen(!isFlowOpen)}>
                            <h3 className="text-xl font-semibold">OpenID Connect Flow</h3>
                            {isFlowOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                        </div>
                        {isFlowOpen && (
                            <motion.div
                                className="mt-4 text-gray-700"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p>
                                    The OpenID Connect flow is typically performed as follows:
                                </p>
                                <div className="mt-4">
                                    <h4 className="font-semibold">Step 1: Authorization Request</h4>
                                    <p>
                                        The client redirects the user to the OpenID Provider (OP) for authorization.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 2: User Authentication</h4>
                                    <p>
                                        The user authenticates with the OP, which issues an ID token and optionally an access token.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 3: Token Validation</h4>
                                    <p>
                                        The client validates the ID token and can make an optional call to the UserInfo endpoint to retrieve additional user details.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-green-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsTechOpen(!isTechOpen)}>
                            <h3 className="text-xl font-semibold">Technologies Behind OpenID Connect</h3>
                            {isTechOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
                        </div>
                        {isTechOpen && (
                            <motion.div
                                className="mt-4 text-gray-700"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ul className="pl-6 list-disc">
                                    <li>
                                        <strong>JSON Web Tokens (JWT)</strong>: Used for the ID token to securely transmit information.
                                    </li>
                                    <li>
                                        <strong>OAuth 2.0</strong>: The underlying framework for authentication.
                                    </li>
                                    <li>
                                        <strong>HTTPS</strong>: Required for secure communications between client and server.
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <motion.div
                            className="bg-white rounded-lg shadow-lg p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <FiLock className="mr-2" /> Advantages
                            </h3>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Provides a standardized method for user authentication.</li>
                                <li>Enhances user experience through single sign-on capabilities.</li>
                                <li>Allows clients to obtain user information easily and securely.</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="bg-white rounded-lg shadow-lg p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <FiShield className="mr-2" /> Disadvantages
                            </h3>
                            <ul className="list-disc list-inside text-gray-700">
                                <li>Dependency on the OpenID Provider's uptime and security.</li>
                                <li>Complexity can arise from integrating multiple identity providers.</li>
                                <li>Possible privacy concerns regarding user data handling.</li>
                            </ul>
                        </motion.div>
                    </section>

                    <motion.div
                        className="bg-blue-50 rounded-lg shadow-md p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4">Conclusion</h3>
                        <p className="text-gray-700">
                            OpenID Connect enriches the OAuth 2.0 framework by adding an authentication layer, making it a versatile solution for identity verification in modern applications. Its adoption facilitates secure, user-friendly authentication processes.
                        </p>
                    </motion.div>
                </section>
            </div>
        </motion.div>
    );
};

export default OpenIDConnectPage;
