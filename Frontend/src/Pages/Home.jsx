import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdmissionForm from '../components/AdmissionForm'
import HostelForm from '../components/HostelForm'

const Home = () => {
  const navigate = useNavigate()
  const [activeForm, setActiveForm] = useState('admission')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">College ERP</h1>
          <nav className="flex items-center gap-4">
            <button
              onClick={() => setActiveForm('admission')}
              className={`${activeForm === 'admission' ? 'bg-blue-600 text-white' : 'border border-blue-600 text-blue-600'} px-4 py-2 rounded hover:bg-blue-700 hover:text-white`}
            >
              Admission Form
            </button>
            <button
              onClick={() => setActiveForm('hostel')}
              className={`${activeForm === 'hostel' ? 'bg-blue-600 text-white' : 'border border-blue-600 text-blue-600'} px-4 py-2 rounded hover:bg-blue-700 hover:text-white`}
            >
              Hostel Form
            </button>
          </nav>
          <div className="space-x-3">
            <button onClick={() => navigate('/login')} className="px-4 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50">Login</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        

        {/* Forms Section (toggle by navbar links) */}
        <section className="">
          {activeForm === 'admission' && (
            <div className="bg-white rounded-lg shadow p-4">
              <AdmissionForm />
            </div>
          )}
          {activeForm === 'hostel' && (
            <div className="bg-white rounded-lg shadow p-4">
              <HostelForm />
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} College ERP. All rights reserved.
      </footer>
    </div>
  )
}

export default Home