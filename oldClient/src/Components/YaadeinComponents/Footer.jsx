import React from "react";
import logo from "../../assets/QR~Genie logo.png";

const Footer = ({portfolioData}) => {
  const phone = "+918750316743"; 
    const handleWhatsAppChat = () => {
        const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
          phone
        )}`;
        window.open(url, "_blank");
      };
    
  return (
    <div className=" bg-[#DDD0BE] py-20 px-10 md:px-20">
      <p className="text-4xl leading-relaxed">
        आइए अपनों की यादों की धरोहर को मिलकर संजोने का प्रयास करें। हमारे साथ
        ​जुड़ें और अपने प्रियजनों की कहानियों और संस्कारों को जीवित रखें, ताकि
        ​उनका अमूल्य योगदान सदैव हमारे दिलों में बसा रहे।
      </p>

      <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 justify-center md:justify-between items-center px-10 mt-20">
        <div>
          <p className="font-bold text-2xl">EMAIL</p>
          <p className="font-semibold text-xl">admin@cvgenie.in</p>
        </div>

        <div>
          <p className="font-bold text-2xl">PHONE</p>
          <p className="font-semibold text-xl">+91 8750316743</p>
        </div>

        <div className="flex items-center">
          <img src={logo} alt="" className="w-20" />
          <span className="text-5xl md:text-8xl ml-4 text-gray-800">Yaaदें</span>
        </div>
      </div>

      <div className=" mt-10 mb-10">
        <p className="text-4xl">Got questions, or want to explore options?</p>
        <p className="text-4xl">I'm more than happy to get in touch!</p>

       
      </div>
      <span className="border border-1 border-gray-800 underline  px-10 py-3 cursor-pointer" onClick={handleWhatsAppChat}>SCHEDULE A CALL</span>
    </div>
  );
};

export default Footer;
