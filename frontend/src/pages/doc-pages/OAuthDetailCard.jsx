/* eslint-disable react/prop-types */
// src/components/OAuthDetailCard.js
import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi"; // Import arrow icon

const OAuthDetailCard = ({ version, description, technologies, flow }) => {
    const [isTechOpen, setIsTechOpen] = useState(false); // Accordion state for Technologies
    const [isFlowOpen, setIsFlowOpen] = useState(false); // Accordion state for Flow

    const toggleTechAccordion = (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent redirection when opening the accordion
        setIsTechOpen((prev) => !prev);
    };

    const toggleFlowAccordion = (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent redirection when opening the accordion
        setIsFlowOpen((prev) => !prev);
    };

    return (
        <motion.div
            className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out cursor-pointer"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">{version}</h3>
            <p className="text-gray-700 mb-4">{description}</p>

            {/* Technologies Accordion */}
            <div className="mb-4">
                <button
                    onClick={toggleTechAccordion}
                    className="w-full text-left font-medium text-lg py-2 border-b-2 border-gray-300 focus:outline-none hover:text-blue-600 transition-colors duration-200"
                >
                    Technologies
                </button>
                {isTechOpen && (
                    <motion.ul
                        className="mt-2 list-disc list-inside text-gray-600 bg-gray-50 p-2 rounded-lg shadow-sm"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {technologies.map((tech, index) => (
                            <li key={index} className="ml-4">{tech}</li>
                        ))}
                    </motion.ul>
                )}
            </div>

            {/* Flow Accordion */}
            <div>
                <button
                    onClick={toggleFlowAccordion}
                    className="w-full text-left font-medium text-lg py-2 border-b-2 border-gray-300 focus:outline-none hover:text-blue-600 transition-colors duration-200"
                >
                    Flow
                </button>
                {isFlowOpen && (
                    <motion.p
                        className="mt-2 text-gray-600 bg-gray-50 p-2 rounded-lg shadow-sm"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {flow}
                    </motion.p>
                )}
            </div>

            {/* Redirect Indicator */}
            <div
                className="flex items-center mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
                <span
                    className="font-medium"
                >Learn More</span>
                <FiArrowRight className="ml-2" />
            </div>
        </motion.div>
    );
};

export default OAuthDetailCard;
