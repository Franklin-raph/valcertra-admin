import React from 'react'
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LogOutModal = ({setLogoutModal}) => {

    const navigate = useNavigate()

    function logoutUser(){
        localStorage.clear()
        Cookies.remove('token')
        navigate('/')
    }

    return createPortal(
        <div>
            <div className="h-full w-full fixed top-0 left-0 z-[99] bg-opacity-70 backdrop-blur-sm" style={{ background:"rgba(14, 14, 14, 0.58)" }} ></div>
            <div className="bg-white fixed top-[50%] left-[50%] p-[20px] z-[100] rounded-[8px] w-[400px]" style={{ transform: "translate(-50%, -50%)" }}>
                <img src="./warning.svg" alt="" />
                <p className="text-[#101828] font-[600] tex-[22px] my-3 text-left">Logout Account</p>
                <p className="text-[#475467] text-[15px]">Are you sure you want to logout of this account? you can login back to your account anytime.</p>
                <div className="flex items-center justify-between gap-5 mt-6">
                    <button className="text-[#344054] border border-[#D0D5DD] py-[7px] rounded-[4px] w-full" onClick={() => setLogoutModal('')}>Cancel</button>
                    <button onClick={logoutUser} className="text-[#fff] border border-primary-color bg-primary-color py-[7px] rounded-[4px] w-full">Logout</button>
                </div>
            </div>
        </div>,
    document.body
  )
}

export default LogOutModal