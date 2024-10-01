// src/pages/OAuth21Page.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiLock, FiShield } from "react-icons/fi";

const OAuth21Page = () => {
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
                <header className="bg-gradient-to-r from-red-600 to-yellow-600 text-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-4xl font-bold mb-4">OAuth 2.1: Streamlined Authorization</h1>
                    <p className="text-lg">An updated approach to OAuth for better security and simplicity.</p>
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
                            OAuth 2.1 consolidates OAuth 2.0 and its extensions into a single specification to simplify implementation and increase security. It aims to reduce complexity and eliminate outdated practices.
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
                                    OAuth 2.1 includes:
                                </p>
                                <ul className="pl-6 list-disc">
                                    <li>
                                        <strong>Mandatory PKCE</strong>: Enhanced security through Proof Key for Code Exchange.
                                    </li>
                                    <li>
                                        <strong>Removal of Implicit Flow</strong>: Simplification of the OAuth flow.
                                    </li>
                                    <li>
                                        <strong>Refreshed Token Handling</strong>: Updated guidelines for access and refresh tokens.
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-purple-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsFlowOpen(!isFlowOpen)}>
                            <h3 className="text-xl font-semibold">OAuth 2.1 Flow</h3>
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
                                    The OAuth 2.1 flow is streamlined with the following steps:
                                </p>
                                <div className="mt-4">
                                    <h4 className="font-semibold">Step 1: Authorization Request</h4>
                                    <p>
                                        The client redirects the user to the authorization server to request authorization.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 2: User Authorization</h4>
                                    <p>
                                        The user consents to allow the client access. The server then redirects back with an authorization code.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 3: Access Token Request</h4>
                                    <p>
                                        The client exchanges the authorization code for an access token using PKCE.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 4: Accessing Resources</h4>
                                    <p>
                                        The client uses the access token to access protected resources.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div className="bg-green-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsTechOpen(!isTechOpen)}>
                            <h3 className="text-xl font-semibold">Technologies Behind OAuth 2.1</h3>
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
                                        <strong>PKCE (Proof Key for Code Exchange)</strong>: A mechanism to mitigate authorization code interception attacks.
                                    </li>
                                    <li>
                                        <strong>Bearer Tokens</strong>: For accessing resources on behalf of the user.
                                    </li>
                                    <li>
                                        <strong>HTTPS</strong>: Mandatory use of HTTPS for all communication to enhance security.
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
                                <li>Simplifies OAuth implementation.</li>
                                <li>Stronger security measures with mandatory PKCE.</li>
                                <li>Eliminates less secure implicit flow.</li>
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
                                <li>Still requires proper implementation and security practices.</li>
                                <li>Transitioning from OAuth 2.0 can be complex for existing systems.</li>
                                <li>Not all existing OAuth 2.0 implementations are compliant.</li>
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
                            OAuth 2.1 addresses the challenges faced by its predecessors, consolidating best practices and improving security. It is designed for today’s applications, ensuring that developers can implement secure authorization with confidence.
                        </p>
                    </motion.div>
                </section>
            </div>
        </motion.div>
    );
};

export default OAuth21Page;
