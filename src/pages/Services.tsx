import React, { useState, useEffect } from 'react';
import { Scissors, Plus, Clock, DollarSign, Star, Search, Filter, Edit, Trash2, TrendingUp, Users } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  category: string;
  image: string;
  popularity: number;
  rating: number;
  bookingsThisMonth: number;
  revenue: number;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [formData, setFormData] = useState({
    name: '', duration: '', price: '', description: '', category: ''
  });

  // Load sample data
  useEffect(() => {
    const sampleServices: Service[] = [
      {
        id: '1',
        name: 'Haircut & Styling',
        duration: 60,
        price: 45,
        description: 'Professional haircut with styling and blow-dry',
        category: 'Hair',
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        popularity: 95,
        rating: 4.8,
        bookingsThisMonth: 45,
        revenue: 2025
      },
      {
        id: '2',
        name: 'Hair Coloring',
        duration: 120,
        price: 85,
        description: 'Full hair coloring service with premium products',
        category: 'Hair',
        image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        popularity: 88,
        rating: 4.9,
        bookingsThisMonth: 32,
        revenue: 2720
      },
      {
        id: '3',
        name: 'Manicure & Nail Art',
        duration: 45,
        price: 35,
        description: 'Classic manicure with optional nail art designs',
        category: 'Nails',
        image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        popularity: 82,
        rating: 4.7,
        bookingsThisMonth: 38,
        revenue: 1330
      },
      {
        id: '4',
        name: 'Facial Treatment',
        duration: 90,
        price: 75,
        description: 'Relaxing facial treatment with deep cleansing',
        category: 'Skincare',
        image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        popularity: 76,
        rating: 4.6,
        bookingsThisMonth: 28,
        revenue: 2100
      },
      {
        id: '5',
        name: 'Eyebrow Shaping',
        duration: 30,
        price: 25,
        description: 'Professional eyebrow shaping and tinting',
        category: 'Beauty',
        image: 'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        popularity: 70,
        rating: 4.5,
        bookingsThisMonth: 22,
        revenue: 550
      },
      {
        id: '6',
        name: 'Deep Conditioning',
        duration: 45,
        price: 40,
        description: 'Intensive hair treatment for damaged hair',
        category: 'Hair',
        image: 'https://images.pexels.com/photos/3993456/pexels-photo-3993456.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        popularity: 65,
        rating: 4.4,
        bookingsThisMonth: 18,
        revenue: 720
      }
    ];
    setServices(sampleServices);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.duration && formData.price) {
      const newService: Service = {
        id: Date.now().toString(),
        name: formData.name,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        popularity: 0,
        rating: 0,
        bookingsThisMonth: 0,
        revenue: 0
      };
      setServices([...services, newService]);
      setFormData({ name: '', duration: '', price: '', description: '', category: '' });
      setShowAddForm(false);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'popular') return matchesSearch && service.popularity > 80;
    if (filterBy === 'hair') return matchesSearch && service.category === 'Hair';
    if (filterBy === 'nails') return matchesSearch && service.category === 'Nails';
    if (filterBy === 'skincare') return matchesSearch && service.category === 'Skincare';
    
    return matchesSearch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const totalRevenue = services.reduce((sum, service) => sum + service.revenue, 0);
  const totalBookings = services.reduce((sum, service) => sum + service.bookingsThisMonth, 0);
  const averageRating = services.reduce((sum, service) => sum + service.rating, 0) / services.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl animate-slideInDown">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Services Management</h1>
            <p className="text-purple-100">Manage your salon services and track their performance</p>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=2" 
              alt="Salon services" 
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
              <p className="text-gray-600 text-sm">Total Services</p>
              <p className="text-2xl font-bold text-gray-800">{services.length}</p>
            </div>
            <Scissors className="text-purple-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp animation-delay-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="text-green-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp animation-delay-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-800">{totalBookings}</p>
            </div>
            <Users className="text-blue-600" size={32} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInUp animation-delay-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Rating</p>
              <p className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</p>
            </div>
            <Star className="text-yellow-500" size={32} />
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
              placeholder="Search services..."
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
              <option value="all">All Services</option>
              <option value="popular">Popular Services</option>
              <option value="hair">Hair Services</option>
              <option value="nails">Nail Services</option>
              <option value="skincare">Skincare</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} />
          <span>Add Service</span>
        </button>
      </div>

      {/* Add Service Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 animate-slideInDown">
          <h3 className="text-lg font-semibold mb-4">Add New Service</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Service Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                <option value="Hair">Hair</option>
                <option value="Nails">Nails</option>
                <option value="Skincare">Skincare</option>
                <option value="Beauty">Beauty</option>
                <option value="Massage">Massage</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price ($)"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <textarea
              placeholder="Service Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                Add Service
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <div 
            key={service.id} 
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden animate-slideInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative">
              <img 
                src={service.image} 
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                  service.category === 'Hair' ? 'bg-purple-500' :
                  service.category === 'Nails' ? 'bg-pink-500' :
                  service.category === 'Skincare' ? 'bg-green-500' :
                  service.category === 'Beauty' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`}>
                  {service.category}
                </span>
              </div>
              {service.popularity > 80 && (
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <TrendingUp size={12} className="mr-1" />
                    Popular
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800 text-lg">{service.name}</h3>
                <div className="flex items-center space-x-1">
                  {renderStars(service.rating)}
                  <span className="text-sm text-gray-600 ml-1">({service.rating})</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock size={16} />
                  <span className="text-sm">{service.duration} min</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <DollarSign size={16} />
                  <span className="font-semibold text-lg">${service.price}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-600">{service.bookingsThisMonth}</p>
                  <p className="text-xs text-gray-600">Bookings</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">${service.revenue}</p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Popularity</span>
                  <span>{service.popularity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${service.popularity}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;