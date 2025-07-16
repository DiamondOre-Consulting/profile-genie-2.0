// import { useState, useRef, useEffect } from "react";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm Profile Genie's assistant. How can I help you today?",
//       sender: "bot",
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   // Scroll to bottom whenever messages change
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const quickQuestions = [
//     "What is Profile Genie?",
//     "How do digital profiles work?",
//     "Tell me about NFC cards",
//     "What are the pricing options?",
//     "How is this better than business cards?",
//     "Can I update my profile later?",
//   ];

//   const handleSendMessage = () => {
//     if (inputValue.trim() === "") return;

//     const userMessage = {
//       id: Date.now(),
//       text: inputValue,
//       sender: "user",
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue("");

//     setTimeout(() => {
//       const botResponse = generateBotResponse(inputValue);
//       setMessages((prev) => [...prev, botResponse]);
//     }, 800);
//   };

//   const handleQuickQuestion = (question) => {
//     const userMessage = {
//       id: Date.now(),
//       text: question,
//       sender: "user",
//     };
//     setMessages((prev) => [...prev, userMessage]);

//     setTimeout(() => {
//       const botResponse = generateBotResponse(question);
//       setMessages((prev) => [...prev, botResponse]);
//     }, 300);
//   };

//   const generateBotResponse = (userInput) => {
//     const input = userInput.toLowerCase();
//     let responseText = "";

//     if (
//       input.includes("what is profile genie") ||
//       input.includes("about profile genie")
//     ) {
//       responseText =
//         "Profile Genie provides digital identity solutions for professional networking. We offer: \n\n• Digital profiles with all your professional information\n• NFC/QR smart cards for physical sharing\n• Instant contact sharing\n• Eco-friendly alternative to paper cards\n• Lead conversion tools";
//     } else if (
//       input.includes("digital profile") ||
//       input.includes("how do digital profiles work")
//     ) {
//       responseText =
//         "Our digital profiles are all-in-one professional identities that you can share instantly:\n\n• Create once, share anywhere\n• Includes contact info, social links, bio\n• Always up-to-date\n• No app required for recipients\n• Analytics on profile views\n• WhatsApp integration for quick follow-ups";
//     } else if (input.includes("nfc") || input.includes("smart card")) {
//       responseText =
//         "Our NFC/QR smart cards:\n\n• Tap or scan to share your profile instantly\n• Premium materials: metal, polycarbonate\n• No batteries needed\n• Free lifetime profile updates\n• Works with all smartphones\n• Customizable designs available\n• Your last business card ever";
//     } else if (input.includes("price") || input.includes("cost")) {
//       responseText =
//         "Pricing options:\n\n• Digital Profile: Free forever\n• Basic NFC Card: ₹499 (pack of 5)\n• Premium Metal Card: ₹999\n• Executive Bundle: ₹1,499 (3 metal cards + keychain)\n\nAll physical cards include unlimited digital profile updates.";
//     } else if (
//       input.includes("better than business cards") ||
//       input.includes("advantage")
//     ) {
//       responseText =
//         "Why choose Profile Genie:\n\n✅ Never run out of cards\n✅ Update info anytime\n✅ Track who viewed your profile\n✅ Share more than paper allows\n✅ Environmentally friendly\n✅ Makes great first impression\n✅ Works 24/7 without reprinting";
//     } else if (input.includes("update") || input.includes("change")) {
//       responseText =
//         "Profile updates are simple:\n\n1. Edit your digital profile anytime\n2. Changes appear immediately\n3. No need to replace physical cards\n4. Free unlimited updates\n5. All previous shares stay current\n\nYour NFC/QR cards will always show your latest info.";
//     } else if (input.includes("hi") || input.includes("hello")) {
//       responseText =
//         "Hello! Try clicking any question below or ask me anything about Profile Genie's digital profiles and smart cards.";
//     } else {
//       responseText =
//         "I can help with:\n\n• Creating digital profiles\n• Choosing NFC cards\n• Pricing information\n• Profile management\n• Business advantages\n\nTry clicking a question or ask in your own words.";
//     }

//     return {
//       id: Date.now(),
//       text: responseText,
//       sender: "bot",
//     };
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSendMessage();
//     }
//   };

//   // Check if we should show quick questions
//   const shouldShowQuickQuestions =
//     messages.length > 0 &&
//     messages[messages.length - 1].sender === "bot" &&
//     !quickQuestions.some((q) => messages.some((m) => m.text === q));

//   return (
//     <div className="fixed z-50 bottom-6 right-6">
//       {isOpen ? (
//         <div className="w-80 h-[500px] bg-gray-900 rounded-lg shadow-xl flex flex-col border border-gray-700 overflow-hidden">
//           {/* Chat header */}
//           <div className="flex items-center justify-between p-4 text-white bg-gray-800 rounded-t-lg">
//             <div className="flex items-center space-x-2">
//               <div className="w-3 h-3 bg-green-400 rounded-full"></div>
//               <h3 className="font-semibold">Profile Genie Assistant</h3>
//             </div>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-gray-400 hover:text-white"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-5 h-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Messages area */}
//           <div
//             ref={chatContainerRef}
//             className="flex-1 p-4 overflow-y-auto"
//             style={{
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//               scrollBehavior: "smooth",
//             }}
//           >
//             <div className="space-y-4">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${
//                     message.sender === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//                       message.sender === "user"
//                         ? "bg-indigo-600 text-white rounded-br-none"
//                         : "bg-gray-700 text-gray-100 rounded-bl-none"
//                     }`}
//                   >
//                     {message.text.split("\n").map((paragraph, i) => (
//                       <p key={i} className="mb-2">
//                         {paragraph}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//               {shouldShowQuickQuestions && (
//                 <div className="mt-4">
//                   <p className="mb-2 text-xs text-gray-400">QUICK QUESTIONS</p>
//                   <div className="grid grid-cols-2 gap-2">
//                     {quickQuestions.map((question, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleQuickQuestion(question)}
//                         className="px-3 py-2 text-xs text-left text-gray-300 transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
//                       >
//                         {question}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           {/* Input area */}
//           <div className="p-4 border-t border-gray-700">
//             <div className="flex">
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Type your message..."
//                 className="flex-1 px-4 py-2 text-gray-200 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="px-4 py-2 text-white bg-indigo-600 rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <button>
//           <div className="relative">
//             <iframe
//               src="https://my.spline.design/greetingrobot-wPb20PaGBuFW6MLjsEHmqAMC/"
//               width="165%"
//               height="150%"
//               onClick={() => setIsOpen(true)}
//             ></iframe>
//             <div
//               onClick={() => setIsOpen(true)}
//               className="absolute top-0 w-[50%] right-0 h-full bg-transparent"
//             ></div>
//           </div>
//         </button>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
