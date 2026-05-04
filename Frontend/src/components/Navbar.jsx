import React, { useContext } from 'react'
import { NavLink , Link} from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'
import { useState } from 'react'
import { ShopContext } from '../contexts/ShopContext'

const Navbar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const {setShowSearch, getCartCount} = useContext(ShopContext)
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to='/'>
        <img src={assets.logo} alt="" className='w-36' />
      </Link>

      <ul className=' gap-5 text-sm text-gray-700 sm:flex hidden'>
        <NavLink  to='/' className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>
      <div className='flex gap-6 items-center'>
       <Link to="/collection">
        <img src={assets.search_icon} onClick={() => setShowSearch(true)} className='w-5 cursor-pointer' />
       </Link>

        <div className='group relative '>
          <Link to='/login'><img src= {assets.profile_icon} alt="" className='w-5 cursor-pointer'/></Link>
          <div className='hidden group-hover:block absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-6 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <Link to="/orders"><p className='cursor-pointer hover:text-black'>Orders</p></Link>
              <p className='cursor-pointer hover:text-black'>Logout</p>
            </div>
          </div>
        </div>
        <Link to='/cart'>
          <div className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
          </div>
        </Link>
        <img onClick={() => setIsSideBarOpen(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />

        <div className={`fixed top-0 right-0 h-full w-full bg-white overflow-hidden bottom-0 shadow-lg transform transition-transform duration-300 
          ${isSideBarOpen ? "-translate-x-0": "translate-x-full"}
          `}>

            {/* Sidebar for the small screen */}
            <div className='flex flex-col text-gray-600'>
                <div onClick={() => setIsSideBarOpen(false)} className='w-20 flex items-center gap-4 p-3 cursor-pointer'>
                    <img src={assets.dropdown_icon} className='h-4  rotate-180' alt="" />
                    <p>Back</p>
                </div>

                <NavLink
                    onClick={() => setIsSideBarOpen(false)}
                    to="/"
                    className={({ isActive }) =>
                      `pl-6 py-3 border-b transition-all duration-200 ${
                        isActive
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:bg-gray-100 hover:text-black"
                      }`
                    }
                  >
                    HOME
                </NavLink>
                <NavLink
                    onClick={() => setIsSideBarOpen(false)}
                    to="/collection"
                    className={({ isActive }) =>
                      `pl-6 py-3 border-b transition-all duration-200 ${
                        isActive
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:bg-gray-100 hover:text-black"
                      }`
                    }
                  >
                    COLLECTION
                </NavLink>
                <NavLink
                    onClick={() => setIsSideBarOpen(false)}
                    to="/about"
                    className={({ isActive }) =>
                      `pl-6 py-3 border-b transition-all duration-200 ${
                        isActive
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:bg-gray-100 hover:text-black"
                      }`
                    }
                  >
                    ABOUT
                </NavLink>
                <NavLink
                    onClick={() => setIsSideBarOpen(false)}
                    to="/contact"
                    className={({ isActive }) =>
                      `pl-6 py-3 border-b transition-all duration-200 ${
                        isActive
                          ? "bg-black text-white border-black"
                          : "border-gray-200 hover:bg-gray-100 hover:text-black"
                      }`
                    }
                  >
                    CONTACT
                </NavLink>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar