import React, { useState, useEffect } from 'react';
import { Users, Plus, Mail, Phone, MapPin, Calendar, DollarSign, Star, Search, Filter, Edit, Trash2 } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  favoriteService: string;
  rating: number;
  avatar: string;
  notes: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', notes: ''
  });

  // Load sample data
  useEffect(() => {
    const sampleCustomers: Customer[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY',
        createdAt: '2024-01-15',
        totalVisits: 24,
        totalSpent: 1840,
        lastVisit: '2024-01-20',
        favoriteService: 'Hair Coloring',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        notes: 'Prefers morning appointments, allergic to certain hair products'
      },
      {
        id: '2',
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '+1 (555) 234-5678',
        address: '456 Oak Ave, Los Angeles, CA',
        createdAt: '2024-02-01',
        totalVisits: 18,
        totalSpent: 1520,
        lastVisit: '2024-01-18',
        favoriteService: 'Facial Treatment',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        notes: 'Regular customer, books monthly facials'
      },
      {
        id: '3',
        name: 'Jessica Wilson',
        email: 'jessica.wilson@email.com',
        phone: '+1 (555) 345-6789',
        address: '789 Pine St, Chicago, IL',
        createdAt: '2024-01-10',
        totalVisits: 16,
        totalSpent: 1340,
        lastVisit: '2024-01-15',
        favoriteService: 'Manicure',
        rating: 4,
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        notes: 'Loves nail art, always tries new designs'
      },
      {
        id: '4',
        name: 'Amanda Brown',
        email: 'amanda.brown@email.com',
        phone: '+1 (555) 456-7890',
        address: '321 Elm St, Miami, FL',
        createdAt: '2024-02-10',
        totalVisits: 14,
        totalSpent: 1180,
        lastVisit: '2024-01-12',
        favoriteService: 'Haircut & Styling',
        rating: 5,
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        notes: 'Professional stylist, very particular about cuts'
      }
    ];
    setCustomers(sampleCustomers);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone) {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        totalVisits: 0,
        totalSpent: 0,
        lastVisit: '',
        favoriteService: '',
        rating: 0,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
      };
      setCustomers([...customers, newCustomer]);
      setFormData({ name: '', email: '', phone: '', address: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'vip') return matchesSearch && customer.totalSpent > 1000;
    if (filterBy === 'new') return matchesSearch && customer.totalVisits < 5;
    if (filterBy === 'regular') return matchesSearch && customer.totalVisits >= 10;
    
    return matchesSearch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl animate-slideInDown">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
            <p className="text-blue-100">Manage your valued customers and build lasting relationships</p>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=2" 
              alt="Happy customers" 
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
              <p className="text-gray-600 text-sm">Total Customers</p>
              <p className="text-2xl font-bold text-gray-800">{customers.length}</p>
            </div>
            <Users className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp animation-delay-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">VIP Customers</p>
              <p className="text-2xl font-bold text-gray-800">{customers.filter(c => c.totalSpent > 1000).length}</p>
            </div>
            <Star className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp animation-delay-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">New This Month</p>
              <p className="text-2xl font-bold text-gray-800">{customers.filter(c => c.totalVisits < 5).length}</p>
            </div>
            <Plus className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp animation-delay-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Spending</p>
              <p className="text-2xl font-bold text-gray-800">
                ${Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
              </p>
            </div>
            <DollarSign className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full md:w-80"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Customers</option>
              <option value="vip">VIP Customers</option>
              <option value="new">New Customers</option>
              <option value="regular">Regular Customers</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Add Customer Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-slideInDown">
          <h3 className="text-lg font-semibold mb-4">Add New Customer</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <textarea
              placeholder="Notes (preferences, allergies, etc.)"
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
                Add Customer
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

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer, index) => (
          <div 
            key={customer.id} 
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slideInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-4 mb-4">
              <img 
                src={customer.avatar} 
                alt={customer.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">{customer.name}</h3>
                <div className="flex items-center space-x-1">
                  {renderStars(customer.rating)}
                  <span className="text-sm text-gray-600 ml-2">({customer.rating}/5)</span>
                </div>
                {customer.totalSpent > 1000 && (
                  <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                    VIP Customer
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail size={16} />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone size={16} />
                <span className="text-sm">{customer.phone}</span>
              </div>
              {customer.address && (
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">{customer.address}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-purple-600">{customer.totalVisits}</p>
                  <p className="text-xs text-gray-600">Total Visits</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">${customer.totalSpent}</p>
                  <p className="text-xs text-gray-600">Total Spent</p>
                </div>
              </div>
            </div>

            {customer.favoriteService && (
              <div className="mt-3 p-2 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-700">
                  <strong>Favorite:</strong> {customer.favoriteService}
                </p>
              </div>
            )}

            {customer.notes && (
              <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{customer.notes}</p>
              </div>
            )}

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-purple-100 text-purple-700 py-2 px-3 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center justify-center">
                <Edit size={16} className="mr-1" />
                Edit
              </button>
              <button className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center justify-center">
                <Trash2 size={16} className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;