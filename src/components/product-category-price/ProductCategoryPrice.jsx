import { useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import { IoArrowBackOutline, IoCalculator, IoCloseOutline } from 'react-icons/io5';
import { post } from '../../utils/axiosHelpers';
import Alert from '../alert/Alert';
import BtnLoader from '../btnLoader/BtnLoader';

export default function ProductCategoryPrice({ setProductPriceModal, getAllProductPrices }) {
  const [formData, setFormData] = useState({
    product_category: '',
    product_amount: ''
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

  const createProductCategory = async () => {
    if(!formData.product_amount || !formData.product_category){
        setMsg("Please fill in all fields")
        setAlertType('error')
        return
    }
    try {
            setLoading(true)
            const response = await post('/product-prices/', formData)
            setMsg(response.message)
            setAlertType('success')
            getAllProductPrices()
            formData.product_category = ""
            formData.product_amount = ""
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
                        <h2 className="text-[20px] font-semibold text-[#333333]">Product Category Price</h2>
                        <p className='text-[#475467] text-[15px]'>Please add the product category and price</p>
                    </div>
                </div>
                <div className="mt-4 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Product Category</label>
                    <input
                        type="text"
                        value={formData.product_category}
                        onChange={(e) => handleInputChange('product_category', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        placeholder="Agriculture"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Amount</label>
                    <input
                        type="text"
                        value={formData.product_amount}
                        onChange={(e) => handleInputChange('product_amount', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded outline-none"
                        placeholder="0.00"
                    />
                </div>
                {
                    loading ?
                    <BtnLoader />
                    :
                    <div className="flex justify-between space-x-3 mt-7 mb-1">
                        <button
                            onClick={() => setProductPriceModal(false)}
                            className="border border-[#D0D5DD] text-[#344054] py-2 px-4 rounded w-full"
                            >
                            Cancel
                        </button>
                        <button
                            onClick={createProductCategory}
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