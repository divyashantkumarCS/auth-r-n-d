import Header from "./doc-pages/Header";
import OAuthTimeline from './doc-pages/OAuthTimeline';
import { useEffect } from "react";

// const links = [
//   { name: 'Open roles', href: '#' },
//   { name: 'Internship program', href: '#' },
//   { name: 'Our values', href: '#' },
//   { name: 'Meet our leadership', href: '#' },
// ]
// const stats = [
//   { name: 'Offices worldwide', value: '12' },
//   { name: 'Full-time colleagues', value: '300+' },
//   { name: 'Hours per week', value: '40' },
//   { name: 'Paid time off', value: 'Unlimited' },
// ]

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  


  return (
    <>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <OAuthTimeline />
    </div>
    </>
)}

export default Home