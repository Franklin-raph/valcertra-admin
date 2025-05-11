import React, { useEffect, useState } from 'react'
import { IoMenuOutline, IoNotificationsOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { BiCalculator, BiSearch } from 'react-icons/bi';
import ValueAdditionCalculator from '../value-addition-calculator/ValueAdditionCalculator';


const TopNav = ({toggleNav, setToggleNav}) => {

  const [logoutModal, setLogoutModal] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [valueAddedCalculator, setValueAddedCalculator] = useState(false)


  return (
    <div className='px-[10px] md:px-[30px] bg-white fixed lg:w-[82%] border-b flex items-center justify-between py-[1.2rem] top-0 right-0 z-[99]'>
      <p>Admin Dashboard</p>
      <div className='flex items-center gap-1'>
        <div className='flex items-center gap-10'>
          <div className='text-[#19201D] items-center gap-3 border py-[6px] px-[8px] rounded-[4px] cursor-pointer hidden lg:flex'>
            <BiSearch fontSize={"20px"}/>
            <input type="text" placeholder='Search' className='outline-none' />
          </div>
          {/* <IoMenuOutline className='text-white text-[30px] cursor-pointer block lg:hidden' onClick={() => setToggleNav(!toggleNav)}/> */}
        </div>
        <button onClick={() => setValueAddedCalculator(true)} className="bg-primary-color text-white py-[8px] text-[14px] flex items-center gap-2 px-5 rounded-[4px] font-[500] ml-4"> 
          <BiCalculator />
          <p>Calculate Value Addition</p>
        </button>
      </div>
      {
        valueAddedCalculator && <ValueAdditionCalculator setValueAddedCalculator={setValueAddedCalculator}/>
      }
      {/* <p className='text-primary-color p-3 rounded-full bg-[#F9F5FF]'>
        {user?.first_name[0]}{user?.last_name[0]}
      </p> */}
    </div>
  )
}

export default TopNav