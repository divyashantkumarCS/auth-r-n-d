

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Dropdown from "../components/Dropdown";
import LoginDialog from "../components/LoginDialog";

function Header() {
  const oAuth1Options = [
    {
      link: '1.0a/twitter/auth',
      name: "Twitter 1.0a"
    },
  ]
  const oAuth2Options = [
    {
      link: 'google/auth',
      name: 'Google 2.0',
    },
    {
      link: 'facebook/auth',
      name: 'Facebook 2.0',
    },
    {
      link: 'instagram/auth',
      name: 'Instagram 2.0',
    },
    {
      link: 'github/auth',
      name: 'Github 2.0',
    },
    {
      link: 'pinterest/auth',
      name: 'Pinterest 2.0',
    },
    {
      link: 'twitter/auth',
      name: 'Twitter 2.0',
    },
  ]
  const oAuth21Options = [
    {
      link: '#',
      name: "Google 2.1"
    },
  ]
  const openIdConnectOptions = [
    {
      link: '#',
      name: "Google OpenId"
    },
  ]

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function isLoggedInUser(cookiesString) {
    const cookies = cookiesString.split("; ");
    const token = cookies?.filter((cookie) => {
      const data = cookie?.split("=");
      if (data[0] === 'token') {
        return true;
      }
      return false;
    })
    const isTokenExist = token[0] ? (token[0].split("="))[1] : false;

    return isTokenExist ? true : false
  }

  function logOut() {
    document.cookie = `token=; Path=/; Expires=${new Date()};`;
    setIsLoggedIn(false)
  }

  useEffect(() => {
    const cookiesString = document.cookie;
    if (isLoggedInUser(cookiesString)) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [isLoggedIn])

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              style={{ width: '120px', height: 'auto' }}
              src="/public/logo.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>

          <div className="flex items-center lg:order-2">
            {
              !isLoggedIn ? <LoginDialog /> : ''
            }
            {
              isLoggedIn ?
                <button
                  onClick={logOut}
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log out
                </button> :
                ''
            }

          </div>

          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex justify-end flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">

              <li>
                <Dropdown menuname={'OAuth 1.0a'} options={oAuth1Options} />
              </li>
              <li>
                <Dropdown menuname={'OAuth 2.0'} options={oAuth2Options} />
              </li>
              <li>
                <Dropdown menuname={'OAuth 2.1'} options={oAuth21Options} />
              </li>
              <li>
                <Dropdown menuname={'OpenID Connect '} options={openIdConnectOptions} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header