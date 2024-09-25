import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home'
import Google from './pages/Google'
import Facebook from './pages/Facebook';
import Github from './pages/Github';
import Instagram from './pages/Instagram';
import Pinterest from './pages/Pinterest';


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='google/auth' element={<Google />} />
      <Route path='facebook/auth' element={<Facebook />} />
      <Route path='github/auth' element={<Github />} />
      <Route path='instagram/auth' element={<Instagram />} />
      <Route path='pinterest/auth' element={<Pinterest />} />
    </Route>  
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

