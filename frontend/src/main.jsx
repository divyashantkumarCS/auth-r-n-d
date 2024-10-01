import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';

// OAuth 2.0
import Google2_0 from './pages/Google2.0';
import Facebook2_0 from './pages/Facebook2.0';
import Github2_0 from './pages/Github2.0';
import Instagram2_0 from './pages/Instagram2.0';
import Pinterest2_0 from './pages/Pinterest2.0';
import Twitter2_0 from './pages/Twitter2.0';

// OAuth 1.0a
import TwitteroAuth1_0a from './pages/TwitteroAuth1.0a'

// 
import OAuth1Page from './pages/doc-pages/OAuth1Page';
import OAuth2Page from './pages/doc-pages/OAuth2Page';
import OAuth21Page from './pages/doc-pages/OAuth21Page';
import OpenIDConnectPage from './pages/doc-pages/OpenIDConnectPage';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />

      {/* OAuth 2.0 */}
      <Route path='google/auth' element={<Google2_0 />} />
      <Route path='facebook/auth' element={<Facebook2_0 />} />
      <Route path='github/auth' element={<Github2_0 />} />
      <Route path='instagram/auth' element={<Instagram2_0 />} />
      <Route path='pinterest/auth' element={<Pinterest2_0 />} />
      <Route path='twitter/auth' element={<Twitter2_0 />} />

      {/* OAuth 1.0a */}
      <Route path='1.0a/twitter/auth' element={<TwitteroAuth1_0a />} />

      {/*  */}
      <Route path='oauth1' element={<OAuth1Page />} />
      <Route path='oauth2' element={<OAuth2Page />} />
      <Route path='oauth2-1' element={<OAuth21Page />} />
      <Route path='openid-connect' element={<OpenIDConnectPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

