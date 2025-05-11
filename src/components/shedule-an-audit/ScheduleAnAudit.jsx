import { useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import { IoArrowBackOutline, IoCalculator, IoCloseOutline } from 'react-icons/io5';
import { post } from '../../utils/axiosHelpers';
import Alert from '../alert/Alert';
import BtnLoader from '../btnLoader/BtnLoader';
import { BiChevronDown } from 'react-icons/bi';
import { FiLoader, FiUser } from 'react-icons/fi';

export default function ScheduleAnAudit({ staffs, setScheduleAnAudit, getScheduledAudits, applications }) {
  const [dropDown, setDropDown] = useState()
  const [auditor, setAuditor] = useState({})
  const [application, setApplication] = useState({})
  const [searchText, setSeacrhText] = useState('')
  const [loader, setLoader] = useState(false)
//   const staffs = [
//     {
//         name:"Frank",
//         id:"1"
//     },
//     {
//         name:"Dan",
//         id:"2"
//     },
//     {
//         name:"Emma",
//         id:"3"
//     },
//     {
//         name:"Luke",
//         id:"4"
//     }
//   ]
  const [formData, setFormData] = useState({
    scheduled_date: '',
    scheduled_time: '',
    notes:''
  });

  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState('')

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const scheduleAudit = async () => {
    if(!formData.scheduled_date || !formData.scheduled_time || !formData.notes || !auditor || !application){
        setMsg("Please fill in all fields")
        setAlertType('error')
        return
    }
    console.log( {...formData, auditor:auditor.id, application:application.id});
    
    try {
            setLoading(true)
            const response = await post('/administration/audit-schedules/', {...formData, auditor:auditor.id, application:application.id})
            setMsg(response.message)
            setAlertType('success')
            getScheduledAudits()
            formData.scheduled_date = ""
            formData.scheduled_time = ""
            formData.notes = ""
            setAuditor({})
            setApplication({})
            console.log(response);
            
        } catch (error) {
            setMsg(error.message)
            setAlertType('error')
        } finally{
            setLoading(false)
        }
    }


  return (
    <div>
        {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
        <div className="h-full w-full fixed top-0 left-0 z-[99] bg-opacity-70 backdrop-blur-sm" style={{ background:"rgba(14, 14, 14, 0.58)" }} ></div>
        <div className="flex items-center flex-col text-center justify-center gap-3 bg-white fixed top-[50%] left-[50%] py-[20px] px-[0.5rem] z-[100] rounded-[8px] w-[450px]" style={{ transform: "translate(-50%, -50%)" }}>
            <img src="./product-price.svg" alt="" />
            <div className="px-6 w-full">
                <div className='mb-[1.5rem]'>
                    <div className="flex items-center justify-center mb-1 gap-2 flex-col">
                        <h2 className="text-[20px] font-semibold text-[#333333]">Schedule Audit</h2>
                        <p className='text-[#475467] text-[15px]'>Please select the date and auditor to schedule an audit.</p>
                    </div>
                </div>
                <div className="mt-4 mb-3">
                    <label className="block text-sm font-medium text-[#344054]0 mb-1 text-left">Scheduled Date</label>
                    <input
                        type="date"
                        value={formData.scheduled_date}
                        onChange={(e) => handleInputChange('scheduled_date', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        placeholder="Agriculture"
                    />
                </div>
                
                <div className="mb-3">
                    <label className="block text-sm font-medium text-[#344054] mb-1 text-left">Scheduled Time</label>
                    <input
                        type="time"
                        value={formData.scheduled_time}
                        onChange={(e) => handleInputChange('scheduled_time', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        placeholder="0.00"
                    />
                </div>

                <div className='w-full relative mb-3'>
                    <label className="block text-sm font-medium text-[#344054] mb-1 text-left">Application</label>
                    <div className='cursor-pointer border border-[#D0D5DD] bg-white py-2 px-2 w-full rounded-[4px] text-[#667085] flex items-center justify-between'>
                        <FiUser className='text-[20px]' />
                        <input type="text" placeholder='Select Application' value={application.product_name} className='outline-none bg-transparent w-full ml-3 cursor-pointer'/>
                        <BiChevronDown onClick={() => setDropDown(dropDown === "application" ? false : "application")} className='text-[22px] cursor-pointer'/>
                        {
                            dropDown === "application" &&
                            <div className='bg-white w-full absolute top-[70px] rounded-[4px] border border-gray-300 h-[200px] overflow-x-hidden overflow-y-scroll left-0 px-2 py-3 z-[100]'>
                                {/* <input type="text" onChange={e => setSeacrhText(e.target.value)} placeholder='Search City' className='border border-gray-300 w-full placeholder:text-[13px] text-[13px] outline-none px-[4px] rounded mb-1 py-[5px]'/> */}
                                <div>
                                {
                                    applications?.data?.filter(application => application.product_name.toLowerCase().includes(searchText.toLowerCase()))
                                    .map((application) => (
                                        <div className='flex items-center gap-2 hover:bg-gray-300 cursor-pointer p-[5px] text-[14px] text-gray-500'onClick={() => {
                                            setDropDown(false)
                                            setApplication(application)
                                        }}>
                                            <p>{application.product_name}</p>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        }
                    </div>
                </div>

                <div className='w-full relative mb-3'>
                    <label className="block text-sm font-medium text-[#344054] mb-1 text-left">Auditor</label>
                    <div className='cursor-pointer border border-[#D0D5DD] bg-white py-2 px-2 w-full rounded-[4px] text-[#667085] flex items-center justify-between'>
                        <FiUser className='text-[20px]' />
                        <p className='outline-none bg-transparent w-full ml-3 cursor-pointer text-left'>{auditor?.first_name} {auditor?.last_name}</p>
                        {/* <input type="text" placeholder='Select Auditor' value={auditor?.first_name auditor?.last_name} className='outline-none bg-transparent w-full ml-3 cursor-pointer'/> */}
                        <BiChevronDown onClick={() => setDropDown(dropDown === "auditor" ? false : "auditor")} className='text-[22px] cursor-pointer'/>
                        {
                            dropDown === "auditor" &&
                            <div className='bg-white w-full absolute top-[70px] rounded-[4px] border border-gray-300 h-[200px] overflow-x-hidden overflow-y-scroll left-0 px-2 py-3'>
                                {/* <input type="text" onChange={e => setSeacrhText(e.target.value)} placeholder='Search City' className='border border-gray-300 w-full placeholder:text-[13px] text-[13px] outline-none px-[4px] rounded mb-1 py-[5px]'/> */}
                                <div>
                                {
                                    staffs?.filter(staff => staff.first_name.toLowerCase().includes(searchText.toLowerCase()))
                                    .map((staff) => (
                                        <div className='flex items-center gap-2 hover:bg-gray-300 cursor-pointer p-[5px] text-[14px] text-gray-500'onClick={() => {
                                            setDropDown(false)
                                            setAuditor(staff)
                                        }}>
                                            <p>{staff.first_name} {staff.last_name}</p>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium text-[#344054] mb-1 text-left">Notes</label>
                    <input
                        type="text"
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        placeholder="Notes"
                    />
                </div>
                {
                    loading ?
                    <BtnLoader />
                    :
                    <div className="flex justify-between space-x-3 mt-7 mb-1">
                        <button
                            onClick={() => setScheduleAnAudit(false)}
                            className="border border-[#D0D5DD] text-[#344054] py-2 px-4 rounded w-full"
                            >
                            Cancel
                        </button>
                        <button
                            onClick={scheduleAudit}
                            className="bg-primary-color text-white py-2 px-4 rounded w-full"
                            >
                            Confirm
                        </button>
                    </div>
                }
            </div>
        </div>
    </div>
  );
}