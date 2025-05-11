import React, { useState, useEffect } from "react";
import TopNav from "../../components/top-nav/TopNav";
import SideNav from "../../components/side-nav/SideNav";
// import ValueAdditionCalculator from "../../components/value-addition-calculator/ValueAdditionCalculator";
// import CertificateApplication from "../../components/certificate-application/CertificateApplication";
import { get } from "../../utils/axiosHelpers";
// import FullPageLoader from "../../components/full-page-loader/FullPageLoader";
import { useNavigate } from "react-router-dom";
import { BsArrow90DegUp } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import ProductCategoryPrice from "../../components/product-category-price/ProductCategoryPrice";


const ProductPrice = () => {

    const [toggleNav, setToggleNav] = useState(false)
    const [productPriceModal, setProductPriceModal] = useState(false)
    const [certificationApplication, setCertificationApplication] = useState(false)
    const [allProductPrices, setAllProductPrices] = useState()
    const [summary, setSummary] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const getAllProductPrices = async () => {
      const res = await get('/product-prices/')
      setAllProductPrices(res)
      console.log(res);
    }

    useEffect(() => {
    //   const fetchData = async () => {
    //     setIsLoading(true);
    //     await Promise.all([getSummary(), getAllApplications()]);
    //     setIsLoading(false);
    //   };
      
      getAllProductPrices();
    }, []);
  
  return (
    <div>
      {/* {isLoading && <FullPageLoader />} */}
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
                    <p className="text-[#101828] text-[18px] flex items-center gap-2"> <p>Products</p> <p className="bg-[#F0F9FF] text-[#026AA2] text-[13px] px-2 py-1 rounded-full">10</p> </p>
                    <div className='text-[#19201D] items-center gap-3 border py-[6px] px-[8px] rounded-[4px] cursor-pointer hidden lg:flex'>
                        <BiSearch fontSize={"20px"}/>
                        <input type="text" placeholder='Search' className='outline-none' />
                    </div>
                </div>
                <div class="relative overflow-x-auto">
                    <table class="w-full text-sm text-left rtl:text-left">
                        <thead class="text-[12px] md:text-[14px] bg-[#F9FAFB] text-[#475467]">
                            <tr>
                                <th scope="col" class="px-6 py-3 font-[600]">Product Category</th>
                                <th scope="col" class="px-6 py-3 font-[600]">Product Amount ($)</th>
                                <th scope="col" class="px-6 py-3 font-[600]">Date Updated</th>
                                <th scope="col" class="px-2 py-3 font-[600]">Update Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allProductPrices?.data?.map((productPrice, index) => (
                                    <tr>
                                        <td class="px-6 py-4 text-[12px] md:text-[16px] text-[#475467] capitalize">{productPrice?.product_category}</td>
                                        <td class="px-6 py-4 text-[12px] md:text-[16px] text-[#475467]">{productPrice?.product_amount}</td>
                                        <td class="px-6 py-4 text-[12px] md:text-[16px] text-[#475467]">{ new Date(productPrice.updated_at).toLocaleDateString() }</td>
                                        <td class="py-4 text-[12px] md:text-[16px]">
                                            <div className="inline-flex items-center gap-2 bg-[#F0F9FF] rounded-full py-[6px] px-[10px] cursor-pointer">
                                                <p className="text-[14px] text-[#026AA2] font-[500]">Update</p>
                                            </div>
                                        </td>
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
      {/* {
        valueAddedCalculator && <ValueAdditionCalculator setValueAddedCalculator={setValueAddedCalculator}/>
      } */}
      {
        productPriceModal && <ProductCategoryPrice getAllProductPrices={getAllProductPrices} setProductPriceModal={setProductPriceModal}/>
      }
    </div>
  );
}

export default ProductPrice;
