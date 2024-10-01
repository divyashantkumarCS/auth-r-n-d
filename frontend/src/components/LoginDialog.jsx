/* eslint-disable react/prop-types */

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { oAuthUrl } from '../composables';

export default function LoginDialog() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
                Log in
            </button>

            <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                            Login to Your Account
                                        </DialogTitle>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Social Media Login Buttons */}
                            <div className="flex flex-col bg-gray-50 px-4 py-3 sm:px-6">
                                <button
                                    onClick={oAuthUrl.getGoogleAuthorizationUrl}
                                    type="button"
                                    className="mb-4 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto"
                                >
                                    Login with Google 2.0
                                </button>
                                <button
                                    onClick={oAuthUrl.getFacebookAuthorizationUrl}
                                    type="button"
                                    className="mb-4 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                                >
                                    Login with Facebook 2.0
                                </button>
                                <button
                                    onClick={oAuthUrl.getInstaAuthorizationUrl}
                                    type="button"
                                    className="mb-4 inline-flex w-full justify-center rounded-md bg-[#E1306C] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#d853ef] sm:mt-0 sm:w-auto"
                                >
                                    Login with Instagram 2.0
                                </button>
                                <button
                                    onClick={oAuthUrl.getGithubAuthorizationUrl}
                                    type="button"
                                    className="mb-4 inline-flex w-full justify-center rounded-md bg-[#333] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#595959] sm:mt-0 sm:w-auto"
                                >
                                    Login with GitHub 2.0
                                </button>
                                <button
                                    onClick={oAuthUrl.getPintrestAuthorizationUrl}
                                    type="button"
                                    className="mb-4 inline-flex w-full justify-center rounded-md bg-[#E60023] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#af2237] sm:mt-0 sm:w-auto"
                                >
                                    Login with Pintrest 2.0
                                </button>
                                <button
                                    onClick={oAuthUrl.getTwitterAuthorizationUrl}
                                    type="button"
                                    className="mb-4 inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#373737] sm:mt-0 sm:w-auto"
                                >
                                    Login with X<small>(Twitter)</small> 2.0
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">or</span>
                                </div>
                            </div>

                            {/* Email Login Form */}
                            <div className="bg-white px-4 pb-4 sm:px-6">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="mb-3 w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="mb-3 w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                                >
                                    Login
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
