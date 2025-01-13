import React from 'react'
import { Shield, Heart, Users, ArrowRight } from 'lucide-react';
const Userdashboard = () => {
  return (
   
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white rounded-md">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
            alt="Women supporting women"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              Sahasi She
            </h1>
            <p className="text-xl md:text-2xl text-blue-700 mb-8">
              Empowering women to rise, thrive, and lead together
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto gap-2">
              Join Our Community <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Safe Space</h3>
            <p className="text-blue-700">A protected environment where women can share, learn, and grow together</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Support Network</h3>
            <p className="text-blue-700">Connect with mentors and peers who understand your journey</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Community</h3>
            <p className="text-blue-700">Join a thriving community of strong, ambitious women</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#5332ca] text-white py-16 rounded-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of women who are already part of our community. Together, we're stronger.
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-200">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
    
  )
}

export default Userdashboard
