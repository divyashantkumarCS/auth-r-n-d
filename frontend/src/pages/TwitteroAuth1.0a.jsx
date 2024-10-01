
import axios from 'axios';
import { baseUrl } from '../data/index';
import { useEffect } from 'react';

function Pininterest() {

const getAuthorizationUrl = async () => {
    const response = await axios.get(`${baseUrl}/api/v1/1.0a/getTwitteraAuthorizationUrl`);
    window.location.href = response?.data?.url;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>      
      <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:py-15">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Login with X<small>(Twitter 1.0a)</small> 
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Click on the button below to Login with X<small>(Twitter 1.0a)</small> 
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={getAuthorizationUrl}
              className="rounded-md bg-[#000000] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#373737] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login with X<small>(Twitter 1.0a)</small> 
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pininterest