import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  AlertCircle,
  Heart,
  Activity,
  Thermometer,
  Pill,
  Phone,
  BookOpen,
  Clock,
  Star,
  Info,
  AlertTriangle,
  Clipboard,
  Shield,
  Clock3,
  
  Apple,
  
} from "lucide-react";
import { Alert} from "../components/ui/Alert";

const Card = ({ children, className = '', ...props }) => (
  <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const DiseaseInfo = () => {
  const location = useLocation();
  
  const { name = "Unknown Disease" } = location.state || {};

  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeSection, setActiveSection] = useState(null);
  const getColorClass = (color, type) => {
    const colorMap = {
      red: {
        bg: 'bg-red-50',
        hover: 'hover:bg-red-100',
        text: 'text-red-500',
        ring: 'ring-red-500'
      },
      blue: {
        bg: 'bg-blue-50',
        hover: 'hover:bg-blue-100',
        text: 'text-blue-500',
        ring: 'ring-blue-500'
      },
      green: {
        bg: 'bg-green-50',
        hover: 'hover:bg-green-100',
        text: 'text-green-500',
        ring: 'ring-green-500'
      },
      yellow: {
        bg: 'bg-yellow-50',
        hover: 'hover:bg-yellow-100',
        text: 'text-yellow-600',
        ring: 'ring-yellow-500'
      },
      purple: {
        bg: 'bg-purple-50',
        hover: 'hover:bg-purple-100',
        text: 'text-purple-500',
        ring: 'ring-purple-500'
      },
      pink: {
        bg: 'bg-pink-50',
        hover: 'hover:bg-pink-100',
        text: 'text-pink-500',
        ring: 'ring-pink-500'
      }
    };
    return colorMap[color][type];
  };

  const infoCards = [
    {
      id: 'symptoms',
      icon: <AlertCircle />,
      title: "Key Symptoms",
      description: "Common signs to watch for",
      color: "red"
    },
    {
      id: 'treatment',
      icon: <Pill />,
      title: "Treatment Options",
      description: "Available medical treatments",
      color: "blue"
    },
    {
      id: 'prevention',
      icon: <Shield />,
      title: "Prevention Strategies",
      description: "Ways to prevent and manage",
      color: "green"
    },
    {
      id: 'causes',
      icon: <Activity />,
      title: "Causes & Risk Factors",
      description: "Understanding the causes",
      color: "yellow"
    },
    {
      id: 'diet',
      icon: <Apple />,
      title: "Diet Guidelines",
      description: "Food recommendations",
      color: "purple"
    },
    {
      id: 'seek help',
      icon: <AlertTriangle />,
      title: "When to Seek Help",
      description: "Emergency warning signs",
      color: "pink"
    }
  ];

  // const diseaseCategories = [
  //   {
  //     id: "chronic",
  //     title: "Chronic Conditions",
  //     icon: <Activity className="w-8 h-8 text-blue-500" />,
  //     conditions: [
  //       {
  //         id: "diabetes",
  //         name: "Diabetes",
  //         icon: <Heart className="w-6 h-6" />,
  //       },
  //       {
  //         id: "hypertension",
  //         name: "Hypertension",
  //         icon: <Thermometer className="w-6 h-6" />,
  //       },
  //       {
  //         id: "arthritis",
  //         name: "Arthritis",
  //         icon: <AlertCircle className="w-6 h-6" />,
  //       },
  //     ],
  //   },
  //   {
  //     id: "infectious",
  //     title: "Infectious Diseases",
  //     icon: <Pill className="w-8 h-8 text-red-500" />,
  //     conditions: [
  //       {
  //         id: "covid",
  //         name: "COVID-19",
  //         icon: <Activity className="w-6 h-6" />,
  //       },
  //       {
  //         id: "flu",
  //         name: "Influenza",
  //         icon: <AlertCircle className="w-6 h-6" />,
  //       },
  //       { id: "hiv", name: "HIV/AIDS", icon: <Heart className="w-6 h-6" /> },
  //     ],
  //   },
  //   {
  //     id: "mental-health",
  //     title: "Mental Health",
  //     icon: <BookOpen className="w-8 h-8 text-purple-500" />,
  //     conditions: [
  //       {
  //         id: "depression",
  //         name: "Depression",
  //         icon: <Activity className="w-6 h-6" />,
  //       },
  //       {
  //         id: "anxiety",
  //         name: "Anxiety Disorders",
  //         icon: <AlertCircle className="w-6 h-6" />,
  //       },
  //       { id: "ptsd", name: "PTSD", icon: <Clock className="w-6 h-6" /> },
  //     ],
  //   },
  // ];

  useEffect(() => {
    if (name) {
      fetchDiseaseInfo();
    }
  }, [name]);

  const formatDiseaseInfo = (text) => {
    const result = [];

    // Regex to find section titles (including those with bold markers)
    const sectionTitles = text.match(/\*\*(\d+\.\s*[^:\*]+):\*\*/g);

    if (!sectionTitles) return result;

    sectionTitles.forEach((titleMatch, index) => {
      // Clean up the title
      const title = titleMatch.replace(/\*\*/g, "").trim();

      // Find the content for this section
      const startIndex = text.indexOf(titleMatch) + titleMatch.length;
      const nextTitleIndex = text.indexOf(
        sectionTitles[index + 1] || "###END###"
      );
      const sectionContent = text.slice(startIndex, nextTitleIndex).trim();

      // Handle Food Charts section
      if (title.includes("Food Charts")) {
        const foodSections = sectionContent.split(/\*\s*/).filter(Boolean);
        const processedFoodPoints = foodSections.map((section) => {
          const [category, itemsStr] = section.split(":").map((s) => s.trim());
          return {
            category,
            items: itemsStr
              ? itemsStr.split(",").map((item) => item.trim())
              : [],
          };
        });

        result.push({
          title,
          points: processedFoodPoints,
        });
      } else {
        // Extract points for other sections
        const points = [];
        const pointRegex = /\*\s*(.+?)(?=\n\*|\n\*\*|$)/gs;
        let match;

        while ((match = pointRegex.exec(sectionContent)) !== null) {
          const point = match[1].trim();
          if (point && point.length > 0) {
            points.push(point);
          }
        }

        // If no points found, try to capture the entire section content
        if (points.length === 0 && sectionContent.trim()) {
          points.push(sectionContent.trim());
        }

        result.push({
          title,
          points,
        });
      }
    });

    return result;
  };

  const fetchDiseaseInfo = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDLMLYA4plpDmizAwgOz4anPHlfHGjfxLI",
        method: "POST",
        data: {
          contents: [
            {
              parts: [
                {
                  text: `Provide a comprehensive, engaging description of ${name} with the following sections:
                
                1. Key Symptoms (in paragraph but of 2 to 3 lines only)
                2. Causes and Risk Factors (4 to 5 points)
                3. Treatment Options (4 to 5 points)
                4. Prevention Strategies (4 to 5 points)
                5. Diet (including avoiding Diet)
                6. When to Seek Help 
                
                Write in a compassionate, informative tone that helps patients understand the condition clearly.`,
                },
              ],
            },
          ],
        },
      });

      console.log(response);
      const text = response.data.candidates[0].content.parts[0].text;
      console.log(text);

      const formatInfo = formatDiseaseInfo(text);
      console.log(formatInfo);
      setDiseaseInfo(formatInfo);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching disease info:", error);
      setError("Failed to fetch disease information. Please try again later.");
      setLoading(false);
    }
  };

  const SectionIcon = ({ title }) => {
    const icons = {
      "Medical Overview": <Info className="w-6 h-6 text-blue-500" />,
      "Key Symptoms": <AlertTriangle className="w-6 h-6 text-amber-500" />,
      "Causes and Risk Factors": <Clipboard className="w-6 h-6 text-red-500" />,
      "Treatment Options": <Pill className="w-6 h-6 text-green-500" />,
      "Prevention Strategies": <Shield className="w-6 h-6 text-purple-500" />,
      "When to Seek Medical Help": (
        <Clock3 className="w-6 h-6 text-orange-500" />
      ),
    };
    return icons[title] || <Info className="w-6 h-6 text-blue-500" />;
  };

  // Emergency Hero Section
  const EmergencyNo = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg mb-8">
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="w-6 h-6 animate-pulse" />
          <h2 className="text-2xl font-bold">Medical Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <p className="font-bold">Emergency Services</p>
            <p className="text-2xl">911</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <p className="font-bold">Health Hotline</p>
            <p className="text-2xl">1-800-CDC-INFO</p>
          </div>
          <div className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
            <p className="font-bold">Mental Health</p>
            <p className="text-2xl">988</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Understanding {name}</h2>
          <p className="text-gray-600 mt-2">Comprehensive information and management tools</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <Alert variant="destructive">{error}</Alert>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {infoCards.map((card) => (
              <Card
                key={card.id}
                className={`group cursor-pointer transform transition-all duration-300
                  ${activeSection === card.id ? `ring-2 ${getColorClass(card.color, 'ring')} scale-[1.02]` : ''}
                  hover:shadow-lg hover:-translate-y-1`}
                onClick={() => setActiveSection(activeSection === card.id ? null : card.id)}
              >
                <CardHeader className={`p-4 ${getColorClass(card.color, 'bg')} ${getColorClass(card.color, 'hover')}`}>
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-2 rounded-full bg-white shadow-sm">
                      {React.cloneElement(card.icon, {
                        className: `w-6 h-6 ${getColorClass(card.color, 'text')}`
                      })}
                    </div>
                    <span className={`${getColorClass(card.color, 'text')} text-sm font-medium`}>
                      Click to expand
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="text-gray-600 text-sm">{card.description}</p>
                </CardHeader>

                {activeSection === card.id && diseaseInfo && (
                  <CardContent className="p-4 bg-white">
                    <div className="space-y-4">
                      {diseaseInfo
                        .filter(section => section.title.toLowerCase().includes(card.id))
                        .map((section, index) => (
                          <div key={index} className="space-y-2">
                            {section.points.map((point, pointIndex) => (
                              <div key={pointIndex} className="flex items-start gap-2">
                                <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                                <p className="text-gray-700 text-sm">{point}</p>
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
        
        <br />
        <br />
        <EmergencyNo />
      </div>
    </div>
  );


};

export default DiseaseInfo;
