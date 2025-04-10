import React from 'react'
import { Link } from 'react-router-dom';

const UMFooter = () => {
    const primaryTextColor = "#333333"; // Dark gray

    const socialMedias = {
  
      linkedin: "https://img.icons8.com/fluent/30/000000/facebook-new.png",
      instagram: "https://instagram.com/yourprofile",
     
    };
  
    return (
      <footer className="flex flex-col space-y-4 justify-center">
        {socialMedias && (
          <div className="flex justify-center items-center space-x-5 mt-4 ml-10 mr-10">
      
            {socialMedias.linkedin && (
              <a
                href={'https://www.facebook.com/people/Diamond-Ore-Consulting-Pvt-Ltd/61555444963500/?viewas&show_switched_toast=false&show_switched_tooltip=false&is_tour_dismissed=false&is_tour_completed=false&show_podcast_settings=false&show_community_review_changes=false&should_open_composer=false&badge_type=NEW_MEMBER&show_community_rollback_toast=false&show_community_rollback=false&show_follower_visibility_disclosure=false&bypass_exit_warning=true'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/fluent/30/000000/facebook-new.png"
                  alt="LinkedIn"
                />
              </a>
            )}
            {socialMedias.instagram && (
              <a
                href={'https://www.instagram.com/diamondoreconsultingpvtltd/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.icons8.com/fluent/30/000000/instagram-new.png"
                  alt="Instagram"
                />
              </a>
            )}
         
          </div>
        )}
        <p
          className="text-center font-medium pt-2"
          style={{ color: primaryTextColor }}
        >
          Designed and Developed by{" "}
          <Link
            to="https://profilegenie.in/"
            className="underline text-blue-600"
            target="_blank"
          >
            profilegenie.in
          </Link>
        </p>
        <p className="text-center font-medium pb-4 ">Contact us on +91 8750316743</p>
      </footer>
    );
  };
  

export default UMFooter
