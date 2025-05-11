import React, { useState, useEffect } from "react";
import TopNav from "../../components/top-nav/TopNav";
import SideNav from "../../components/side-nav/SideNav";
import { get, patch, put, remove } from "../../utils/axiosHelpers";
import { BiSearch } from "react-icons/bi";
import ProductCategoryPrice from "../../components/product-category-price/ProductCategoryPrice";
import BtnLoader from "../../components/btnLoader/BtnLoader";
import Alert from "../../components/alert/Alert";

const ProductPrice = () => {
    const [toggleNav, setToggleNav] = useState(false);
    const [productPriceModal, setProductPriceModal] = useState(false);
    const [allProductPrices, setAllProductPrices] = useState();
    const [updateProductPrice, setUpdateProductPrice] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingProductData, setIsLoadingProductData] = useState(false);
    const [formData, setFormData] = useState({
        product_category: '',
        product_amount: ''
    });
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const getAllProductPrices = async () => {
        try {
            const res = await get('/product-prices/');
            setAllProductPrices(res);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching product prices:", error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAllProductPrices();
    }, []);

    const updateProductCategory = async () => {
        if (!formData.product_amount || !formData.product_category) {
            setMsg("Please fill in all fields");
            setAlertType('error');
            return;
        }
        try {
            setLoading(true);
            const res = await patch(`/product-prices/${updateProductPrice}/`, formData); // Added formData as payload
            setMsg(res.message || "Product updated successfully");
            setAlertType('success');
            getAllProductPrices();
            // Close the modal after successful update
            resetAndCloseModal();
        } catch (error) {
            setMsg(error.message || "Failed to update product");
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    }
    
    const deleteProductCategory = async () => {
        try {
            setLoading(true);
            await remove(`/product-prices/${updateProductPrice}/`);
            setMsg("Product deleted successfully");
            setAlertType('success');
            getAllProductPrices();
            // Close the modal after successful deletion
            resetAndCloseModal();
        } catch (error) {
            setMsg(error.message || "Failed to delete product");
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    }

    const resetAndCloseModal = () => {
        setFormData({
            product_category: '',
            product_amount: ''
        });
        setUpdateProductPrice('');
    }

    const getProductPrice = async (id) => {
        try {
            setIsLoadingProductData(true);
            const res = await get(`/product-prices/${id}`);
            if (res && res.data) {
                setFormData({
                    product_category: res.data.product_category || '',
                    product_amount: res.data.product_amount || ''
                });
                setUpdateProductPrice(id);
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
            setMsg("Failed to fetch product details");
            setAlertType('error');
        } finally {
            setIsLoadingProductData(false);
        }
    }
  
    return (
        <div>
            <>
                <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav}/>
                <div className="w-full lg:w-[82%] ml-auto">
                    <TopNav setToggleNav={setToggleNav} toggleNav={toggleNav} />
                    <div className="px-[10px] md:px-[30px] pb-[1rem] mt-[100px]">
                        <div className="flex items-center justify-between">
                            <p className="text-primary-color font-[600]">All Product Price</p>
                            <p onClick={() => setProductPriceModal(true)} className="bg-secondary-color text-primary-color py-[5px] text-[15px] cursor-pointer px-[10px] rounded-[4px]">+ Add Price</p>
                        </div>
                        <div className="border border-[#EAECF0] mt-7 rounded-[10px]">
                            <div className="flex items-center gap-4 mt-8 justify-between px-6 pb-4">
                                <p className="text-[#101828] text-[18px] flex items-center gap-2"> 
                                    <p>Products</p> 
                                    <p className="bg-[#F0F9FF] text-[#026AA2] text-[13px] px-2 py-1 rounded-full">
                                        {allProductPrices?.data?.length || 0}
                                    </p> 
                                </p>
                                <div className='text-[#19201D] items-center gap-3 border py-[6px] px-[8px] rounded-[4px] cursor-pointer hidden lg:flex'>
                                    <BiSearch fontSize={"20px"}/>
                                    <input type="text" placeholder='Search' className='outline-none' />
                                </div>
                            </div>
                            <div className="relative overflow-x-auto">
                                {isLoading ? (
                                    <div className="flex justify-center py-8">
                                        <p>Loading product prices...</p>
                                    </div>
                                ) : (
                                    <table className="w-full text-sm text-left rtl:text-left">
                                        <thead className="text-[12px] md:text-[14px] bg-[#F9FAFB] text-[#475467]">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 font-[600]">Product Category</th>
                                                <th scope="col" className="px-6 py-3 font-[600]">Product Amount ($)</th>
                                                <th scope="col" className="px-6 py-3 font-[600]">Date Updated</th>
                                                <th scope="col" className="px-2 py-3 font-[600]">Update Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allProductPrices?.data?.length > 0 ? (
                                                allProductPrices.data.map((productPrice, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 text-[12px] md:text-[16px] text-[#475467] capitalize">{productPrice?.product_category}</td>
                                                        <td className="px-6 py-4 text-[12px] md:text-[16px] text-[#475467]">{productPrice?.product_amount}</td>
                                                        <td className="px-6 py-4 text-[12px] md:text-[16px] text-[#475467]">
                                                            {new Date(productPrice.updated_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="py-4 text-[12px] md:text-[16px]">
                                                            <div 
                                                                onClick={async () => {
                                                                    await getProductPrice(productPrice.id);
                                                                }}
                                                                className="inline-flex items-center gap-2 bg-[#F0F9FF] rounded-full py-[6px] px-[10px] cursor-pointer"
                                                            >
                                                                <p className="text-[14px] text-[#026AA2] font-[500]">Update</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-center">No product prices available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            
            {productPriceModal && (
                <ProductCategoryPrice 
                    getAllProductPrices={getAllProductPrices} 
                    setProductPriceModal={setProductPriceModal}
                />
            )}

            {updateProductPrice && !isLoadingProductData && (
                <div>
                    {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
                    <div 
                        className="h-full w-full fixed top-0 left-0 z-[99] bg-opacity-70 backdrop-blur-sm" 
                        style={{ background:"rgba(14, 14, 14, 0.58)" }} 
                    ></div>
                    <div 
                        className="flex items-center flex-col text-center justify-center gap-3 bg-white fixed top-[50%] left-[50%] py-[20px] px-[0.5rem] z-[100] rounded-[8px] w-[450px]" 
                        style={{ transform: "translate(-50%, -50%)" }}
                    >
                        <img src="./product-price.svg" alt="" />
                        <div className="px-6 w-full">
                            <div className='mb-[1.5rem]'>
                                <div className="flex items-center justify-center mb-1 gap-2 flex-col">
                                    <h2 className="text-[20px] font-semibold text-[#333333]">Update Product Category Price</h2>
                                    <p className='text-[#475467] text-[15px]'>Edit the product category and price</p>
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
                            {loading ? (
                                <BtnLoader />
                            ) : (
                                <div className="flex justify-between space-x-3 mt-7 mb-1">
                                    <button
                                        onClick={resetAndCloseModal}
                                        className="border border-[#D0D5DD] text-[#344054] py-2 px-4 rounded w-full"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={updateProductCategory}
                                        className="bg-primary-color text-white py-2 px-4 rounded w-full"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={deleteProductCategory}
                                        className="bg-red-500 text-white py-2 px-4 rounded w-full"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
            {isLoadingProductData && (
                <div>
                    <div 
                        className="h-full w-full fixed top-0 left-0 z-[99] bg-opacity-70 backdrop-blur-sm" 
                        style={{ background:"rgba(14, 14, 14, 0.58)" }} 
                    ></div>
                    <div 
                        className="flex items-center flex-col text-center justify-center gap-3 bg-white fixed top-[50%] left-[50%] py-[20px] px-[0.5rem] z-[100] rounded-[8px] w-[450px]" 
                        style={{ transform: "translate(-50%, -50%)" }}
                    >
                        <div className="px-6 w-full py-8">
                            <p>Loading product details...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductPrice;