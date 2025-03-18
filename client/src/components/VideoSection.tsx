

const VideoSection = () => {
    return (
        <div className="mb-6 flex items-center justify-center flex-col">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold  tracking-tight bg-clip-text inline-block leading-tight text-transparent bg-gradient-to-b from-white to-white/70">
                How it Works
            </h1>
            <section className="flex flex-col md:flex-row items-center justify-center p-10">
                <div className="bg-teal-300 w-[420px] h-[270px] overflow-hidden relative rounded-2xl p-6 shadow-lg flex items-center">
                    <video autoPlay muted loop playsInline src="https://videocdn.cdnpk.net/videos/950f85a4-1ca2-420f-bf7e-5d9b587ae45b/horizontal/previews/clear/small.mp4?token=exp=1742194212~hmac=637d232bc6944e94be85fca66afbfc0d588cbbc2aa8bd07e04af2153bd751af5" className="object-cover w-[380px] h-[240px] right-0 bottom-0 rounded-tl-xl absolute" />
                </div>
                <div className="md:ml-10 mt-6 md:mt-0 w-[40rem] text-center md:text-left">
                    <h2 className="sm:text-3xl text-2xl  font-bold  tracking-tight bg-clip-text inline-block leading-tight text-transparent bg-gradient-to-b from-white to-white/70">Transform static visuals with captivating animations</h2>
                    <p className="text-gray-300 mt-4 max-w-lg">
                        Get attention, enhance engagement, and significantly boost conversions by integrating motion into the visuals your team works on.
                    </p>
                </div>
            </section>
            <section className="flex flex-col md:flex-row-reverse items-center justify-center p-10">
                <div className="bg-teal-300 w-[420px] h-[270px] overflow-hidden relative rounded-2xl p-6 shadow-lg flex items-center">
                    <video autoPlay muted loop playsInline src="https://videocdn.cdnpk.net/videos/950f85a4-1ca2-420f-bf7e-5d9b587ae45b/horizontal/previews/clear/small.mp4?token=exp=1742194212~hmac=637d232bc6944e94be85fca66afbfc0d588cbbc2aa8bd07e04af2153bd751af5" className="object-cover w-[380px] h-[240px] left-0 bottom-0 rounded-tr-xl absolute" />
                </div>
                <div className="md:ml-10 mt-6 md:mt-0 w-[40rem] text-center md:text-left">
                    <h2 className="sm:text-3xl text-2xl  font-bold  tracking-tight bg-clip-text inline-block leading-tight text-transparent bg-gradient-to-b from-white to-white/70">Transform static visuals with captivating animations</h2>
                    <p className="text-gray-300 mt-4 max-w-lg">
                        Get attention, enhance engagement, and significantly boost conversions by integrating motion into the visuals your team works on.
                    </p>
                </div>
            </section>
            <section className="flex flex-col md:flex-row items-center justify-center p-10">
                <div className="bg-teal-300 w-[420px] h-[270px] overflow-hidden relative rounded-2xl p-6 shadow-lg flex items-center">
                    <video autoPlay muted loop playsInline src="https://videocdn.cdnpk.net/videos/950f85a4-1ca2-420f-bf7e-5d9b587ae45b/horizontal/previews/clear/small.mp4?token=exp=1742194212~hmac=637d232bc6944e94be85fca66afbfc0d588cbbc2aa8bd07e04af2153bd751af5" className="object-cover w-[380px] h-[240px] right-0 bottom-0 rounded-tl-xl absolute" />
                </div>
                <div className="md:ml-10 mt-6 md:mt-0 w-[40rem] text-center md:text-left">
                    <h2 className="sm:text-3xl text-2xl  font-bold  tracking-tight bg-clip-text inline-block leading-tight text-transparent bg-gradient-to-b from-white to-white/70">Transform static visuals with captivating animations</h2>
                    <p className="text-gray-300 mt-4 max-w-lg">
                        Get attention, enhance engagement, and significantly boost conversions by integrating motion into the visuals your team works on.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default VideoSection;
