import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  AlertCircle, 
  Heart, 
  Activity, 
  Thermometer, 
  Pill, 
  Search,
  Shield,
  Stethoscope,
  X
} from 'lucide-react';

const LearnMore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const emergencies = [
    {
      id: 'urgent',
      title: 'Urgent Emergencies',
      icon: <AlertCircle className="w-12 h-12 text-red-500" />,
      color: "red",
      emergencies: [/* ... same emergencies array as before ... */]
    },
    {
      id: 'medical',
      title: 'Medical Conditions',
      icon: <Stethoscope className="w-12 h-12 text-blue-500" />,
      color: "blue",
      emergencies: [/* ... same emergencies array as before ... */]
    }
  ];

  const handleLearnMore = (diseaseName) => {
    navigate("/disease-info", { 
      state: { 
        name: diseaseName, 
        id: Date.now()
      } 
    });
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setIsLoading(true);
      try {
        const response = await axios({
          url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDLMLYA4plpDmizAwgOz4anPHlfHGjfxLI",
          method: 'POST',
          data: {
            contents: [
              {parts: [{text: `Provide a very brief, engaging 4-5 word description for ${searchQuery}.`}]},
            ],
          },
        });
        
        const requestedQuery = response['data']['candidates'][0]['content']['parts'][0].text;
        
        const newCard = {
          id: Date.now(),
          title: searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1),
          description: requestedQuery || "No description available.",
          gradient: getRandomGradient(),
          icon: <Stethoscope className="w-8 h-8 text-emerald-400" />
        };
        
        setSearchHistory(prev => [newCard, ...prev]);
        setSearchQuery("");
      } catch (error) {
        console.error("Error fetching data:", error);
        const errorCard = {
          id: Date.now(),
          title: "Error",
          description: "Unable to fetch data. Please try again later.",
          gradient: "from-gray-50 to-gray-100",
          icon: <AlertCircle className="w-8 h-8 text-gray-400" />
        };
        setSearchHistory(prev => [errorCard, ...prev]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      "from-green-50 to-emerald-100",
      "from-blue-50 to-indigo-100",
      "from-purple-50 to-violet-100",
      "from-pink-50 to-rose-100",
      "from-yellow-50 to-amber-100"
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const removeSearch = (id) => {
    setSearchHistory(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 min-h-screen">
      
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Stethoscope className="w-10 h-10 text-blue-600" />
          <h2 className="text-4xl font-bold text-center text-blue-900">
            Health Insights Hub
          </h2>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for diseases, conditions, or health topics (Press Enter to search)"
              className="w-full px-6 py-4 pr-12 text-lg border-2 border-blue-200 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 bg-white/90 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {isLoading ? (
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <Search 
                className="w-6 h-6 absolute right-5 top-1/2 transform -translate-y-1/2 text-blue-400"
              />
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchHistory.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Search Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchHistory.map((result) => (
                <div
                  key={result.id}
                  className={`bg-gradient-to-br ${result.gradient} p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2 border border-white/50 backdrop-blur-sm relative`}
                >
                  <button
                    onClick={() => removeSearch(result.id)}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-white/80 rounded-lg shadow-sm">
                      {result.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {result.description}
                  </p>
                  <button 
                    onClick={() => handleLearnMore(result.title)}
                    className="w-full px-4 py-3 bg-white/90 text-gray-700 rounded-lg hover:bg-white transition duration-300 shadow-sm hover:shadow flex items-center justify-center gap-2"
                  >
                    Learn More
                    <Activity className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Original Categories */}
        {emergencies.map((category) => (
          <div key={category.id} className="mb-8">
            {/* ... rest of the original categories rendering ... */}
          </div>
        ))}

        {/* Footer Section */}
        <div className="mt-16 text-center bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/50">
          {/* ... footer content ... */}
        </div>
      </div>
    </div>
  );
};

export default LearnMore;