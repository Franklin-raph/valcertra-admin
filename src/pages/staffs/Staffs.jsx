import React, { useState, useEffect } from "react";
import TopNav from "../../components/top-nav/TopNav";
import SideNav from "../../components/side-nav/SideNav";
// import ValueAdditionCalculator from "../../components/value-addition-calculator/ValueAdditionCalculator";
// import CertificateApplication from "../../components/certificate-application/CertificateApplication";
import { get } from "../../utils/axiosHelpers";
// import FullPageLoader from "../../components/full-page-loader/FullPageLoader";
import { useNavigate } from "react-router-dom";
import { BsArrow90DegUp, BsEye, BsEyeFill } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import Cookies from 'js-cookie';
import { BiCalendar, BiMap, BiSearch } from "react-icons/bi";
import { RiMap2Fill } from "react-icons/ri";
import AddAStaff from "../../components/add-a-staff/AddAStaff";


const Staffs = () => {

    const [toggleNav, setToggleNav] = useState(false)
    const [staffs, setStaffs] = useState()
    const [summary, setSummary] = useState()
    const [addStaff, setAddStaff] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const token = Cookies.get('token')

    // const getAllApplications = async () => {
    //   const res = await fetch('https://vercertrabe.onrender.com/administration/applications/', {
    //     headers : {
    //         Authorization: `Bearer ${token}`
    //     }
    //   })
    //   const data = await res.json()
    //   console.log(res,data);
      
    //   setApplications(data)
    // }

    const getSummary = async () => {
      const res = await get('/administration/manage-users/user_summaries/')
      setSummary(res.data)
      console.log(res);
    }

    const getStaffs = async () => {
      const res = await get('/administration/manage-users/?staff_only=true')
      setStaffs(res)
      console.log(res);
    }

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        await Promise.all([getSummary(), getStaffs()]);
        setIsLoading(false);
      };
      
      fetchData();
    }, []);
  
  return (
    <div>
      {/* {isLoading && <FullPageLoader />} */}
      <>
        <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
        <div className="w-full lg:w-[82%] ml-auto">
          <TopNav setToggleNav={setToggleNav} toggleNav={toggleNav} />
          <div className="px-[10px] md:px-[30px] pb-[1rem] mt-[100px]">
            <div className="grid grid-cols-5 gap-4 mt-7">
              <div className="flex items-start gap-5 border border-[#CCE0FF] rounded-[4px] p-3">
                <img src="./file.svg" alt="" />
                <div>
                  <p className="text-text-color">Total Applications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.total_applications}</p>
                  <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                    <FiArrowUpRight />
                    <p>+12% from last month</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./approved.svg" alt="" />
                <div>
                  <p className="text-text-color">Approved Applications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.approved_applications}</p>
                  <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                    <FiArrowUpRight />
                    <p>+12% from last month</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./pending.svg" alt="" />
                <div>
                  <p className="text-text-color">Pending Applications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.pending_applications}</p>
                  <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                    <FiArrowUpRight />
                    <p>+12% from last month</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./info.svg" alt="" />
                <div>
                  <p className="text-text-color">Rejected Applications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.rejected_applications}</p>
                  <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                    <FiArrowUpRight />
                    <p>+12% from last month</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./approved.svg" alt="" />
                <div>
                  <p className="text-text-color">Applications Under Review</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.under_review_applications}</p>
                  <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                    <FiArrowUpRight />
                    <p>+12% from last month</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-12">
                <p className="text-primary-color font-[600]">All Staffs</p>
                <p onClick={() => setAddStaff(true)} className="bg-secondary-color text-primary-color py-[5px] text-[15px] cursor-pointer px-[10px] rounded-[4px]">+ Add New Staff</p>
            </div>
            <div className="mt-3 border rounded-[8px]">
                <div className="flex items-center justify-between px-7 pt-6">
                    <div className="flex items-center gap-2">
                        <p className="text-[#333333]">Staffs</p>
                        <p className="text-primary-color bg-secondary-color text-[14px] px-2 py-1 rounded-full cursor-pointer">{staffs?.count}</p>
                    </div>
                    <div className='text-[#19201D] items-center gap-3 border py-[6px] px-[8px] rounded-[4px] cursor-pointer hidden lg:flex'>
                        <BiSearch fontSize={"20px"}/>
                        <input type="text" placeholder='Search' className='outline-none' />
                    </div>
                </div>
              {/* <div className="flex items-center justify-between px-7 pt-6">
                <div className="flex items-center gap-2">
                    <p className="text-[#333333]">Staffs</p>
                    <p className="text-primary-color bg-secondary-color text-[14px] px-2 py-1 rounded-full cursor-pointer">10</p>
                </div>
                  <p className="text-primary-color bg-secondary-color text-[14px] px-2 py-1 rounded-full cursor-pointer">View All</p>
              </div> */}
                {
                    staffs?.count === 0 &&
                    <div className="flex items-center justify-center mt-[5rem]">
                        <p>No Staffs Yet</p>
                    </div>
                }
              <div class="relative overflow-x-auto mt-8">
                <table class="w-full text-sm text-left rtl:text-left">
                    <thead class="text-[12px] md:text-[14px] bg-[#F9FAFB] text-[#475467]">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-[600]">Staff Name</th>
                            <th scope="col" class="px-6 py-3 font-[600]">Date Added</th>
                            <th scope="col" class="px-6 py-3 font-[600]">Role</th>
                            <th scope="col" class="px-6 py-3 font-[600]">Last Active</th>
                            <th scope="col" class="px-6 py-3 font-[600]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            staffs?.data?.map((staff, index) => (
                                <tr className="border-b" key={index}>
                                    <td class="px-6 py-4 text-[12px] md:text-[16px] text-[#475467]">{staff.first_name} {staff.last_name}</td>
                                    <td class="px-6 py-4 text-[12px] md:text-[16px] text-[#475467]">26 Apr 2025</td>
                                    <td class="px-6 py-4 text-[12px] md:text-[16px] text-[#475467]">{staff.role}</td>
                                    <td class="px-6 py-4 text-[12px] md:text-[16px] text-[#475467]">{ new Date(staff.last_login).toDateString()}</td>
                                    <td onClick={() => navigate(`/staff/${staff.id}`)} class="px-6 py-4 text-[12px] md:text-[16px] text-[#475467] cursor-pointer">
                                        <BsEye />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            </div>
          </div>
        </div>
      </>
      {
        addStaff && <AddAStaff getStaffs={getStaffs} setAddStaff={setAddStaff}/>
      }
    </div>
  );
}

export default Staffs;
