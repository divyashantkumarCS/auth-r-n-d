// src/pages/OAuth2Page.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiLock, FiShield } from "react-icons/fi";

const OAuth2Page = () => {
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
                <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-4xl font-bold mb-4">OAuth 2.0: The Next Generation of Authorization</h1>
                    <p className="text-lg">Exploring the updated protocol for secure API access.</p>
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
                            OAuth 2.0 was introduced to address the limitations of OAuth 1.0a, making it easier for developers to implement secure access for their applications. It provided a more flexible framework and improved user experience for authorizing access to web services.
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
                                    OAuth 2.0 introduced several key improvements:
                                </p>
                                <ul className="pl-6 list-disc">
                                    <li>
                                        <strong>Token Types</strong>: Support for different types of tokens (Bearer, JWT).
                                    </li>
                                    <li>
                                        <strong>Scopes</strong>: Fine-grained access control using scopes.
                                    </li>
                                    <li>
                                        <strong>Implicit Grant Flow</strong>: Simplified flow for single-page applications.
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-purple-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsFlowOpen(!isFlowOpen)}>
                            <h3 className="text-xl font-semibold">OAuth 2.0 Flow</h3>
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
                                    The OAuth 2.0 flow typically involves the following steps:
                                </p>
                                <div className="mt-4">
                                    <h4 className="font-semibold">Step 1: Authorization Request</h4>
                                    <p>
                                        The client requests authorization from the user by redirecting them to the authorization server.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 2: User Authorization</h4>
                                    <p>
                                        The user approves or denies the request. If approved, the user is redirected back to the client with an authorization code.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 3: Access Token Request</h4>
                                    <p>
                                        The client exchanges the authorization code for an access token.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 4: Accessing Protected Resources</h4>
                                    <p>
                                        The client uses the access token to access protected resources on behalf of the user.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-green-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsTechOpen(!isTechOpen)}>
                            <h3 className="text-xl font-semibold">Technologies Behind OAuth 2.0</h3>
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
                                        <strong>Bearer Tokens</strong>: A type of access token that is used in requests to APIs.
                                    </li>
                                    <li>
                                        <strong>Authorization Code</strong>: A temporary code exchanged for access tokens.
                                    </li>
                                    <li>
                                        <strong>JWT (JSON Web Tokens)</strong>: A compact and self-contained way for securely transmitting information.
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
                                <li>Flexible and easier to implement than OAuth 1.0a.</li>
                                <li>Support for mobile and web applications.</li>
                                <li>Improved security with token scopes and types.</li>
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
                                <li>Token management can be challenging.</li>
                                <li>Implicit flow has security concerns.</li>
                                <li>Authorization server must be secured properly.</li>
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
                            OAuth 2.0 represents a significant improvement over its predecessor, providing a more robust and flexible approach to authorization. It laid the foundation for modern API security practices, making it a critical component in web and mobile application development.
                        </p>
                    </motion.div>
                </section>
            </div>
        </motion.div>
    );
};

export default OAuth2Page;
