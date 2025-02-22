import React from 'react';
import { 
  Users, 
  Calendar, 
  Activity, 
  Clock,
  TrendingUp 
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Patients', value: '1,284', icon: Users, trend: '+12%' },
    { label: 'Appointments Today', value: '32', icon: Calendar, trend: '+5%' },
    { label: 'Active Treatments', value: '48', icon: Activity, trend: '+8%' },
    { label: 'Avg. Wait Time', value: '12min', icon: Clock, trend: '-10%' },
  ];

  const upcomingAppointments = [
    { id: 1, patient: 'Sarah Johnson', time: '09:00 AM', type: 'Check-up' },
    { id: 2, patient: 'Michael Chen', time: '10:30 AM', type: 'Follow-up' },
    { id: 3, patient: 'Emma Davis', time: '11:45 AM', type: 'Consultation' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <span className="flex items-center text-sm font-medium text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {stat.trend}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Upcoming Appointments
        </h2>
        <div className="divide-y divide-gray-100">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="py-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {appointment.patient.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{appointment.patient}</p>
                  <p className="text-sm text-gray-600">{appointment.type}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">{appointment.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;