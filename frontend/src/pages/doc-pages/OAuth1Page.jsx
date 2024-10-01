/* eslint-disable react/no-unescaped-entities */
// src/pages/OAuth1Page.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiLock, FiShield } from "react-icons/fi"; // Import icons for visual appeal

const OAuth1Page = () => {
    const [isKeyConcepts, setIsKeyConcepts] = useState(false); // Key Concepts Accordion
    const [isFlowOpen, setIsFlowOpen] = useState(false); // Default open for OAuth flow
    const [isTechOpen, setIsTechOpen] = useState(false); // Accordion for technologies
    
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
                {/* Page Header */}
                <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg shadow-md text-center">
                    <h1 className="text-4xl font-bold mb-4">OAuth 1.0a: The Foundation of Secure Authorization</h1>
                    <p className="text-lg">Exploring the first standardized protocol for API authorization.</p>
                </header>

                {/* Interactive Sections */}
                <section className="mt-12">
                    {/* Historical Context Section */}
                    <motion.div
                        className="bg-white rounded-lg shadow-lg p-8 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Historical Context</h2>
                        <p className="text-gray-700">
                            OAuth 1.0a was created to solve a growing problem: allowing third-party applications to access a user’s resources (like photos, or email contacts) without exposing their credentials. Before OAuth, developers often had to request users' passwords directly, which raised security concerns and led to a lack of trust. OAuth 1.0a was the first step toward delegated authorization via tokens.
                        </p>
                    </motion.div>

                    {/* Key Concepts Accordion */}
                    <div className="bg-blue-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsKeyConcepts(!isKeyConcepts)}>
                            <h3 className="text-xl font-semibold">Key Concepts</h3>
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
                                    OAuth 1.0a is built on the concept of delegating access using three key elements:
                                </p>
                                <ul className="pl-6 list-disc">
                                    <li>
                                        <strong>Request Tokens</strong>: Temporary credentials used by the client to request access on behalf of a resource owner.
                                    </li>
                                    <li>
                                        <strong>Access Tokens</strong>: Tokens used by the client to access protected resources.
                                    </li>
                                    <li>
                                        <strong>Signatures</strong>: OAuth 1.0a uses cryptographic signatures to ensure request authenticity.
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>

                    {/* OAuth Flow Accordion */}
                    <div className="bg-purple-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsFlowOpen(!isFlowOpen)}>
                            <h3 className="text-xl font-semibold">OAuth 1.0a Flow</h3>
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
                                    The OAuth 1.0a flow, often referred to as the three-legged flow, is composed of the following steps:
                                </p>
                                <div className="mt-4">
                                    <h4 className="font-semibold">Step 1: Obtain Request Token</h4>
                                    <p>
                                        The client sends a signed request to the server to obtain a request token, which is temporary and used as a placeholder while the user is redirected for authorization.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 2: User Authorization</h4>
                                    <p>
                                        The user is redirected to the authorization server, where they grant or deny permission to the client. After granting access, the user is redirected back with an authorized request token.
                                    </p>
                                    <h4 className="font-semibold mt-4">Step 3: Exchange Request Token for Access Token</h4>
                                    <p>
                                        The client exchanges the authorized request token for an access token. The access token is then used for making API calls on behalf of the user.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Technologies Section Accordion */}
                    <div className="bg-green-100 rounded-lg shadow-md p-6 mb-8">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsTechOpen(!isTechOpen)}>
                            <h3 className="text-xl font-semibold">Technologies Behind OAuth 1.0a</h3>
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
                                        <strong>HMAC-SHA1</strong>: Hashing algorithm used to create a digital signature for each API request.
                                    </li>
                                    <li>
                                        <strong>RSA-SHA1</strong>: Alternative to HMAC-SHA1, used for public key cryptography.
                                    </li>
                                    <li>
                                        <strong>PLAINTEXT</strong>: Plaintext signatures were also an option, though discouraged due to their insecurity.
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>

                    {/* Advantages & Disadvantages Section */}
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
                                <li>Allowed for delegated access without sharing user credentials.</li>
                                <li>First widely adopted protocol for API authorization.</li>
                                <li>Provided cryptographic proof of authenticity for API requests.</li>
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
                                <li>Overly complex and difficult to implement correctly.</li>
                                <li>Vulnerable to attacks if not implemented using HTTPS.</li>
                                <li>Deprecated due to security and usability issues.</li>
                            </ul>
                        </motion.div>
                    </section>

                    {/* Conclusion Section */}
                    <motion.div
                        className="bg-blue-50 rounded-lg shadow-md p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4">Conclusion</h3>
                        <p className="text-gray-700">
                            OAuth 1.0a was revolutionary for its time, introducing a secure way to grant third-party access without exposing user credentials. Despite its complexity, it laid the groundwork for OAuth 2.0 and subsequent improvements. Its legacy continues to be felt in today’s modern API authorization protocols.
                        </p>
                    </motion.div>
                </section>
            </div>
        </motion.div>
    );
};

export default OAuth1Page;
