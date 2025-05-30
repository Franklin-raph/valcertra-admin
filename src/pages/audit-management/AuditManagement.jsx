import React, { useState, useEffect } from "react";
import TopNav from "../../components/top-nav/TopNav";
import SideNav from "../../components/side-nav/SideNav";
import { get } from "../../utils/axiosHelpers";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { FiArrowDownRight, FiArrowUpRight } from "react-icons/fi";
import Cookies from 'js-cookie';
import { BiCalendar, BiMap, BiSearch } from "react-icons/bi";
import { RiMap2Fill } from "react-icons/ri";
import ScheduleAnAudit from "../../components/shedule-an-audit/ScheduleAnAudit";
import ScheduleAnAuditByApp from "../../components/schedule-an-audit-by-app/ScheduleAnAuditByApp";

const AuditManagement = () => {

    const [toggleNav, setToggleNav] = useState(false)
    const [applications, setApplications] = useState()
    const [summary, setSummary] = useState()
    const [audits, setAudits] = useState()
    const [completedAudits, setCompletedAudits] = useState()
    const [auditsInProgress, setAuditsInProgress] = useState()
    const [searchText, setSeacrhText] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const tabs = ["Pending Audits", "Scheduled Audits", "Completed Audits"]
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const [scheduleAnAudit, setScheduleAnAudit] = useState(false)
    const [scheduleAnAuditByApp, setScheduleAnAuditByApp] = useState(false)
    const [staffs, setStaffs] = useState()
    
    // Create separate count states for each data type
    const [applicationsCount, setApplicationsCount] = useState(0)
    const [auditsCount, setAuditsCount] = useState(0)
    const [completedAuditsCount, setCompletedAuditsCount] = useState(0)
    
    // Determine which count to display based on selected tab
    const getCurrentCount = () => {
      switch(selectedTab) {
        case "Pending Audits":
          return applicationsCount;
        case "Scheduled Audits":
          return auditsCount;
        case "Completed Audits":
          return completedAuditsCount;
        default:
          return 0;
      }
    }

    const getAllApplications = async () => {
      const res = await get('/administration/applications/')
      console.log("Applications data:", res);
      setApplications(res)
      setApplicationsCount(res.count)
    }
    
    const getSummary = async () => {
      const res = await get('/administration/summaries/audit_summary/')
      setSummary(res.data)
      console.log("Summary data:", res);
    }
    
    const getAudits = async () => {
      const res = await get('/administration/audit-schedules/')
      setAudits(res)
      setAuditsCount(res.count)
      console.log("Audits data:", res);
    }

    const getCompletedAudits = async () => {
      const res = await get('/administration/audit-schedules/?status=completed')
      setCompletedAudits(res)
      setCompletedAuditsCount(res.count)
      console.log("Completed audits:", res);
      return res;
    }

    const getAuditsInProgress = async () => {
      const res = await get('/administration/audit-schedules/?status=in_progress')
      setAuditsInProgress(res)
      console.log("Audits in progress:", res);
    }

    const getStaffs = async () => {
        const res = await get('/administration/manage-users/all_users/?staff_only=true')
        setStaffs(res.data)
        console.log("Staffs data:", res);
    }

    // Fetch data based on selected tab
    const fetchTabData = async () => {
      setIsLoading(true);
      
      switch(selectedTab) {
        case "Pending Audits":
          await getAllApplications();
          break;
        case "Scheduled Audits":
          await getAudits();
          break;
        case "Completed Audits":
          await getCompletedAudits();
          break;
        default:
          break;
      }
      
      setIsLoading(false);
    }

    // Initial data loading
    useEffect(() => {
      const fetchInitialData = async () => {
        setIsLoading(true);
        await Promise.all([getSummary(), getAllApplications(), getAudits(), getStaffs(), getAuditsInProgress(), getCompletedAudits()]);
        setIsLoading(false);
      };
      
      fetchInitialData();
    }, []);
    
    // Handle tab changes
    useEffect(() => {
      fetchTabData();
    }, [selectedTab]);
    
    // When an audit is scheduled, refresh the relevant data
    const handleAuditScheduled = async () => {
      await Promise.all([getSummary(), getAudits(), getAuditsInProgress()]);
      if (selectedTab === "Pending Audits") {
        await getAllApplications();
      } else if (selectedTab === "Scheduled Audits") {
        await getAudits();
      }
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
                  <p className="text-text-color">Total Audits</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.total_audits?.count}</p>
                  {
                    summary?.total_audits?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.total_audits?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.total_audits?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./approved.svg" alt="" />
                <div>
                  <p className="text-text-color">Completed Audits</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.completed?.count}</p>
                  {
                    summary?.completed?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.completed?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.completed?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./pending.svg" alt="" />
                <div>
                  <p className="text-text-color">Scheduled Audits</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.scheduled?.count}</p>
                  {
                    summary?.scheduled?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.scheduled?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.scheduled?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./info.svg" alt="" />
                <div>
                  <p className="text-text-color">Audits In Progress</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.in_progress?.count}</p>
                  {
                    summary?.in_progress?.percent_change > 0 ?
                      <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                        <FiArrowUpRight />
                        <p> {summary?.in_progress?.percent_change} % from last month</p>
                      </div>
                    :
                      <div className="flex items-center gap-2 text-[#F04438] text-[12px]">
                        <FiArrowDownRight />
                        <p> {summary?.in_progress?.percent_change} % from last month</p>
                      </div>
                  }
                </div>
              </div>
            </div>

            <div className="mt-5">
                <div className="flex items-center justify-between px-3 pt-6 mb-4">
                  <p className="text-[#333333]">Field Audits In Progress</p>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setScheduleAnAudit(true)} className="text-[14px] px-[10px] py-2 rounded-full bg-primary-color text-secondary-color">Schedule an audit</button>
                    <p className="text-primary-color bg-secondary-color text-[14px] px-2 py-1 rounded-full cursor-pointer">View All</p>
                  </div>
                </div>
                {
                    auditsInProgress?.count === 0 &&
                    <div className="flex items-center justify-center mt-[3rem]">
                        <p>No audits in progress</p>
                    </div>
                }
                {
                    auditsInProgress?.data?.map((audit, index) => (
                        <div key={index} className="flex items-center justify-between border rounded p-3 my-3">
                            <div className="flex items-center gap-2">
                                <p className="text-[#666666] font-[600] w-[55px]">AUD-{audit?.scheduled_date}</p>
                                <div>
                                    <p className="text-[#666666]">{audit?.application?.user?.company_data?.name ? audit?.application?.user?.company_data?.name : 'Nill'}</p>
                                    <div className="flex items-center gap-2 text-[#666666]">
                                        <RiMap2Fill />
                                        <p>{audit?.application?.user?.company_data?.head_office_country ? audit?.application?.user?.company_data?.head_office_country : 'Nill'}, {audit?.application?.user?.company_data?.head_office_state_province_region ? audit?.application?.user?.company_data?.head_office_state_province_region : 'Nill'}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#666666]">
                                        <BiCalendar />
                                        <p>{audit?.scheduled_date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <p className="text-primary-color px-[10px] py-[3px] rounded-full bg-secondary-color inline-block capitalize">{audit?.status}</p>
                                <p></p>
                                <p className="text-[#666666]">Auditor: {audit?.auditor?.first_name} {audit?.auditor?.last_name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex items-center gap-3 mt-12 mb-3">
                {
                    tabs.map(tab => (
                        <p key={tab} onClick={() => setSelectedTab(tab)} className={selectedTab === tab ? 'text-primary-color cursor-pointer bg-secondary-color rounded font-[500] px-3 py-2' : 'text-[#98A2B3] cursor-pointer px-3 py-2'}>{tab}</p>
                    ))
                }
            </div>

            <div className="mt-3 border rounded-[8px]">
                <div className="flex items-center justify-between px-7 pt-6">
                    <div className="flex items-center gap-2">
                        <p className="text-[#333333]">Applications</p>
                        <p className="text-primary-color bg-secondary-color text-[14px] px-2 py-1 rounded-full cursor-pointer">{getCurrentCount()}</p>
                    </div>
                    <div className='text-[#19201D] items-center gap-3 border py-[6px] px-[8px] rounded-[4px] cursor-pointer hidden lg:flex'>
                        <BiSearch fontSize={"20px"}/>
                        <input type="text" placeholder='Search' onChange={e => setSeacrhText(e.target.value)} className='outline-none' />
                    </div>
                </div>
                
                {selectedTab === "Pending Audits" && (
                  <>
                    {applications?.data?.length === 0 ? (
                      <div className="flex items-center justify-center mt-[5rem] mb-5">
                        <p>No Pending Audits</p>
                      </div>
                    ) : (
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
                                    <th scope="col" className="px-6 py-3 font-[600]">Date Transferred</th>
                                    <th scope="col" className="px-6 py-3 font-[600]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                  applications?.data?.filter(application => application.application_number.toLowerCase().includes(searchText.toLowerCase()) || application?.user?.company_data?.company_name.toLowerCase().includes(searchText.toLowerCase()) || application?.product_name.toLowerCase().includes(searchText.toLowerCase()))
                                  .map((application, index) => (
                                        <tr className="border-b" key={index}>
                                            <td className="px-6 py-4 text-[12px] text-[#475467] flex gap-1 items-center">{application?.application_number}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{application?.user?.company_data?.company_name ? application?.user.company_data?.company_name : "Nill"}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{application?.user.company_data?.reg_country ? application?.user.company_data?.reg_country : "Nill"}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{application?.product_name}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467] capitalize">{application?.status}</td>
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
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{ new Date(application?.updated_at).toDateString()}</td>
                                            <td className="px-6 py-4 text-[16px] text-[#475467] flex items-center gap-4">
                                              <BiCalendar className="cursor-pointer" onClick={() => setScheduleAnAuditByApp(application)}/>
                                              <BsEye onClick={() => navigate(`/audit/application/${application.id}`)} className="cursor-pointer"/>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}

                {selectedTab === "Scheduled Audits" && (
                  <>
                    {audits?.data?.length === 0 ? (
                      <div className="flex items-center justify-center mt-[5rem] mb-5">
                        <p>No Scheduled Audits</p>
                      </div>
                    ) : (
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    audits?.data?.map((audit, index) => (
                                        <tr className="border-b" key={index}>
                                            <td className="px-6 py-4 text-[12px] text-[#475467] flex gap-1 items-center">{audit.application.application_number}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{audit.application.user.company_data?.company_name ? audit.application.user.company_data?.company_name : "N/A"}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{audit.application.user.company_data?.reg_country ? audit.application.user.company_data?.reg_country : "N/A"}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{audit.application.product_name}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467] capitalize">{audit.status}</td>
                                            <td class="px-6 py-4 text-[12px] text-[#475467]">
                                              {
                                                audit?.application?.ai_score === 'high'?
                                                <span className="text-[#B42318] bg-[#FEF3F2] px-2 py-1 rounded-full">AI Risk: {audit?.application?.ai_score}</span>
                                                :
                                                audit?.application?.ai_score === 'medium' ?
                                                <span className="bg-[#FFFAEB] text-[#B54708] px-2 py-1 rounded-full">AI Risk: {audit?.application?.ai_score}</span>
                                                :
                                                <span className="bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-full">AI Risk: {audit?.application?.ai_score}</span>
                                              }
                                            </td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{ new Date(audit.scheduled_date).toLocaleDateString() }</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}

                {selectedTab === "Completed Audits" && (
                  <>
                    {completedAudits?.data?.length === 0 ? (
                      <div className="flex items-center justify-center mt-[5rem] mb-5">
                        <p>No Completed Audits</p>
                      </div>
                    ) : (
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    completedAudits?.data?.map((audit, index) => (
                                        <tr className="border-b" key={index}>
                                            <td className="px-6 py-4 text-[12px] text-[#475467] flex gap-1 items-center">{audit.application.application_number}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{audit.application.user.company_data?.company_name ? audit.application.user.company_data?.company_name : "N/A"}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{audit.application.user.company_data?.reg_country ? audit.application.user.company_data?.reg_country : "N/A"}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{audit.application.product_name}</td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467] capitalize">{audit.status}</td>
                                            <td class="px-6 py-4 text-[12px] text-[#475467]">
                                              {
                                                audit?.application?.ai_score === 'high'?
                                                <span className="text-[#B42318] bg-[#FEF3F2] px-2 py-1 rounded-full">AI Risk: {audit?.application?.ai_score}</span>
                                                :
                                                audit?.application?.ai_score === 'medium' ?
                                                <span className="bg-[#FFFAEB] text-[#B54708] px-2 py-1 rounded-full">AI Risk: {audit?.application?.ai_score}</span>
                                                :
                                                <span className="bg-[#ECFDF3] text-[#027A48] px-2 py-1 rounded-full">AI Risk: {audit?.application?.ai_score}</span>
                                              }
                                            </td>
                                            <td className="px-6 py-4 text-[12px] text-[#475467]">{ new Date(audit.scheduled_date).toLocaleDateString() }</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}

                {/* {selectedTab === "Completed Audits" && (
                  <div className="flex items-center justify-center mt-[5rem] mb-5">
                    <p>Completed Audits Table Would Go Here</p>
                  </div>
                )} */}
            </div>
          </div>
        </div>
      </>
      {
        scheduleAnAudit && (
          <ScheduleAnAudit 
            staffs={staffs} 
            applications={applications} 
            setScheduleAnAudit={setScheduleAnAudit} 
            getAudits={() => handleAuditScheduled()}
          />
        )
      }
      {
        scheduleAnAuditByApp && (
          <ScheduleAnAuditByApp
            staffs={staffs} 
            scheduleAnAuditByApp={scheduleAnAuditByApp} 
            setScheduleAnAuditByApp={setScheduleAnAuditByApp} 
            getAudits={() => handleAuditScheduled()}
          />
        )
      }
    </div>
  );
}

export default AuditManagement;