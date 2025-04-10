import React, { useEffect, useState } from 'react';
import Home from '../../Components/YaadeinComponents/Home';
import vedio1 from "../../assets/1.mp4";
import vedio2 from "../../assets/2.mp4";
import vedio3 from "../../assets/3.mp4";
import vedio4 from "../../assets/4.mp4";
import vedio5 from "../../assets/5.mp4";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import About from '../../Components/YaadeinComponents/About';
import Message from '../../Components/YaadeinComponents/Message';
import Footer from '../../Components/YaadeinComponents/Footer';

const HomeMain = () => {
  const { uniqueUserName } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await axios.get(
          `https://api.profilegenie.in/api/admin/portfolio/${uniqueUserName}`
        );

        if (response.status === 200) {
          const data = response.data;
          setPortfolioData(data);
          console.log(response.data)
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError(error.message);
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [uniqueUserName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-center text-2xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <video src={vedio1} className="w-full" autoPlay muted loop></video>
        <video src={vedio2} className="w-full" autoPlay muted loop></video>
        <video src={vedio3} className="w-full" autoPlay muted loop></video>
        <video src={vedio4} className="w-full" autoPlay muted loop></video>
        <video src={vedio5} className="w-full" autoPlay muted loop></video>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-repeat-y"
        style={{
          backgroundImage: `url("https://myagent369.my.canva.site/shrimatiushajha/images/05de5da4d6bc265466249e4946381a3f.jpg")`,
          zIndex: -1,
        }}
      ></div>
      <div className="relative z-10">
        <Home portfolioData={portfolioData} />
        <About portfolioData={portfolioData} />
        <Message portfolioData={portfolioData} />
        <Footer portfolioData={portfolioData} />
      </div>
    </div>
  );
}

export default HomeMain;
