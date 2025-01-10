

import React from 'react'
import { Users, Shield, Key, AlertTriangle } from 'lucide-react'
import { Area, AreaChart } from "recharts"

const sparklineData = {
  users: [
    { value: 20 }, { value: 10 }, { value: 160 }, { value: 150 }, { value: 250 }
  ],
  roles: [
    { value: 4 }, { value: 16 }, { value: 2 }, { value: 20 }, { value: 78 }
  ],
  permissions: [
    { value: 18 }, { value: 35 }, { value: 10 }, { value: 40 }, { value: 95 }
  ],
  pending: [
    { value: 2 }, { value: 8 }, { value: 3 }, { value: 10 }, { value: 5 }
  ]
};

const stats = [
  { 
    name: 'Users', 
    value: '120', 
    change: '+12%', 
    timeframe: '/month',
    icon: Users, 
    color: 'bg-blue-500',
    sparklineColor: '#3b82f6',
    data: sparklineData.users 
  },
  { 
    name: 'Roles', 
    value: '8', 
    change: '+25%', 
    timeframe: '/month',
    icon: Shield, 
    color: 'bg-green-500',
    sparklineColor: '#22c55e',
    data: sparklineData.roles 
  },
  { 
    name: 'Permissions', 
    value: '24', 
    change: '+15%', 
    timeframe: '/month',
    icon: Key, 
    color: 'bg-purple-500',
    sparklineColor: '#a855f7',
    data: sparklineData.permissions 
  },
  { 
    name: 'Actions', 
    value: '3', 
    change: '-10%', 
    timeframe: '/month',
    icon: AlertTriangle, 
    color: 'bg-yellow-500',
    sparklineColor: '#eab308',
    data: sparklineData.pending 
  },
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
      <div className={`absolute rounded-md p-3 ${item.color}`}>
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
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
      width={1000}
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

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  <li className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          New user registered
                        </p>
                        <p className="text-sm text-gray-500">2 minutes ago</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">System Status</h3>
              <div className="mt-6">
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      System Load
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      23%
                    </dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Uptime
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      99.9%
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  )
}

