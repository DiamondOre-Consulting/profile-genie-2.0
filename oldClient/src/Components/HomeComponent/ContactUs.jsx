import React from 'react'
import bgvedio from '../../assets/bgvedio.mp4'

const ContactUs = () => {
    return (
        <>
            <div className="relative md:h-screen overflow-hidden" id='contact'>
                {/* Background Video */}
                <video
                    className="absolute  h-full object-cover w-full "
                    autoPlay
                    loop
                    muted
                >
                    <source src={bgvedio} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay Text */}
                <div className="relative z-10 flex items-start h-full">
                    <div className="text-white p-8 md:p-16 max-w-4xl ">
                        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-10 leading-snug ">Get a quote or set up a free consultation</h1>
                        <div className='flex flex-col '>
                            <p className='font-serif text-3xl'>PHONE</p>
                            <p className="text-[#DB4EC4] text-2xl font-semibold">8750315743</p>
                        </div>
                        <a className='flex flex-col  mt-10 cursor-pointer' href={`mailto:tech@doclabz.com`}>
                            <p className='font-serif text-3xl cursor-pointer'>Email</p>
                            <p className="text-[#DB4EC4] text-2xl font-semibold">tech@doclabz.com</p>
                        </a>

                        <div className='flex flex-col mt-10'>
                            <p className='font-serif text-3xl'>Social</p>
                            <div className='border border-1 mt-4 rounded -md border-white flex px-4 justify-between w-fit py-2'>
                                <a href='https://www.instagram.com/profile_genie_1' target='_blank'>  <svg class="h-8 w-8 text-[#DB4EC4] mr-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
                                <a> <svg class="h-8 w-8 text-[#DB4EC4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>

                            </div>

                        </div>
                        {/* <a href="#" className="mt-8 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Learn More</a> */}
                    </div>
                </div>

                {/* Overlay to Darken the Video */}
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
            </div>




        </>
    )
}

export default ContactUs