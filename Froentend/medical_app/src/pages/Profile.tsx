import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';

const Profile = () => {
  const doctorProfile = {
    name: 'Dr. Emily White',
    specialization: 'Cardiologist',
    experience: '12 years',
    email: 'dr.emily@medicare.com',
    phone: '+1 (555) 123-4567',
    address: '789 Medical Center Blvd, New York, NY',
    education: [
      {
        degree: 'MD in Cardiology',
        institution: 'Harvard Medical School',
        year: '2012',
      },
      {
        degree: 'MBBS',
        institution: 'Johns Hopkins University',
        year: '2008',
      },
    ],
    certifications: [
      'American Board of Internal Medicine',
      'Certified Cardiologist',
      'Advanced Cardiac Life Support',
    ],
    schedule: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 1:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-6">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-bold text-2xl">
              {doctorProfile.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{doctorProfile.name}</h1>
            <p className="text-lg text-gray-600">{doctorProfile.specialization}</p>
            <div className="flex items-center mt-2 text-gray-600">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>{doctorProfile.experience} of experience</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="flex items-center text-gray-600">
            <Mail className="h-5 w-5 mr-2" />
            {doctorProfile.email}
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="h-5 w-5 mr-2" />
            {doctorProfile.phone}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-2" />
            {doctorProfile.address}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <GraduationCap className="h-6 w-6 mr-2" />
          Education
        </h2>
        <div className="space-y-4">
          {doctorProfile.education.map((edu, index) => (
            <div key={index} className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-blue-600 mt-2 mr-4"></div>
              <div>
                <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Award className="h-6 w-6 mr-2" />
          Certifications
        </h2>
        <div className="space-y-2">
          {doctorProfile.certifications.map((cert, index) => (
            <div key={index} className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-600 mr-4"></div>
              <span className="text-gray-700">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          Weekly Schedule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(doctorProfile.schedule).map(([day, hours]) => (
            <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="capitalize text-gray-700">{day}</span>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {hours}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;