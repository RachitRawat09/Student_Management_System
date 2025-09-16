import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const courses = [
    {
      id: 1,
      title: "Computer Science",
      description: "Advanced programming, AI, and software development",
      duration: "4 Years",
      icon: "💻"
    },
    {
      id: 2,
      title: "Business Administration",
      description: "Management, marketing, and entrepreneurship",
      duration: "3 Years",
      icon: "📊"
    },
    {
      id: 3,
      title: "Engineering",
      description: "Civil, Mechanical, and Electrical engineering",
      duration: "4 Years",
      icon: "⚙️"
    },
    {
      id: 4,
      title: "Medicine",
      description: "Pre-medical and medical sciences",
      duration: "5 Years",
      icon: "🏥"
    },
    {
      id: 5,
      title: "Arts & Humanities",
      description: "Literature, history, and cultural studies",
      duration: "3 Years",
      icon: "🎨"
    },
    {
      id: 6,
      title: "Science",
      description: "Physics, Chemistry, Biology, and Mathematics",
      duration: "3 Years",
      icon: "🔬"
    }
  ]

  const admissionSteps = [
    { step: 1, title: "Apply Online", description: "Fill out the application form with your details" },
    { step: 2, title: "Submit Documents", description: "Upload required certificates and transcripts" },
    { step: 3, title: "Entrance Exam", description: "Take the admission test (if required)" },
    { step: 4, title: "Interview", description: "Attend the personal interview session" },
    { step: 5, title: "Get Admitted", description: "Receive admission confirmation and pay fees" }
  ]

  const facilities = [
    { name: "Modern Classrooms", icon: "🏫", description: "Smart classrooms with latest technology" },
    { name: "Library", icon: "📚", description: "Extensive collection of books and digital resources" },
    { name: "Laboratories", icon: "🧪", description: "Well-equipped labs for practical learning" },
    { name: "Sports Complex", icon: "⚽", description: "Indoor and outdoor sports facilities" },
    { name: "Cafeteria", icon: "🍽️", description: "Healthy and delicious meals" },
    { name: "WiFi Campus", icon: "📶", description: "High-speed internet throughout campus" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
          }}
        ></div>
        
        <div className={`relative z-20 text-center text-white px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Excellence in Education
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Empowering students with world-class education, cutting-edge facilities, and endless opportunities for growth and success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/admission')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Apply Now
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Student Login
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Our Institution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional education that prepares students for the challenges of tomorrow.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Academic Excellence</h3>
              <p className="text-gray-600">
                World-class faculty and curriculum designed to meet industry standards and prepare students for global challenges.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌟</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Holistic Development</h3>
              <p className="text-gray-600">
                We focus on developing not just academic skills but also leadership, creativity, and character building.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Future Ready</h3>
              <p className="text-gray-600">
                Cutting-edge technology and modern teaching methods to prepare students for the digital age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Offered Section */}
      <section id="courses" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Courses Offered</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of programs designed to meet your career aspirations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div 
                key={course.id}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-pointer`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{course.icon}</div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-semibold">{course.duration}</span>
                  <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Admission Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple and transparent admission process to help you join our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {admissionSteps.map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  {index < admissionSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => navigate('/admission')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Application
            </button>
          </div>
        </div>
      </section>

      {/* Hostel & Facilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Hostel & Facilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern accommodation and world-class facilities for a comfortable learning environment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{facility.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{facility.name}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/hostel')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View Hostel Details
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4">Student ERP</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering students with comprehensive educational management solutions and world-class facilities.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-sm">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <span className="text-sm">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                  <span className="text-sm">i</span>
                </a>
                <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                  <span className="text-sm">in</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Admissions</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Courses</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Facilities</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="mr-3">📍</span>
                  <span className="text-gray-300">123 Education Street, Learning City, LC 12345</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">📞</span>
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">✉️</span>
                  <span className="text-gray-300">info@studenterp.edu</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Student ERP. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home