import React, { useState, useEffect } from "react";
import TopNav from "../../components/top-nav/TopNav";
import SideNav from "../../components/side-nav/SideNav";
import { useNavigate } from "react-router-dom";
import { PiNotePencil } from "react-icons/pi";
import { FiMail, FiMap, FiUser } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { BiCalendar, BiGlobe, BiPhone } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import ValueAdditionCalculator from "../../components/value-addition-calculator/ValueAdditionCalculator";
import { get } from "../../utils/axiosHelpers";
import { FaClock } from "react-icons/fa6";
import { BsClock } from "react-icons/bs";
import { GiCog } from "react-icons/gi";
// import FullPageLoader from "../../components/full-page-loader/FullPageLoader";


const MyProfile = () => {

    const [toggleNav, setToggleNav] = useState(false)
    const navigate = useNavigate()
    const profileNav = ["Overview", "Company", "Profiles"]
    const [selectedNav, setSelectedNav] = useState(profileNav[0])
    const [modal, setModal] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))
    const [userDetails, setUserDetails] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const getUser = async () => {
        try {
            setIsLoading(true)
            const res = await get(`/profile/user/${user.id}`)
            setUserDetails(res.data)
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching summary:", error);
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUser()
    },[])

  return (
    <div>
      {/* {isLoading && <FullPageLoader />} */}
      <>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[82%] ml-auto">
          <TopNav setToggleNav={setToggleNav} toggleNav={toggleNav} />
          <div className="px-[10px] md:px-[30px] pb-[1rem] mt-[100px]">
            
            <div className="border border-[#EAECF0] mt-7 rounded-[10px] px-[20px] py-[20px]">
                <div className="flex items-center justify-between">
                    <p className="text-[#333333] font-[500] text-[20px]">My Profile</p>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-3 cursor-pointer text-[#344054] border rounded-[4px] border-[#D0D5DD] py-[4px] px-[4px] ">
                            <PiNotePencil className="text-[17px]"/>
                            <p className="text-[14px]">Edit Profile</p>
                        </div>
                        <div className="border rounded-[4px] border-[#D0D5DD] p-[4px] cursor-pointer">
                            <GiCog />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3 mt-8 justify-between px-6 pb-4">
                    <div className="p-1 bg-white shadow-md rounded-full">
                        <p className="text-[#101828] text-[34px] bg-[#F9F5FF] rounded-full h-[100px] flex items-center justify-center w-[100px]">{userDetails?.first_name[0]}{userDetails?.last_name[0]}</p>
                    </div>
                    <p className="text-[#333333] text-[22px] pt-[5px] font-[500]">{userDetails?.first_name} {userDetails?.last_name}</p>
                    <p className="text-[#027A48] bg-[#ECFDF3] py-[4px] px-2 rounded-full">{userDetails?.role}</p>
                </div>
                <div className="grid gap-2 pl-2 mx-[1.5rem] py-4 border-t">
                    <div className="text-[#667085] flex items-center gap-2">
                        <FiMail className="text-[15px]"/>
                        <p className="text-[15px]">{userDetails?.email}</p>
                    </div>
                    <div className="text-[#667085] flex items-center gap-2">
                        <CiLocationOn className="text-[15px]"/>
                        <p className="text-[15px]">{userDetails?.email}</p>
                    </div>
                    <div className="text-[#667085] flex items-center gap-2">
                        <BiCalendar className="text-[15px]"/>
                        <p className="text-[15px]">{userDetails?.email}</p>
                    </div>
                    <div className="text-[#667085] flex items-center gap-2">
                        <BsClock className="text-[15px]"/>
                        <p className="text-[15px]">{userDetails?.email}</p>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <p className="text-[#333333]">Recent Activity</p>
            </div>

            <div className="border border-[#EAECF0] flex items-center justify-between rounded-[10px] mt-3 p-3">
                <div className="text-[#666666] text-[14px]">
                    <p className="font-[500] mb-1">Afri-Agro Ltd</p>
                    <p>Approved application review</p>
                </div>
                <div className="text-right text-[14px]">
                    <p className="text-[#027A48] bg-[#ECFDF3] py-[4px] inline-block px-2 rounded-full mb-1">Approved</p>
                    <p className="text-[#666666]">26 Apr 2025 at 14:32</p>
                </div>
            </div>
          </div>
        </div>
      </>
        {
            modal === 'delete' &&
            <div>
                <div className="h-full w-full fixed top-0 left-0 z-[99] bg-opacity-70 backdrop-blur-sm" style={{ background:"rgba(14, 14, 14, 0.58)" }} ></div>
                <div className="bg-white fixed top-[50%] left-[50%] p-[20px] z-[100] rounded-[8px] w-[400px]" style={{ transform: "translate(-50%, -50%)" }}>
                    <img src="./delete.svg" alt="" />
                    <p className="text-[#101828] font-[600] tex-[22px] my-3 text-left">Delete Account</p>
                    <p className="text-[#475467] text-[15px]">Are you sure you want to delete this account? This action cannot be undone.</p>
                    <div className="flex items-center justify-between gap-5 mt-6">
                        <button className="text-[#344054] border border-[#D0D5DD] py-[7px] rounded-[4px] w-full" onClick={() => setModal('')}>Cancel</button>
                        <button className="text-[#fff] border border-[#D92D20] bg-[#D92D20] py-[7px] rounded-[4px] w-full">Delete</button>
                    </div>
                </div>
            </div>
        }
    </div>
  );
}

export default MyProfile;
