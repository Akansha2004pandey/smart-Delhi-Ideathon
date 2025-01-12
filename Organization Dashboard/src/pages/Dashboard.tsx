

import React from 'react'
import { Users, Shield, Key, AlertTriangle, Siren, Camera, Building2 } from 'lucide-react'
import { Area, AreaChart,LabelList,RadialBar,RadialBarChart,Bar,BarChart,CartesianGrid,XAxis } from "recharts"


const sparklineData = {
  users: [
    { value: 20 }, { value: 10 }, { value: 160 }, { value: 150 }, { value: 250 },
    { value: 20 }, { value: 10 }, { value: 160 }, { value: 150 }, { value: 250 },
    { value: 20 }, { value: 10 }, { value: 160 }, { value: 150 }, { value: 250 },
    { value: 20 }, { value: 10 }, { value: 160 }, { value: 150 }, { value: 250 } 
  ],
  abnormalities: [
    { value: 4 }, { value: 16 }, { value: 2 }, { value: 20 }, { value: 10 },
    { value: 4 }, { value: 16 }, { value: 2 }, { value: 20 }, { value: 10 },
    { value: 4 }, { value: 16 }, { value: 2 }, { value: 20 }, { value: 10 },
    { value: 4 }, { value: 16 }, { value: 2 }, { value: 20 }, { value: 10 },
  ],
  complaints: [
    { value: 2 }, { value: 8 }, { value: 3 }, { value: 10 }, { value: 2 },
    { value: 2 }, { value: 8 }, { value: 3 }, { value: 10 }, { value: 5 },
    { value: 2 }, { value: 8 }, { value: 3 }, { value: 10 }, { value: 5 },
    { value: 2 }, { value: 8 }, { value: 3 }, { value: 10 }, { value: 5 },
    { value: 2 }, { value: 8 }, { value: 3 }, { value: 10 }, { value: 5 },
  ],
  cameras: [
    { value: 18 }, { value: 35 }, { value: 10 }, { value: 40 }, { value: 95 },
    { value: 18 }, { value: 35 }, { value: 10 }, { value: 40 }, { value: 95 },
    { value: 18 }, { value: 35 }, { value: 10 }, { value: 40 }, { value: 95 },
    { value: 18 }, { value: 35 }, { value: 10 }, { value: 40 }, { value: 95 },
  ]
};

const stats = [
  { 
    name: 'Organization', 
    value: '120', 
    change: '+12%', 
    timeframe: '/month',
    icon: Building2, 
    color: 'text-green-500',
    sparklineColor: '#22c55e',
    data: sparklineData.users 
  },
  { 
    name: 'Abnormalities', 
    value: '8', 
    change: '-25%', 
    timeframe: '/month',
    icon: Siren, 
    color: 'text-red-500',
    sparklineColor: '#ef4444',
    data: sparklineData.abnormalities 
  },
  { 
    name: 'Complaints', 
    value: '24', 
    change: '-18%', 
    timeframe: '/month',
    icon: AlertTriangle, 
    color: 'text-yellow-500',
    sparklineColor: '#eab308',
    data: sparklineData.complaints 
  },
  { 
    name: 'Cameras', 
    value: '3', 
    change: '+15%', 
    timeframe: '/month',
    icon: Camera, 
    color: 'text-purple-500',
    sparklineColor: '#a855f7',
    data: sparklineData.cameras 
  },
];


const chartData = [
  { browser: "Tampering", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "Crowd Congestion", visitors: 200, fill: "var(--color-safari)" },
  { browser: "Camera Shutdown", visitors: 120, fill: "var(--color-firefox)" },
  { browser: "Gesture Detection", visitors: 173, fill: "var(--color-edge)" },

]

const barChartData = [
  { month: "January", desktop: 73 },
  { month: "February", desktop: 100 },
  { month: "March", desktop: 200 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 308 },

]


export default function Dashboard() {
  return (

      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-black text-white">Dashboard Overview</h1>
        
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon
            const isNegative = item.change.startsWith('-')
            return (
<div
  key={item.name}
  className="relative flex overflow-hidden rounded-lg bg-white shadow sm:px-6 sm:py-6"
>
  {/* Left Content */}
  <div className="flex-1 z-30 px-4 pt-5 pb-16">
    <dt>
    <div className="absolute rounded-md ">
  <Icon className={`h-12 w-12 font-bold ${item.color}`} aria-hidden="true" />
</div>


      <p className="ml-16 truncate text-sm font-medium text-gray-500">
        {item.name}
      </p>
    </dt>
    <dd className="ml-16 flex flex-col gap-2">
      <div>
        <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
        <div className="flex items-baseline space-x-2 mb-2">
          <span
            className={`text-sm font-medium ${
              isNegative ? "text-red-600" : "text-green-600"
            }`}
          >
            {item.change}
          </span>
          <span className="text-sm text-gray-500">{item.timeframe}</span>
        </div>
      </div>
    </dd>
  </div>

  {/* Right Content: Chart */}
  <div className="flex absolute md:mt-20  inset-y-0 right-0  items-center justify-center flex-shrink-0 bg-gray-50 rounded-r-lg p-4">
    <AreaChart
      width={900}
      height={50}
      data={item.data}
      margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id={`gradient-${item.name}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={item.sparklineColor} stopOpacity={0.3} />
          <stop offset="95%" stopColor={item.sparklineColor} stopOpacity={0} />
        </linearGradient>
      </defs>


      <Area
        type="monotone"
        dataKey="value"
        stroke={item.sparklineColor}
        fill={`url(#gradient-${item.name})`}
        strokeWidth={2}
      />
    </AreaChart>
  </div>
</div>

            )
          })}
        </div>
        <div className='flex mt-4 flex-col justify-center items-center'>

          
          <div
  className="flex justify-between items-center p-6 bg-gray-50 rounded-lg shadow-md relative w-full"
>
  {/* Radial Bar Chart */}
  <div className="flex w-1/2 flex-col items-center">
    <h3 className=" mb-4 mt-4 text-3xl font-bold">Detection</h3>
    <RadialBarChart
      width={350}
      height={250}
      data={chartData}
      startAngle={-90}
      endAngle={270}
      innerRadius={30}
      outerRadius={140}
    >
      <RadialBar
        dataKey="visitors"
        background={{ fill: "#eee" }}
        cornerRadius={10}
        barSize={15}
      >
        <LabelList
          position="insideStart"
          dataKey="browser"
          className="fill-white capitalize mix-blend-luminosity text-sm"
        />
      </RadialBar>
    </RadialBarChart>
  </div>

  {/* Bar Chart */}
  <div className="flex flex-col items-center w-1/2">
  <h3 className=" mb-4 mt-4 text-3xl font-bold">Registered Organization Count</h3>
    <BarChart
      width={350}
      height={250}
      data={barChartData}
    >
      <CartesianGrid vertical={false} stroke="#e0e0e0" />
      <XAxis
        dataKey="month"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value.slice(0, 3)}
        className="text-gray-600 text-sm"
      />
      <Bar dataKey="desktop" fill="#463bd1" radius={8} />
    </BarChart>
  </div>
</div>


</div>

  </div>
    
  )
}

