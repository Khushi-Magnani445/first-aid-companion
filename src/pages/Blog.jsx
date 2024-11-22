// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import dotenv from 'dotenv'; // Assuming you're using dotenv for env variables

// dotenv.config(); 
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("process.env.AIzaSyCftGY1ufnn-5xXi1jTFOF4X5GtWx7Acew");
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());
// const Blog = () => {
//   const { emergencyId } = useParams(); // Get the emergency ID from the URL
//   const [blogContent, setBlogContent] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchContent = async () => {
//       try {
//         // Example API call (replace with Chrome's Write API)
//         const response = await axios.post(
//             "https://developer.chrome.com/docs/ai/built-in#benefits",
//           {
//             prompt: `Write a detailed blog about ${emergencyId}.`,
//           },
//           {
//             headers: {
//               Authorization: `AIzaSyCftGY1ufnn-5xXi1jTFOF4X5GtWx7Acew`,
//             },
//           }
//         );
//         setBlogContent(response.data.content);
//       } catch (error) {
//         console.error("Error fetching content:", error);
//         setBlogContent("Sorry, we couldn't fetch the blog content.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContent();
//   }, [emergencyId]);

//   return (
//     <div className="p-6">
//       {loading ? (
//         <p>Loading content...</p>
//       ) : (
//         <div>
//           <h1 className="text-3xl font-bold mb-4 capitalize">{emergencyId}</h1>
//           <p className="text-gray-700">{blogContent}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Blog;
