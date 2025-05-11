import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { FiAward, FiCreditCard, FiFileText, FiPieChart, FiUser, FiUsers } from 'react-icons/fi';
import LogOutModal from '../logout-modal/LogOutModal';
import { LuCircleCheckBig } from 'react-icons/lu';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import { BsCash } from 'react-icons/bs';


const SideNav = ({toggleNav, setToggleNav}) => {

  const location = useLocation()
  const [logoutModal, setLogoutModal] = useState(false);

  // console.log(user);

//     setInterval(() => {
//     fetch('https://api-gotruhub.onrender.com/')
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error('Error:', error));
// }, 180000); // 180000 milliseconds = 3 minutes

// bg-[#19201D] scrollbar w-[22%] h-[100vh] top-0 fixed overflow-y-auto py-5 overflow-x-hidden left-0

  return (
    <div className={!toggleNav ? `bg-[#002E72] scrollbar lg:w-[18%] w-[100%] h-[100vh] top-0 fixed overflow-y-auto py-5 overflow-x-hidden lg:left-0 left-[100%] transition-[0.5s]` : `bg-[#002E72] z-[10] scrollbar lg:w-[22%] w-[100%] h-[100vh] top-0 fixed overflow-y-auto py-5 overflow-x-hidden lg:left-0 left-[100%] responsive-nav transition-[0.5s]`}>
        <div className='px-5 pb-5 flex items-center justify-between'>
            <img src="./dashboard-logo.svg" className='mx-auto mt-[20px]' alt="" />
            <p onClick={() => setToggleNav(false)} className='text-white text-[22px] cursor-pointer lg:hidden block'>&times;</p>
        </div>
        <div className="pl-[32px] my-5 text-white text-[17px] ml-[30px]">
          <Link to='/dashboard' className={ location.pathname.includes('dashboard') ? `flex items-center justify-between py-[10px] text-[#fff] border-r-[3px] w-full` :`text-[#D0D5DD] flex items-center justify-between py-[10px]`}>
            <div className="flex items-center gap-2">
              <RxDashboard />
              <p className="">Dashboard</p>
            </div>
          </Link>
          <Link to='/applications' className={ location.pathname.includes('application') ? `flex items-center justify-between py-[10px] text-[#fff] border-r-[3px] w-full` :`text-[#D0D5DD] flex items-center justify-between py-[10px]`}>
            <div className="flex items-center gap-2">
                <FiFileText />
                <p className="">Applications</p>
            </div>
          </Link>
          <Link to='/supplier-verification' className={ location.pathname.includes('supplier') ? `flex items-center justify-between py-[10px] text-[#fff] border-r-[3px] w-full` :`text-[#D0D5DD] flex items-center justify-between py-[10px]`}>
            <div className="flex items-center gap-2">
                <LuCircleCheckBig />
                <p className="">Supplier Verification</p>
            </div>
          </Link>
          <Link to='/audit-management' className={ location.pathname.includes('audit') ? `flex items-center justify-between py-[10px] text-[#fff] border-r-[3px] w-full` :`text-[#D0D5DD] flex items-center justify-between py-[10px]`}>
            <div className="flex items-center gap-2">
                <MdOutlineFormatListBulleted />
                <p className="">Audit Management</p>
            </div>
          </Link>
          <Link to='/profile' className={ location.pathname.includes('profile') ? `flex items-center justify-between py-[10px] text-[#fff] border-r-[3px] w-full` :`text-[#D0D5DD] flex items-center justify-between py-[10px]`}>
            <div className="flex items-center gap-2">
                <FiAward className='text-[20px]'/>
                <p className="">Certifications</p>
            </div>
          </Link>
          <Link to='/profile' className={ location.pathname.includes('profile') ? `flex items-center justify-between py-[10px] text-[#fff] border-r-[3px] w-full` :`text-[#D0D5DD] flex items-center justify-between py-[10px]`}>
            <div className="flex items-center gap-2">
                <FiPieChart className='text-[20px]'/>
                <p className="">Analytics</p>
            </div>
          </Link>
          <Link to='/profile' className={ location.pathname.includes('profile') ? `flex items-center justify-between py-[10px] text-[#fff] border-r-[3px] w-full` :`text-[#D0D5DD] flex items-center justify-between py-[10px]`}>
            <div className="flex items-center gap-2">
                <FiUsers className='text-[20px]'/>
                <p className="">Staffs</p>
            </div>
          </Link>
          <Link to='/product-price' className={ location.pathname.includes('product') ? `flex items-center justify-between py-[10px] text-[#fff] border-r-[3px] w-full` :`text-[#D0D5DD] flex items-center justify-between py-[10px]`}>
            <div className="flex items-center gap-2">
                <BsCash className='text-[20px]'/>
                <p className="">Product Price</p>
            </div>
          </Link>
          <Link to='/profile' className={ location.pathname.includes('profile') ? `flex items-center justify-between py-[10px] text-[#fff] border-r-[3px] w-full` :`text-[#D0D5DD] flex items-center justify-between py-[10px]`}>
            <div className="flex items-center gap-2">
                <FiUser className='text-[20px]'/>
                <p className="">My Profile</p>
            </div>
          </Link>
        </div>
        <div className="pl-[32px] my-5 text-white text-[17px] ml-[30px] mt-[13.5rem]">
          <button className='text-[#D0D5DD] flex items-center justify-between py-[10px]' onClick={() => setLogoutModal(true)}>
            <div className="flex items-center gap-2">
                <img src="./logout.svg" alt="" />
                <p className="">Logout</p>
            </div>
          </button>
        </div>
        {
          logoutModal && <LogOutModal setLogoutModal={setLogoutModal}/>
        }
    </div>
  )
}

export default SideNav