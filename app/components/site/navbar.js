import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GreenLogo from '../../../assets/GreenLogo.png'; // Import your GreenLogo
import PurpleLogo from '../../../assets/PurpleLogo.png'; // Import your PurpleLogo
import SmallGreenLogo from '../../../assets/SmallGreenLogo.png'
import SmallPurpleLogo from '../../../assets/SmallPurpleLogo.png'

const Navbar = () => {
  return (
    <div className="p-7">
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6"> 
<Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">  
  {/* Large Purple Logo for light mode on large screens */}
  <Image 
    src={PurpleLogo} 
    width={170}   
    height={32}  
    alt="Logo"
    className="dark:hidden hidden sm:block"  
  />
  {/* Large Green Logo for dark mode on large screens only */}
  <Image 
    src={GreenLogo} 
    width={170}   
    height={32}  
    alt="Logo"
    className="hidden dark:sm:block sm:hidden"  
  />
  
  {/* Small Purple Logo for light mode on small screens */}
  <Image 
    src={SmallPurpleLogo} 
    width={40}   
    height={40}  
    alt="Logo"
    className="dark:hidden block sm:hidden"  
  />
  {/* Small Green Logo for dark mode on small screens only */}
  <Image 
    src={SmallGreenLogo} 
    width={40}   
    height={40}  
    alt="Logo"
    className="hidden dark:block sm:dark:hidden sm:hidden"  
  />
</Link>





          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse items-center"> 
            <Link 
              href="login" 
              className="text-black dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:focus:ring-blue-800"
            >
              Login
            </Link>

            <Link href="signup">
              <button 
                type="button" 
                className="text-white bg-dark-purple hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get Started
              </button>  
            </Link>
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
          <div className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link href="/" className="block py-2 px-3 rounded md:bg-transparent md:text-dark-purple md:p-0 md:dark:text-light-green" aria-current="page">
                  Home
                </Link>
              </li>
              <li>
                <Link href="pricing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
