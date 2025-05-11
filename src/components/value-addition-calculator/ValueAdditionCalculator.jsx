import { useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import { IoArrowBackOutline, IoCalculator, IoCloseOutline } from 'react-icons/io5';

export default function ValueAdditionCalculator({setValueAddedCalculator}) {
  const [formData, setFormData] = useState({
    productValue: '',
    importedInputsCost: ''
  });
  const [results, setResults] = useState({
    valueAdded: null,
    valueAddedPercentage: null
  });
  const [showResults, setShowResults] = useState(false);
  const [showFormula, setShowFormula] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    setShowResults(false);
  };

  const calculateResults = () => {
    const productValue = parseFloat(formData.productValue) || 0;
    const importedInputs = parseFloat(formData.importedInputsCost) || 0;
    
    const valueAdded = productValue - importedInputs;
    const valueAddedPercentage = productValue > 0 ? 
      (valueAdded / productValue) * 100 : 0;
    
    setResults({
      valueAdded: valueAdded.toFixed(2),
      valueAddedPercentage: valueAddedPercentage.toFixed(2)
    });
    
    setShowResults(true);
  };

  const resetCalculator = () => {
    setFormData({
      productValue: '',
      importedInputsCost: ''
    });
    setResults({
      valueAdded: null,
      valueAddedPercentage: null
    });
    setShowResults(false);
    setShowFormula(false)
  };

  return (
    <div>
        <div className="h-full w-full fixed top-0 left-0 z-[99] bg-opacity-70 backdrop-blur-sm" style={{ background:"rgba(14, 14, 14, 0.58)" }} ></div>
        <div className="flex items-center flex-col text-center justify-center gap-3 bg-white fixed top-[50%] left-[50%] py-[20px] px-[0.5rem] z-[100] rounded-[8px] w-[500px]" style={{ transform: "translate(-50%, -50%)" }}>
        {/* Modal Header with back button and close button */}
        <div className="flex items-center justify-between p-4 mb-2 w-full">
            <div className="flex items-center">
                <button className="bg-blue-900 text-white rounded-md p-2 mr-4">
                    <IoArrowBackOutline />
                </button>
            </div>
            <img src="./logo.svg" alt="" />
            <button className="text-gray-500 text-[20px]" onClick={() => { setValueAddedCalculator('') }}>
                <IoCloseOutline />
            </button>
        </div>

        {/* Calculator Content */}
        <div className="px-6 w-full">
            <div className='mb-[1.5rem]'>
                <div className="flex items-center justify-center mb-1 gap-2">
                    <IoCalculator className='text-primary-color text-[24px]'/>
                    <h2 className="text-[20px] font-semibold text-[#333333]">Value Addition Calculator</h2>
                </div>
                <div onClick={() => setShowFormula(!showFormula)} className="flex items-center justify-center text-ascent-color cursor-pointer">
                    <GoQuestion />
                    <span className="ml-1 text-sm">Formula</span>
                </div>
            </div>

            {
                showFormula && (
                    <div className='w-full mx-auto'>
                        <h3 className="font-semibold text-[#333333] mb-2 text-left">How it is calculated:</h3>
                        <h3 className="text-[#666666] text-[14px] mb-2 text-left">To calculate your Value Addition (%)::</h3>
                        <div className="mb-6 bg-secondary-color p-4 rounded w-full">
                            <p className='text-left text-[14px] text-[#666666] mt-3'>Value Addition = ( (Final Product Value - Imported Inputs) / Final Product Value ) x 100</p>
                        </div>
                    </div>
                )
            }

            {/* Input Fields */}
            <div className="mt-4 mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Your Final Product Value (#)</label>
                <input
                    type="text"
                    value={formData.productValue}
                    onChange={(e) => handleInputChange('productValue', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="0.00"
                />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Your Total Local Production Cost(#)</label>
                <input
                    type="text"
                    value={formData.importedInputsCost}
                    onChange={(e) => handleInputChange('importedInputsCost', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="0.00"
                />
            </div>

            {/* Results Section (conditionally shown) */}

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-7 mb-1">
                <button
                    onClick={calculateResults}
                    className="flex-1 bg-primary-color text-white py-2 px-4 rounded"
                    >
                    Calculate
                </button>
                <button
                    onClick={resetCalculator}
                    className="px-4 bg-secondary-color text-primary-color rounded"
                    >
                    Reset
                </button>
            </div>
            <button className='w-full py-[8px] rounded-[4px] mt-1 bg-gray-200'>Download</button>
        </div>

        {showResults && (
            <>
                {
                    results.valueAddedPercentage > 30 ?
                    <div className='px-6 w-full mx-auto'>
                        <h3 className="font-semibold text-[#333333] mb-4 text-left">Results:</h3>
                        <div className="mb-6 bg-secondary-color p-4 rounded w-full">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700">Value Addition Score</span>
                                <div className="flex flex-col items-end mb-3">
                                    <span className="font-medium text-[20px] text-ascent-color">{results.valueAddedPercentage}%</span>
                                    <span className="text-[#12B76A] text-[13px]">Qualifies for AfCFTA</span>
                                </div>
                            </div>
                            <p className='text-left text-[14px] text-[#666666] mt-3'>Your product has sufficient local value addition to qualify for preferential tariff treatment under AfCFTA.</p>
                        </div>
                    </div>
                    :
                    <div className='px-6 w-full mx-auto'>
                        <h3 className="font-semibold text-[#333333] mb-4 text-left">Results:</h3>
                        <div className="mb-6 bg-secondary-color p-4 rounded w-full">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-700">Value Addition Score</span>
                                <div className="flex flex-col items-end mb-3">
                                    <span className="font-medium text-[20px] text-ascent-color">{results.valueAddedPercentage}%</span>
                                    <span className="text-[#F04438] text-[13px]">Does not qualify (min. 30% required)</span>
                                </div>
                            </div>
                            <p className='text-left text-[14px] text-[#666666] mt-3'>Your product needs at least 35% value addition to qualify for preferential tariff treatment under AfCFTA.</p>
                        </div>
                    </div>
                }
            </>
        )}
        </div>
    </div>
  );
}