import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AdmissionForm from '../components/AdmissionForm'

const PublicAdmission = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Admission Form</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Start your journey with us! Fill out the admission form to apply for your desired course.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/')}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              ← Back to Home
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Already Applied? Login
            </button>
          </div>
        </div>
      </div>

      {/* Admission Form Section */}
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🎓 Admission Application</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Please fill out all the required information accurately. This form will be used for your admission process.
                Make sure to have all necessary documents ready before starting.
              </p>
            </div>
            
            <AdmissionForm />
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              If you have any questions about the admission process or need assistance filling out the form, 
              please don't hesitate to contact us.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Call Us</h4>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">Mon-Fri, 9AM-5PM</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✉️</span>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Email Us</h4>
              <p className="text-gray-600">admissions@studenterp.edu</p>
              <p className="text-sm text-gray-500">24/7 Support</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Live Chat</h4>
              <p className="text-gray-600">Available Now</p>
              <p className="text-sm text-gray-500">Instant Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicAdmission
