import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', Applications: 150, Approved: 125, Rejection: 110 },
  { name: 'Feb', Applications: 200, Approved: 100, Rejection: 150 },
  { name: 'Mar', Applications: 100, Approved: 280, Rejection: 110 },
  { name: 'Apr', Applications: 140, Approved: 60, Rejection: 290 },
  { name: 'May', Applications: 200, Approved: 280, Rejection: 290 },
  { name: 'Jun', Applications: 110, Approved: 230, Rejection: 240 },
  { name: 'Jul', Applications: 280, Approved: 120, Rejection: 130 },
  { name: 'Aug', Applications: 90, Approved: 70, Rejection: 60 },
  { name: 'Sep', Applications: 150, Approved: 300, Rejection: 210 },
  { name: 'Oct', Applications: 240, Approved: 170, Rejection: 170 },
  { name: 'Nov', Applications: 230, Approved: 40, Rejection: 90 },
  { name: 'Dec', Applications: 60, Approved: 240, Rejection: 110 }
];

export default function ApplicationTrendsChart() {
  const [hoveredLine, setHoveredLine] = useState(null);

  const handleLineMouseOver = (dataKey) => {
    setHoveredLine(dataKey);
  };

  const handleLineMouseOut = () => {
    setHoveredLine(null);
  };

  const getLineOpacity = (dataKey) => {
    if (!hoveredLine) return 1;
    return hoveredLine === dataKey ? 1 : 0.3;
  };

  const getLineWidth = (dataKey) => {
    if (!hoveredLine) return 2;
    return hoveredLine === dataKey ? 3 : 2;
  };

  return (
    <div className="w-full h-full text-[14px] border mt-12 p-3 rounded-[8px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-text-color">Application Trends</h2>
        <button className="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2 flex items-center space-x-2 shadow-sm hover:bg-gray-50">
          <span>New Application</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="name"
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280' }}
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={{ stroke: '#e5e7eb' }}
              domain={[0, 300]}
              ticks={[0, 75, 150, 225, 300]}
              width={40}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                border: '1px solid #e5e7eb'
              }}
            />
            <Line
              type="monotone"
              dataKey="Applications"
              stroke="#3b82f6"
              strokeWidth={getLineWidth('Applications')}
              dot={{ r: 4, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2 }}
              onMouseOver={() => handleLineMouseOver('Applications')}
              onMouseOut={handleLineMouseOut}
              strokeOpacity={getLineOpacity('Applications')}
            />
            <Line
              type="monotone"
              dataKey="Approved"
              stroke="#10b981"
              strokeWidth={getLineWidth('Approved')}
              dot={{ r: 4, fill: '#10b981', stroke: 'white', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#10b981', stroke: 'white', strokeWidth: 2 }}
              onMouseOver={() => handleLineMouseOver('Approved')}
              onMouseOut={handleLineMouseOut}
              strokeOpacity={getLineOpacity('Approved')}
            />
            <Line
              type="monotone"
              dataKey="Rejection"
              stroke="#ef4444"
              strokeWidth={getLineWidth('Rejection')}
              dot={{ r: 4, fill: '#ef4444', stroke: 'white', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#ef4444', stroke: 'white', strokeWidth: 2 }}
              onMouseOver={() => handleLineMouseOver('Rejection')}
              onMouseOut={handleLineMouseOut}
              strokeOpacity={getLineOpacity('Rejection')}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-start space-x-8 text-[14px] mt-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-gray-700">Applications</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-gray-700">Approved</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-gray-700">Rejection</span>
        </div>
      </div>
    </div>
  );
}