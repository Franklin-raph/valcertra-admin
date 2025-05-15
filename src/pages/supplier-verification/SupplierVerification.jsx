import React, { useState, useEffect } from "react";
import TopNav from "../../components/top-nav/TopNav";
import SideNav from "../../components/side-nav/SideNav";
import { get } from "../../utils/axiosHelpers";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import Cookies from 'js-cookie';
import { BiCalendar, BiMap, BiSearch } from "react-icons/bi";


const SupplierVerification = () => {

    const [toggleNav, setToggleNav] = useState(false)
    const [applications, setApplications] = useState()
    const [filteredApplications, setFilteredApplications] = useState([])
    const [summary, setSummary] = useState()
    const [scheduledAudits, setScheduledAudits] = useState()
    const [searchText, setSearchText] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const token = Cookies.get('token')
    const tabs = ["All", "Pending Verification", "Approved Verification", "Disapproved Verification"]
    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const getAllApplications = async () => {
      const res = await get('/administration/applications/?current_review_stage=document_verification')
      console.log(res);
      setApplications(res)
    }

    const getSummary = async () => {
      const res = await get('/administration/summaries/supplier_summary')
      setSummary(res.data)
      console.log(res);
    }

    const getScheduledAudits = async () => {
      const res = await get('/administration/audit-schedules/?my_audits=true')
      setScheduledAudits(res.data)
      console.log(res);
    }

    // Filter applications based on selected tab
    const filterApplicationsByTab = (data, tab) => {
      if (!data || !data.data) return [];
      
      switch(tab) {
        case "All":
          return data.data;
        case "Pending Verification":
          return data.data.filter(app => 
            app?.reviewer_data?.document_verification?.status === 'pending'
          );
        case "Approved Verification":
          return data.data.filter(app => 
            app?.reviewer_data?.document_verification?.status === 'completed' && 
            app?.reviewer_data?.document_verification?.approved === true
          );
        case "Disapproved Verification":
          return data.data.filter(app => 
            app?.reviewer_data?.document_verification?.status === 'completed' && 
            app?.reviewer_data?.document_verification?.approved === false
          );
        default:
          return data.data;
      }
    }

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        await Promise.all([getSummary(), getAllApplications(), getScheduledAudits()]);
        setIsLoading(false);
      };
      
      fetchData();
    }, []);

    // Update filtered applications when tab changes or applications data changes
    useEffect(() => {
      if (applications) {
        const filtered = filterApplicationsByTab(applications, selectedTab);
        setFilteredApplications(filtered);
      }
    }, [selectedTab, applications]);

    // Handle tab selection
    const handleTabChange = (tab) => {
      setSelectedTab(tab);
    }

    // Filter applications by search text
    const getSearchFilteredApplications = () => {
      if (!filteredApplications) return [];
      if (!searchText) return filteredApplications;
      
      return filteredApplications.filter(application => 
        (application.application_number || "").toLowerCase().includes(searchText.toLowerCase()) || 
        (application?.user?.company_data?.company_name || "").toLowerCase().includes(searchText.toLowerCase()) || 
        (application?.product_name || "").toLowerCase().includes(searchText.toLowerCase())
      );
    }
  
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
                  <p className="text-text-color">Total Verifications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.total_verification?.count}</p>
                  {
                    summary?.total_verification?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.total_verification?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.total_verification?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./approved.svg" alt="" />
                <div>
                  <p className="text-text-color">Approved Verifications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.approved_verification?.count}</p>
                  {
                    summary?.approved_verification?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.approved_verification?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.approved_verification?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./pending.svg" alt="" />
                <div>
                  <p className="text-text-color">Pending Verifications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.pending_verification?.count}</p>
                  {
                    summary?.pending_verification?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.pending_verification?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.pending_verification?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./info.svg" alt="" />
                <div>
                  <p className="text-text-color">Disapproved Verifications</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.disapproved_verification?.count}</p>
                  {
                    summary?.disapproved_verification?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.disapproved_verification?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.disapproved_verification?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-12 mb-3">
                {
                    tabs.map(tab => (
                        <p 
                          key={tab}
                          onClick={() => handleTabChange(tab)} 
                          className={selectedTab === tab ? 'text-primary-color cursor-pointer bg-secondary-color rounded font-[500] px-3 py-2' : 'text-[#98A2B3] cursor-pointer px-3 py-2'}
                        >
                          {tab}
                        </p>
                    ))
                }
            </div>

            <div className="mt-3 border rounded-[8px]">
                <div className="flex items-center justify-between px-7 pt-6">
                    <div className="flex items-center gap-2">
                        <p className="text-[#333333]">Applications</p>
                        <p className="text-primary-color bg-secondary-color text-[14px] px-2 py-1 rounded-full cursor-pointer">
                          {filteredApplications?.length || 0}
                        </p>
                    </div>
                    <div className='text-[#19201D] items-center gap-3 border py-[6px] px-[8px] rounded-[4px] cursor-pointer hidden lg:flex'>
                        <BiSearch fontSize={"20px"}/>
                        <input 
                          type="text" 
                          placeholder='Search' 
                          onChange={e => setSearchText(e.target.value)} 
                          className='outline-none' 
                        />
                    </div>
                </div>
                {
                    getSearchFilteredApplications()?.length === 0 &&
                    <div className="flex items-center justify-center mt-[5rem] mb-[5rem]">
                        <p>No Applications Found</p>
                    </div>
                }
              {getSearchFilteredApplications()?.length > 0 && (
                <div className="relative overflow-x-auto mt-8">
                  <table className="w-full text-sm text-left rtl:text-left">
                      <thead className="text-[12px] bg-[#F9FAFB] text-[#475467]">
                          <tr>
                              <th scope="col" className="px-6 py-3 font-[600] flex gap-1 items-center">Application ID</th>
                              <th scope="col" className="px-6 py-3 font-[600]">Company</th>
                              <th scope="col" className="px-6 py-3 font-[600]">Country</th>
                              <th scope="col" className="px-6 py-3 font-[600]">Product Name</th>
                              <th scope="col" className="px-6 py-3 font-[600]">Status</th>
                              <th scope="col" className="px-6 py-3 font-[600]">AI Score</th>
                              <th scope="col" className="px-6 py-3 font-[600]">Date</th>
                              <th scope="col" className="px-6 py-3 font-[600]"></th>
                          </tr>
                      </thead>
                      <tbody>
                        {
                              getSearchFilteredApplications().map((application, index) => (
                                  <tr className="border-b" key={index}>
                                      <td className="px-6 py-4 text-[12px] text-[#475467] flex gap-1 items-center">{application.application_number}</td>
                                      <td className="px-6 py-4 text-[12px] text-[#475467]">{application?.user?.company_data?.company_name ? application?.user.company_data?.company_name : "Nill"}</td>
                                      <td className="px-6 py-4 text-[12px] text-[#475467]">{application?.user.company_data?.reg_country ? application?.user.company_data?.reg_country : "Nill"}</td>
                                      <td className="px-6 py-4 text-[12px] text-[#475467]">{application.product_name}</td>
                                      <td className="px-6 py-4 text-[12px] text-[#475467] capitalize">{application.reviewer_data?.document_verification?.status}</td>
                                      <td className="px-6 py-4 text-[12px] text-[#475467]">
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
                                      <td className="px-6 py-4 text-[12px] text-[#475467]">{ new Date(application.created_at).toLocaleDateString() }</td>
                                      <td className="px-6 py-4 text-[12px] text-[#475467]"> 
                                        <BsEye 
                                          className="cursor-pointer" 
                                          onClick={() => navigate(`/supplier-verification/application/${application.id}`)}
                                        /> 
                                      </td>
                                  </tr>
                              ))
                          }
                      </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default SupplierVerification;