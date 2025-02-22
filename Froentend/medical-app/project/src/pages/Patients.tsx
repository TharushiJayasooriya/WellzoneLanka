import React from 'react';
import { Search, Filter, Plus, Phone, Mail, MapPin } from 'lucide-react';

const Patients = () => {
  const patients = [
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 32,
      gender: 'Female',
      phone: '+1 (555) 123-4567',
      email: 'sarah.j@example.com',
      address: '123 Main St, New York, NY',
      lastVisit: '2024-03-15',
      condition: 'Hypertension',
    },
    {
      id: 2,
      name: 'Michael Chen',
      age: 45,
      gender: 'Male',
      phone: '+1 (555) 234-5678',
      email: 'michael.c@example.com',
      address: '456 Oak Ave, Boston, MA',
      lastVisit: '2024-03-18',
      condition: 'Diabetes',
    },
    {
      id: 3,
      name: 'Emma Davis',
      age: 28,
      gender: 'Female',
      phone: '+1 (555) 345-6789',
      email: 'emma.d@example.com',
      address: '789 Pine Rd, Chicago, IL',
      lastVisit: '2024-03-19',
      condition: 'Asthma',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </button>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium text-lg">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                <p className="text-sm text-gray-500">
                  {patient.age} years • {patient.gender}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                {patient.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                {patient.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {patient.address}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Visit</span>
                <span className="font-medium text-gray-900">{patient.lastVisit}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-500">Condition</span>
                <span className="font-medium text-gray-900">{patient.condition}</span>
              </div>
            </div>

            <button className="mt-4 w-full px-4 py-2 bg-gray-50 text-blue-600 rounded-lg hover:bg-gray-100 transition-colors">
              View Full Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patients;