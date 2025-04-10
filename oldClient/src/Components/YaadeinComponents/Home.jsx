import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import frame from "../../assets/frame.png";
import translate from "translate";
import song from "../../assets/shri_ram_mere_ram.mp3";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ portfolioData }) => {
  const { name, tagline } = portfolioData;
  const logoUrl = portfolioData.profileImage;
  const [translatedName, setTranslatedName] = useState(name);
  const phone = "+918750316743"; 

  const handleWhatsAppChat = () => {
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phone
    )}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    // Function to handle translation
    const translateText = async (text) => {
      try {
        const translatedText = await translate(text, { to: "hi" });
        return translatedText;
      } catch (error) {
        console.error("Translation error:", error);
        return text; // Return the original text in case of an error
      }
    };

    // Fetch and set translations
    const fetchTranslations = async () => {
      const translatedName = await translateText(name);
      setTranslatedName(translatedName);
    };

    fetchTranslations();
  }, [name]);

  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMuted(false); // Unmute after starting
      }).catch(error => {
        console.error("Failed to play audio:", error);
      });
    }
  }, []);
  
  

  return (
    <div>
      
        <div className="relative flex flex-col md:flex-row md:justify-between  items-center py-10 md:py-0 max-w-7xl mx-auto">
            <div className="md:ml-20 px-4 md:px-0 flex flex-col text-center md:text-left">
                <div>
                    <p className="text-2xl md:text-4xl">प्रेम और सेवा की अनमोल विरासत</p>
                    <p className="text-3xl md:text-5xl mt-10 md:mt-20">स्वर्गीय {translatedName}</p>
                    <p className="text-xl md:text-3xl mt-2 md:mt-4">{tagline}</p>
                </div>

                <div className="flex flex-col space-y-4 mt-6 md:mt-8">
                    <button
                        className="underline border border-2 border-gray-600 py-1"
                        onClick={handleWhatsAppChat}
                    >
                        श्रद्धांजलि अर्पित करें
                    </button>
                    <button
                        className="underline border border-2 border-gray-600 py-1 uppercase"
                        onClick={handleWhatsAppChat}
                    >
                        Offer Your Tribute
                    </button>
                </div>
            </div>

            <div className="flex justify-center mt-8 md:mt-0">
                <img src={frame} alt="" className="w-[500px] md:w-[400px] lg:w-[700px] relative z-50" />
                <img
                    src={logoUrl}
                    className="absolute w-[170px] md:w-[200px] lg:w-[290px] md:top-[150px] md:right-[340px] z-40 right-[50%] translate-x-[50%] bottom-[120px] md:bottom-[0] md:top-[0]"
                    alt=""
                />
            </div>
        </div>
        
        <div className="fixed bottom-4 right-4 z-50">
            <audio ref={audioRef} src={song} loop autoPlay muted={isMuted} />
            <button
                onClick={toggleMute}
                className="p-2 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                {isMuted ? (
                    <svg
                        className="h-8 w-8 text-gray-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                    </svg>
                ) : (
                    <svg
                        className="h-8 w-8 text-gray-900"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                    </svg>
                )}
            </button>
        </div>
    </div>
);

};

export default Home;
