import React from 'react';
import { Link } from 'react-scroll';

import { ArrowDown, Phone, BookOpen } from 'lucide-react';
import "../App.css"; // Replace with your actual image path
// Replace with your
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white app-container">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-blue-600">
            First Aid Companion
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Your trusted companion for emergency first aid guidance, always ready when you need it most
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="learn-more"
            spy={true}
            smooth={true}
            duration={500}
          >
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg">
              <BookOpen className="mr-2 h-5 w-5" />
              Learn More
            </button>
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white border-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-lg">
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </button>
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16 animate-bounce">
        <Link
            to="learn-more"
            spy={true}
            smooth={true}
            duration={500}
          >
          <ArrowDown className="h-8 w-8 text-blue-600 cursor-pointer" />
          </Link>
        </div>
      </div>
      
      
      
    </div>
  );
}
