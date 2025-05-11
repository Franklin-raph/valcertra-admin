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
        <Route path='/product-price' element={<ProductPrice />}/>
      </Routes>
    </HashRouter>
  )
}

export default App
