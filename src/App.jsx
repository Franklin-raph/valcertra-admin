import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import ProductPrice from './pages/product-price/ProductPrice'
import Applications from './pages/applications/Applications'
import SupplierVerification from './pages/supplier-verification/SupplierVerification'
import AuditManagement from './pages/audit-management/AuditManagement'
import Staffs from './pages/staffs/Staffs'
import StaffProfile from './pages/staff-profile/StaffProfile'
import MyProfile from './pages/my-profile/MyProfile'
import Certifications from './pages/certifications/Certifications'

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/applications' element={<Applications />}/>
        <Route path='/supplier-verification' element={<SupplierVerification />}/>
        <Route path='/audit-management' element={<AuditManagement />}/>
        <Route path='/staffs' element={<Staffs />}/>
        <Route path='/staff/:id' element={<StaffProfile />}/>
        <Route path='/my-profile' element={<MyProfile />}/>
        <Route path='/certifications' element={<Certifications />}/>
        <Route path='/analytics' element={<Certifications />}/>
        <Route path='/product-price' element={<ProductPrice />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
