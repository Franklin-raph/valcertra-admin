import React, { useState, useEffect } from "react";
import TopNav from "../../components/top-nav/TopNav";
import SideNav from "../../components/side-nav/SideNav";
// import ValueAdditionCalculator from "../../components/value-addition-calculator/ValueAdditionCalculator";
// import CertificateApplication from "../../components/certificate-application/CertificateApplication";
import { get } from "../../utils/axiosHelpers";
// import FullPageLoader from "../../components/full-page-loader/FullPageLoader";
import { useNavigate } from "react-router-dom";
import { BsArrow90DegUp, BsEye } from "react-icons/bs";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import Cookies from 'js-cookie';
import { BiCalendar, BiMap } from "react-icons/bi";
import { RiMap2Fill } from "react-icons/ri";


const Dashboard = () => {

    const [toggleNav, setToggleNav] = useState(false)
    const [applications, setApplications] = useState()
    const [summary, setSummary] = useState()
    const [scheduledAudits, setScheduledAudits] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const token = Cookies.get('token')

    // const getAllApplications = async () => {
    //   const res = await fetch('https://vercertrabe.onrender.com/administration/applications/?view_current=true', {
    //     headers : {
    //         Authorization: `Bearer ${token}`
    //     }
    //   })
    //   const data = await res.json()
    //   console.log(res,data);
      
    // }
    
    const getAllApplications = async () => {
      const res = await get('/administration/applications/?view_current=true')
      console.log(res);
      setApplications(res)
    }

    const getSummary = async () => {
      try {
        const res = await get('/administration/summaries/application_reviewer_summary/')
        setSummary(res.data)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

    const getScheduledAudits = async () => {
      const res = await get('/administration/audit-schedules/?my_audits=true')
      setScheduledAudits(res.data)
      console.log(res);
    }

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        await Promise.all([getSummary(), getAllApplications(), getScheduledAudits()]);
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

            <div className="grid grid-cols-4 gap-4 mt-7">
              <div className="flex items-start gap-5 border border-[#CCE0FF] rounded-[4px] p-3">
                <img src="./file.svg" alt="" />
                <div>
                  <p className="text-text-color">Total Applications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.total_application.count}</p>
                  {
                    summary?.total_application?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.total_application?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.total_application?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./approved.svg" alt="" />
                <div>
                  <p className="text-text-color">Approved Applications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.approved_application?.count}</p>
                  {
                    summary?.approved_application?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.approved_application?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.approved_application?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./pending.svg" alt="" />
                <div>
                  <p className="text-text-color">Pending Applications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.pending_application?.count}</p>
                  {
                    summary?.pending_application?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.pending_application?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.pending_application?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./info.svg" alt="" />
                <div>
                  <p className="text-text-color">Rejected Applications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.disapproved_application?.count}</p>
                  {
                    summary?.disapproved_application?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.disapproved_application?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.disapproved_application?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
            </div>

            <div className="mt-12 border rounded-[8px]">
              <div className="flex items-center justify-between px-7 pt-6">
                  <p className="text-[#333333]">Recent Applications</p>
                  <p className="text-primary-color bg-secondary-color text-[14px] px-2 py-1 rounded-full cursor-pointer">View All</p>
              </div>
                {
                    applications?.length === 0 &&
                    <div className="flex items-center justify-center mt-[5rem]">
                        <p>No Recent Applications Yet</p>
                    </div>
                }
              <div class="relative overflow-x-auto mt-8">
                <table class="w-full text-sm text-left rtl:text-left">
                    <thead class="text-[12px] bg-[#F9FAFB] text-[#475467]">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-[600] flex gap-1 items-center">Application ID</th>
                            <th scope="col" class="px-6 py-3 font-[600]">Company</th>
                            <th scope="col" class="px-6 py-3 font-[600]">Country</th>
                            <th scope="col" class="px-6 py-3 font-[600]">Product Name</th>
                            <th scope="col" class="px-6 py-3 font-[600]">Status</th>
                            <th scope="col" class="px-6 py-3 font-[600]">AI Score</th>
                            <th scope="col" class="px-6 py-3 font-[600]">Date</th>
                            <th scope="col" class="px-6 py-3 font-[600]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications?.data?.map((application, index) => (
                                <tr className="border-b" key={index}>
                                    <td class="px-6 py-4 text-[12px] text-[#475467] flex gap-1 items-center">{application.application_number}</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467]">{application?.user?.company_data?.company_name ? application?.user.company_data?.company_name : "Nill"}</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467]">{application?.user.company_data?.reg_country ? application?.user.company_data?.reg_country : "Nill"}</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467]">{application.product_name}</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467] capitalize">{application.current_review_stage}</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467]">
                                      {
                                        application?.ai_score === 'high'?
                                        <span className="text-[#B42318] bg-[#FEF3F2] px-2 py-1 rounded-full">AI Risk: {application?.ai_score}</span>
                                        :
                                        application?.ai_score === 'medium' ?
                                        <span className="bg-[#FFFAEB] text-[#B54708] px-2 py-1 rounded-full">AI Risk: {application?.ai_score}</span>
                                        :
                                        <span className="bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-full">AI Risk: {application?.ai_score}</span>
                                      }
                                    </td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467]">{ new Date(application.created_at).toLocaleDateString() }</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467] cursor-pointer"> <BsEye /> </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
              {/* {
                applications?.map((application, index) => (
                  <div onClick={() => navigate(`/applications/${application.id}`)} className="border border-[#F2F4F7] px-4 py-[10px] mt-4 rounded-[4px] cursor-pointer">
                      <div className="flex items-center justify-between mb-4 rounded-[4px]">
                          <p className="text-[#333333] font-[600]">{application?.product_name}</p>
                          {
                            application?.status === 'pending' ?
                            (
                              <div className="flex items-center gap-2 bg-[#FFFAEB] rounded-full py-[6px] px-[10px]">
                                  <img src="./clock.svg" alt="" className="w-[16px]" />
                                  <p className="text-[14px] text-[#B54708] font-[500]">Pending</p>
                              </div>
                            ) :
                            application?.status === 'under_review' ?
                            (
                              <div className="flex items-center gap-2 bg-[#FFFAEB] rounded-full py-[6px] px-[10px]">
                                  <img src="./clock.svg" alt="" className="w-[16px]" />
                                  <p className="text-[14px] text-[#B54708] font-[500]">Under Review</p>
                              </div>
                            )
                            :
                            application?.status === 'rejected' ?
                            (
                              <div className="flex items-center gap-2 bg-[#FEF3F2] rounded-full py-[6px] px-[10px]">
                                  <img src="./x-circle.svg" alt="" className="w-[16px]" />
                                  <p className="text-[14px] text-[#B42318] font-[500]">Rejected</p>
                              </div>
                            )
                            :
                            <div className="flex items-center gap-2 bg-[#ECFDF3] rounded-full py-[6px] px-[10px]">
                                <img src="./check-circle.svg" alt="" className="w-[16px]" />
                                <p className="text-[14px] text-[#027A48] font-[500]">Certified</p>
                            </div>
                          }
                      </div>
                      <div className="flex items-center justify-between text-[15px]">
                          <p className="text-text-color">Submitted: { new Date(application.created_at).toLocaleDateString() } </p>
                          <p className="text-text-color">Value Addition: 46%</p>
                      </div>
                  </div>
                ))
              } */}
            </div>

            <div className="mt-12">
                <div className="flex items-center justify-between px-3 pt-6 mb-4">
                  <p className="text-[#333333]">Upcoming Field Audits</p>
                  <p className="text-primary-color bg-secondary-color text-[14px] px-2 py-1 rounded-full cursor-pointer">View All</p>
              </div>
                {
                    scheduledAudits?.length === 0 &&
                    <div className="flex items-center justify-center mt-[5rem]">
                        <p>No Scheduled Audits</p>
                    </div>
                }
              {
                scheduledAudits?.map((audit, index) => (
                    <div key={index} className="flex items-center justify-between border rounded p-3 my-3">
                        <div className="flex items-center gap-2">
                            <p className="text-[#666666] font-[600] w-[50px]">AUD-2025-0128</p>
                            <div>
                                <p className="text-[#666666]">Afri-Agro Ltd</p>
                                <div className="flex items-center gap-2 text-[#666666]">
                                    <RiMap2Fill />
                                    <p>Lagos, Nigeria</p>
                                </div>
                                <div className="flex items-center gap-2 text-[#666666]">
                                    <BiCalendar />
                                    <p>05/10/2025</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <p className="text-[#B54708] px-[10px] py-[3px] rounded-full bg-[#FFFAEB] inline-block">Scheduled</p>
                            <p></p>
                            <p className="text-[#666666]">Auditor: James Okonkwo</p>
                        </div>
                    </div>
                ))
              }
            </div>

            {/* <div>
              <div className="bg-[#FEC84B] py-[10px] px-[10px] mt-12 rounded-t-[4px] flex items-center justify-between">
                <p className="text-[#7A2E0E]">Upcoming Renewal</p>
              </div>
              <div className="bg-[#FEF0C7] px-4 py-[10px] rounded-b-[4px] pt-[1.8rem]">
                <div className="flex items-center justify-between mb-4 rounded-[4px]">
                  <p className="text-[#333333] font-[600]">Processed Cocoa Product</p>
                  <p className="text-[#F79009] text-[15px]">30 days Remaining</p>
                </div>
                <div className="flex items-center justify-between text-[15px]">
                  <p className="text-text-color">Expires: 2025-02-26</p>
                  <button className="bg-primary-color text-white py-[6px] text-[14px] px-5 rounded-[4px] font-[500]"> Renew Now</button>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </>
    </div>
  );
}

export default Dashboard;
