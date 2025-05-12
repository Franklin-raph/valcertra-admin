import React, { useState, useEffect } from "react";
import TopNav from "../../components/top-nav/TopNav";
import SideNav from "../../components/side-nav/SideNav";
import { get } from "../../utils/axiosHelpers";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import Cookies from 'js-cookie';
import { BiSearch } from "react-icons/bi";
import { BsEye } from "react-icons/bs";


const Certifications = () => {

    const [toggleNav, setToggleNav] = useState(false)
    const [applications, setApplications] = useState()
    const [summary, setSummary] = useState()
    const [searchText, setSeacrhText] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const tabs = ["Pending Approval", "Approved Application", "Rejected Application", "Certified Applications"]
    const [selectedTab, setSelectedTab] = useState(tabs[0])

    const getAllApplications = async () => {
      const res = await get('/administration/applications/?current_review_stage=certification')
      console.log(res);
      setApplications(res)
    }

    const getSummary = async () => {
      const res = await get('/administration/application_summary')
      setSummary(res.data)
      console.log(res);
    }

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        await Promise.all([getSummary(), getAllApplications()]);
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
                <img src="./badge-green.svg" alt="" />
                <div>
                  <p className="text-text-color">Total Certified</p>
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
                  <p className="text-text-color">Total Approved</p>
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
                  <p className="text-text-color">Pending Approoval</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.pending_applications}</p>
                  <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                    <FiArrowUpRight />
                    <p>+12% from last month</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-5 border border-[#CCE0FF] p-3 rounded-[4px]">
                <img src="./rejected.svg" alt="" />
                <div>
                  <p className="text-text-color">Total Rejected</p>
                  <p className="text-[#333333] font-[500] text-[20px] my-2">{summary?.rejected_applications}</p>
                  <div className="flex items-center gap-2 text-[#039855] text-[12px]">
                    <FiArrowUpRight />
                    <p>+12% from last month</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-12 mb-3">
                {
                    tabs.map(tab => (
                        <p onClick={() => setSelectedTab(tab)} className={selectedTab === tab ? 'text-primary-color cursor-pointer bg-secondary-color rounded font-[500] px-3 py-2' : 'text-[#98A2B3] cursor-pointer px-3 py-2'}>{tab}</p>
                    ))
                }
            </div>

            <div className="mt-3 border rounded-[8px]">
                <div className="flex items-center justify-between px-7 pt-6">
                    <div className="flex items-center gap-2">
                        <p className="text-[#333333]">Applications</p>
                        <p className="text-primary-color bg-secondary-color text-[14px] px-2 py-1 rounded-full cursor-pointer">{applications?.count}</p>
                    </div>
                    <div className='text-[#19201D] items-center gap-3 border py-[6px] px-[8px] rounded-[4px] cursor-pointer hidden lg:flex'>
                        <BiSearch fontSize={"20px"}/>
                        <input type="text" placeholder='Search' onChange={e => setSeacrhText(e.target.value)} className='outline-none' />
                    </div>
                </div>
                {
                    applications?.length === 0 &&
                    <div className="flex items-center justify-center mt-[5rem]">
                        <p>No Applications Yet</p>
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
                        </tr>
                    </thead>
                    <tbody>
                      {
                            applications?.data?.filter(application => application.application_number.toLowerCase().includes(searchText.toLowerCase()) || application?.user?.company_data?.company_name.toLowerCase().includes(searchText.toLowerCase()) || application?.product_name.toLowerCase().includes(searchText.toLowerCase()))
                            .map((application, index) => (
                                <tr className="border-b" key={index}>
                                    <td class="px-6 py-4 text-[12px] text-[#475467] flex gap-1 items-center">{application.application_number}</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467]">{application?.user?.company_data?.company_name ? application?.user.company_data?.company_name : "Nill"}</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467]">{application?.user.company_data?.reg_country ? application?.user.company_data?.reg_country : "Nill"}</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467]">{application?.product_name}</td>
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
                                    <td class="px-6 py-4 text-[12px] text-[#475467]">{ new Date(application?.created_at).toLocaleDateString() }</td>
                                    <td class="px-6 py-4 text-[12px] text-[#475467] cursor-pointer"> <BsEye onClick={() => navigate(`/applications/${application.id}`)}/> </td>
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
    </div>
  );
}

export default Certifications;
