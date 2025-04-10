import React from 'react';

const ContactUs = ({myprofile}) => {

  const googleMapLink =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.151811838425!2d88.36053729999999!3d22.535985200000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277f532e2d439%3A0xc758122b4e0172e4!2sN%C3%AFyor%20Perfume%20Lab!5e0!3m2!1sen!2sin!4v1727247116642!5m2!1sen!2sin"
 
  return (
    
    <div className="py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
       
          <p className="mt-2 text-3xl leading-8 font-extrabold text-gray-900 sm:text-5xl npf">
           Contact Us
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
          Have any questions, concerns, or feedback? Feel free to get in touch with us, and our team will get back to you as soon as possible. We’re here to help!
          </p>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center  max-w-9xl mx-aut0">
          {/* Address */}
          <div className="flex items-start justify-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-c1 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Address
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                {myprofile?.brand?.brandAddress}
              </dd>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex items-start justify-start md:justify-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-c1 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Phone Number
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                {myprofile?.phone} , +91 87772 05051
              </dd>
             
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start justify-start md:justify-center">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-c1 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <dt className="text-lg leading-6 font-medium text-gray-900">
                Email
              </dt>
              <dd className="mt-2 text-base text-gray-500">
               {myprofile?.email}
              </dd>
            </div>
          </div>
        </div>


        {googleMapLink && (
          <div className="lg:text-center mt-10">
            <div className="relative w-full h-60 overflow-hidden">
              <iframe
                src={googleMapLink}
                className="absolute inset-0 w-full h-full border-0 rounded-md"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ContactUs;
