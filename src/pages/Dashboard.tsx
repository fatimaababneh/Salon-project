import React, { useState, useEffect } from 'react';
import { Users, Scissors, Calendar, Clock, DollarSign, TrendingUp, Star, Award } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Dashboard = () => {
  const [animatedStats, setAnimatedStats] = useState({
    customers: 0,
    services: 0,
    bookings: 0,
    revenue: 0
  });

  // Animate counters
  useEffect(() => {
    const targets = { customers: 247, services: 12, bookings: 89, revenue: 15420 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        customers: Math.floor(targets.customers * progress),
        services: Math.floor(targets.services * progress),
        bookings: Math.floor(targets.bookings * progress),
        revenue: Math.floor(targets.revenue * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 12400, bookings: 65 },
    { month: 'Feb', revenue: 13200, bookings: 72 },
    { month: 'Mar', revenue: 14100, bookings: 78 },
    { month: 'Apr', revenue: 13800, bookings: 75 },
    { month: 'May', revenue: 15200, bookings: 85 },
    { month: 'Jun', revenue: 15420, bookings: 89 }
  ];

  const servicePopularity = [
    { name: 'Haircut & Styling', value: 35, color: '#8B5CF6' },
    { name: 'Hair Coloring', value: 25, color: '#EC4899' },
    { name: 'Manicure', value: 20, color: '#06B6D4' },
    { name: 'Facial Treatment', value: 15, color: '#10B981' },
    { name: 'Other', value: 5, color: '#F59E0B' }
  ];

  const dailyBookings = [
    { day: 'Mon', bookings: 12, revenue: 890 },
    { day: 'Tue', bookings: 15, revenue: 1120 },
    { day: 'Wed', bookings: 18, revenue: 1340 },
    { day: 'Thu', bookings: 14, revenue: 980 },
    { day: 'Fri', bookings: 22, revenue: 1650 },
    { day: 'Sat', bookings: 28, revenue: 2100 },
    { day: 'Sun', bookings: 8, revenue: 560 }
  ];

  const topCustomers = [
    { name: 'Sarah Johnson', visits: 24, spent: 1840, avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
    { name: 'Emily Davis', visits: 18, spent: 1520, avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
    { name: 'Jessica Wilson', visits: 16, spent: 1340, avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
    { name: 'Amanda Brown', visits: 14, spent: 1180, avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }
  ];

  const recentActivity = [
    { action: 'New booking', customer: 'Sarah Johnson', service: 'Hair Coloring', time: '2 minutes ago', type: 'booking' },
    { action: 'Payment received', customer: 'Emily Davis', amount: '$85', time: '15 minutes ago', type: 'payment' },
    { action: 'Service completed', customer: 'Jessica Wilson', service: 'Facial Treatment', time: '1 hour ago', type: 'completed' },
    { action: 'New customer', customer: 'Amanda Brown', service: 'Manicure', time: '2 hours ago', type: 'customer' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white p-8 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 animate-slideInLeft">Welcome Back! ✨</h1>
              <p className="text-purple-100 text-lg animate-slideInLeft animation-delay-200">
                Your salon is thriving today with {animatedStats.bookings} appointments scheduled
              </p>
            </div>
            <div className="hidden md:block animate-float">
              <img 
                src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2" 
                alt="Salon" 
                className="w-48 h-32 object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4 animate-pulse">
          <Star className="text-yellow-300" size={24} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Customers</p>
              <p className="text-3xl font-bold text-gray-800">{animatedStats.customers}</p>
              <p className="text-green-600 text-sm flex items-center mt-1">
                <TrendingUp size={16} className="mr-1" />
                +12% this month
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <Users className="text-blue-600" size={28} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp animation-delay-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Services</p>
              <p className="text-3xl font-bold text-gray-800">{animatedStats.services}</p>
              <p className="text-purple-600 text-sm flex items-center mt-1">
                <Award size={16} className="mr-1" />
                Premium quality
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <Scissors className="text-green-600" size={28} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp animation-delay-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">This Month's Bookings</p>
              <p className="text-3xl font-bold text-gray-800">{animatedStats.bookings}</p>
              <p className="text-blue-600 text-sm flex items-center mt-1">
                <Calendar size={16} className="mr-1" />
                +8% vs last month
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <Calendar className="text-purple-600" size={28} />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp animation-delay-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Monthly Revenue</p>
              <p className="text-3xl font-bold text-gray-800">${animatedStats.revenue.toLocaleString()}</p>
              <p className="text-green-600 text-sm flex items-center mt-1">
                <DollarSign size={16} className="mr-1" />
                +15% growth
              </p>
            </div>
            <div className="bg-orange-100 p-4 rounded-full">
              <DollarSign className="text-orange-600" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInLeft">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <TrendingUp className="mr-2 text-purple-600" size={24} />
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service Popularity */}
        <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInRight">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Star className="mr-2 text-yellow-500" size={24} />
            Service Popularity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={servicePopularity}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {servicePopularity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Performance */}
      <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInUp">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Clock className="mr-2 text-blue-600" size={24} />
          Weekly Performance
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyBookings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="bookings" fill="#8B5CF6" name="Bookings" />
            <Bar yAxisId="right" dataKey="revenue" fill="#EC4899" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Customers */}
        <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInLeft">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Award className="mr-2 text-gold-500" size={24} />
            Top Customers
          </h3>
          <div className="space-y-4">
            {topCustomers.map((customer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <img 
                    src={customer.avatar} 
                    alt={customer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.visits} visits</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">${customer.spent}</p>
                  <p className="text-sm text-gray-600">total spent</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInRight">
          <h3 className="text-xl font-semibold mb-6 flex items-center">
            <Clock className="mr-2 text-blue-600" size={24} />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'booking' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'payment' ? 'bg-green-100 text-green-600' :
                  activity.type === 'completed' ? 'bg-blue-100 text-blue-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'booking' && <Calendar size={16} />}
                  {activity.type === 'payment' && <DollarSign size={16} />}
                  {activity.type === 'completed' && <Clock size={16} />}
                  {activity.type === 'customer' && <Users size={16} />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.customer} {activity.service && `• ${activity.service}`} {activity.amount && `• ${activity.amount}`}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;