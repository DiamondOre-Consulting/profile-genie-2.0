import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({portfolioData}) => {
  return (
    <footer className="flex flex-col  justify-center">
    {portfolioData?.socialMedias && (
      <div className="flex justify-center items-center space-x-5 mt-4 ml-10 mr-10">
        {portfolioData?.socialMedias?.facebook && (
          <a
            href={portfolioData.socialMedias.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
              alt="Facebook"
            />
          </a>
        )}
        {portfolioData?.socialMedias?.linkedin && (
          <a
            href={portfolioData.socialMedias.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/30/000000/linkedin-2.png"
              alt="LinkedIn"
            />
          </a>
        )}
        {portfolioData?.socialMedias?.instagram && (
          <a
            href={portfolioData.socialMedias.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
              alt="Instagram"
            />
          </a>
        )}
        {portfolioData?.socialMedias?.twitter && (
          <a
            href={portfolioData.socialMedias.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/fluent/30/000000/twitter.png"
              alt="Twitter"
            />
          </a>
        )}

        {portfolioData?.socialMedias?.website && (
          <a
            href={portfolioData?.socialMedias?.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=9918&format=png&color=000000"
              alt="website"
              className="w-7"
            />
          </a>
        )}
      </div>
    )}
    <p
      className="text-center text-gray-900 font-medium pt-2"
 
    >
      Designed and Developed by{" "}
      <Link
        to={"https://profilegenie.in/"}
        className="underline text-blue-600"
        target="_blank"
      >
        profilegenie.in
      </Link>
      
    </p>

    <p className="text-center text-gray-900 font-medium pb-4 ">Contact us on +91 8750316743</p>
  </footer>
  )
}

export default Footer
