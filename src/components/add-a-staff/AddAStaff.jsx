import { useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import { IoArrowBackOutline, IoCalculator, IoCloseOutline } from 'react-icons/io5';
import { post } from '../../utils/axiosHelpers';
import Alert from '../alert/Alert';
import BtnLoader from '../btnLoader/BtnLoader';
import { BiChevronDown } from 'react-icons/bi';
import { FiLoader, FiUser } from 'react-icons/fi';

export default function AddAStaff({ staffs, setAddStaff, getStaffs }) {
  const [dropDown, setDropDown] = useState()
  const [selectdRole, setSelectdRole] = useState({})
  const [loader, setLoader] = useState(false)
  const roles = [
    {
        title:"Field Agent",
        value:"field_agent",
    },
    {
        title:"Risk Analyst",
        value:"risk_analyst",
    },
    {
        title:"Supervisior",
        value:"supervisior",
    },
    {
        title:"Auditor",
        value:"auditor",
    }
  ]
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email:'',
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

  const addAStaff = async () => {
    if(!formData.first_name || !formData.last_name || !formData.email){
        setMsg("Please fill in all fields")
        setAlertType('error')
        return
    }
    // console.log( {...formData, auditor:auditor.id, applicationapplication:application.id});
    
    try {
            setLoading(true)
            const response = await post('/administration/audit-schedules/', {...formData, auditor:"auditor.id"})
            setMsg(response.message)
            setAlertType('success')
            getStaffs()
            formData.first_name = ""
            formData.last_name = ""
            formData.email = ""
            selectdRole = {}
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
            <img src="./users.svg" alt="" />
            <div className="px-6 w-full">
                <div className='mb-[2.5rem]'>
                    <div className="flex items-center justify-center mb-1 gap-2 flex-col">
                        <h2 className="text-[20px] font-semibold text-[#333333]">Add New Staff</h2>
                        <p className='text-[#475467] text-[15px]'>You can add a new staff by sending an email invite and also assigning a new role</p>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5 mb-3'>
                    <div className="">
                        <label className="block text-sm font-medium text-[#344054]0 mb-1 text-left">First Name</label>
                        <input
                            type="text"
                            value={formData.first_name}
                            onChange={(e) => handleInputChange('first_name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded outline-none"
                            placeholder="Amarachi"
                        />
                    </div>
                    
                    <div className="">
                        <label className="block text-sm font-medium text-[#344054] mb-1 text-left">Last Name</label>
                        <input
                            type="text"
                            value={formData.last_name}
                            onChange={(e) => handleInputChange('last_name', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded outline-none"
                            placeholder="Grace"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium text-[#344054] mb-1 text-left">Email</label>
                    <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        placeholder="amarachigrace@gmail.com"
                    />
                </div>

                <div className='w-full relative mb-3'>
                    <label className="block text-sm font-medium text-[#344054] mb-1 text-left">Role</label>
                    <div className='cursor-pointer border border-[#D0D5DD] bg-white py-2 px-2 w-full rounded-[4px] text-[#667085] flex items-center justify-between'>
                        <FiUser className='text-[20px]' />
                        <p className='outline-none bg-transparent w-full ml-3 cursor-pointer text-left'>{selectdRole?.title}</p>
                        {/* <input type="text" placeholder='Select Auditor' value={auditor?.first_name auditor?.last_name} className='outline-none bg-transparent w-full ml-3 cursor-pointer'/> */}
                        <BiChevronDown onClick={() => setDropDown(dropDown === "role" ? false : "role")} className='text-[22px] cursor-pointer'/>
                        {
                            dropDown === "role" &&
                            <div className='bg-white w-full absolute top-[70px] rounded-[4px] border border-gray-300 h-[150px] overflow-x-hidden overflow-y-scroll left-0 px-2 py-3'>
                                {/* <input type="text" onChange={e => setSeacrhText(e.target.value)} placeholder='Search City' className='border border-gray-300 w-full placeholder:text-[13px] text-[13px] outline-none px-[4px] rounded mb-1 py-[5px]'/> */}
                                <div>
                                {
                                    roles?.map((role) => (
                                        <div className='flex items-center gap-2 hover:bg-gray-300 cursor-pointer p-[5px] text-[14px] text-gray-500'onClick={() => {
                                            setDropDown(false)
                                            setSelectdRole(role)
                                        }}>
                                            <p>{role.title}</p>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {
                    loading ?
                    <BtnLoader />
                    :
                    <div className="flex justify-between space-x-3 mt-7 mb-1">
                        <button
                            onClick={() => setAddStaff(false)}
                            className="border border-[#D0D5DD] text-[#344054] py-2 px-4 rounded w-full"
                            >
                            Cancel
                        </button>
                        <button
                            onClick={addAStaff}
                            className="bg-primary-color text-white py-2 px-4 rounded w-full"
                            >
                            Invite
                        </button>
                    </div>
                }
            </div>
        </div>
    </div>
  );
}