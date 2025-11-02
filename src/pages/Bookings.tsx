import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Plus, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns';

interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes: string;
}

interface Customer {
  id: string;
  name: string;
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [customers] = useState<Customer[]>([
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Emily Davis' },
    { id: '3', name: 'Jessica Wilson' },
    { id: '4', name: 'Amanda Brown' }
  ]);
  const [services] = useState<Service[]>([
    { id: '1', name: 'Haircut & Styling', duration: 60, price: 45 },
    { id: '2', name: 'Hair Coloring', duration: 120, price: 85 },
    { id: '3', name: 'Manicure', duration: 45, price: 35 },
    { id: '4', name: 'Facial Treatment', duration: 90, price: 75 }
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [draggedBooking, setDraggedBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({
    customerId: '', serviceId: '', date: '', time: '', notes: ''
  });

  // Load sample bookings
  useEffect(() => {
    const sampleBookings: Booking[] = [
      {
        id: '1',
        customerId: '1',
        customerName: 'Sarah Johnson',
        serviceId: '2',
        serviceName: 'Hair Coloring',
        date: '2024-01-25',
        time: '10:00',
        duration: 120,
        price: 85,
        status: 'confirmed',
        notes: 'First time coloring'
      },
      {
        id: '2',
        customerId: '2',
        customerName: 'Emily Davis',
        serviceId: '4',
        serviceName: 'Facial Treatment',
        date: '2024-01-26',
        time: '14:00',
        duration: 90,
        price: 75,
        status: 'confirmed',
        notes: 'Regular monthly facial'
      },
      {
        id: '3',
        customerId: '3',
        customerName: 'Jessica Wilson',
        serviceId: '3',
        serviceName: 'Manicure',
        date: '2024-01-27',
        time: '11:30',
        duration: 45,
        price: 35,
        status: 'pending',
        notes: 'Nail art requested'
      }
    ];
    setBookings(sampleBookings);
  }, []);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', 
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.customerId && formData.serviceId && formData.date && formData.time) {
      const customer = customers.find(c => c.id === formData.customerId);
      const service = services.find(s => s.id === formData.serviceId);
      
      const newBooking: Booking = {
        id: Date.now().toString(),
        customerId: formData.customerId,
        customerName: customer?.name || '',
        serviceId: formData.serviceId,
        serviceName: service?.name || '',
        date: formData.date,
        time: formData.time,
        duration: service?.duration || 60,
        price: service?.price || 0,
        status: 'confirmed',
        notes: formData.notes
      };
      setBookings([...bookings, newBooking]);
      setFormData({ customerId: '', serviceId: '', date: '', time: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => 
      isSameDay(new Date(booking.date), date)
    );
  };

  const handleDragStart = (booking: Booking) => {
    setDraggedBooking(booking);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    if (draggedBooking) {
      const updatedBookings = bookings.map(booking => 
        booking.id === draggedBooking.id 
          ? { ...booking, date: format(date, 'yyyy-MM-dd') }
          : booking
      );
      setBookings(updatedBookings);
      setDraggedBooking(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const todayBookings = bookings.filter(booking => 
    isSameDay(new Date(booking.date), new Date())
  );

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.date) > new Date()
  ).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl animate-slideInDown">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Booking Management</h1>
            <p className="text-indigo-100">Schedule and manage appointments with ease</p>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=2" 
              alt="Booking calendar" 
              className="w-32 h-24 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today's Bookings</p>
              <p className="text-2xl font-bold text-gray-800">{todayBookings.length}</p>
            </div>
            <Calendar className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp animation-delay-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Month</p>
              <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
            </div>
            <Users className="text-purple-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp animation-delay-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Confirmed</p>
              <p className="text-2xl font-bold text-gray-800">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
            <Clock className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp animation-delay-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Revenue Today</p>
              <p className="text-2xl font-bold text-gray-800">
                ${todayBookings.reduce((sum, b) => sum + b.price, 0)}
              </p>
            </div>
            <Calendar className="text-orange-600" size={32} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-lg">
        <div className="flex gap-4">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              viewMode === 'calendar' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              viewMode === 'list' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} />
          <span>New Booking</span>
        </button>
      </div>

      {/* Add Booking Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-slideInDown">
          <h3 className="text-lg font-semibold mb-4">Create New Booking</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={formData.customerId}
                onChange={(e) => setFormData({...formData, customerId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>
              <select
                value={formData.serviceId}
                onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select Service</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>{service.name} - ${service.price}</option>
                ))}
              </select>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <select
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select Time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                Create Booking
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {viewMode === 'calendar' ? (
        /* Calendar View */
        <div className="bg-white rounded-xl shadow-lg p-6 animate-slideInUp">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-50 rounded-lg">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthDays.map(date => {
              const dayBookings = getBookingsForDate(date);
              const isCurrentDay = isToday(date);
              
              return (
                <div
                  key={date.toISOString()}
                  className={`min-h-[120px] p-2 border rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                    isCurrentDay ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, date)}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    isCurrentDay ? 'text-purple-600' : 'text-gray-600'
                  }`}>
                    {format(date, 'd')}
                  </div>
                  <div className="space-y-1">
                    {dayBookings.map(booking => (
                      <div
                        key={booking.id}
                        draggable
                        onDragStart={() => handleDragStart(booking)}
                        className={`p-2 rounded text-xs cursor-move transition-all duration-200 hover:scale-105 ${getStatusColor(booking.status)}`}
                      >
                        <div className="font-medium">{booking.time}</div>
                        <div className="truncate">{booking.customerName}</div>
                        <div className="truncate text-gray-600">{booking.serviceName}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((booking, index) => (
            <div 
              key={booking.id} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full">
                  <Calendar size={24} />
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-lg">{booking.customerName}</h3>
                <p className="text-gray-600">{booking.serviceName}</p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>📅 {booking.date}</span>
                  <span>⏰ {booking.time}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Duration: {booking.duration} min</span>
                  <span className="font-semibold text-green-600">${booking.price}</span>
                </div>
                {booking.notes && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{booking.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Today's Schedule Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInLeft">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2 text-blue-600" size={24} />
            Today's Schedule
          </h3>
          <div className="space-y-3">
            {todayBookings.length > 0 ? (
              todayBookings.map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{booking.customerName}</p>
                    <p className="text-sm text-gray-600">{booking.serviceName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{booking.time}</p>
                    <p className="text-sm text-green-600">${booking.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No bookings for today</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg animate-slideInRight">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 text-purple-600" size={24} />
            Upcoming Bookings
          </h3>
          <div className="space-y-3">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{booking.customerName}</p>
                    <p className="text-sm text-gray-600">{booking.serviceName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{booking.date}</p>
                    <p className="text-sm text-gray-600">{booking.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming bookings</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;