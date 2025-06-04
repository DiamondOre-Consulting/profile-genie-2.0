const VideoSection = () => {
  return (
    <div className="mb-6 flex items-center justify-center flex-col w-[97vw] mx-auto max-w-7xl">
      <h1 className="inline-block text-3xl font-bold leading-tight tracking-tight text-transparent sm:text-4xl md:text-5xl bg-clip-text bg-gradient-to-b from-white to-yellow-200">
        How it Works
      </h1>
      <section className="flex flex-col items-center justify-center w-full mt-4 md:flex-row">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="https://videocdn.cdnpk.net/videos/950f85a4-1ca2-420f-bf7e-5d9b587ae45b/horizontal/previews/clear/small.mp4?token=exp=1742194212~hmac=637d232bc6944e94be85fca66afbfc0d588cbbc2aa8bd07e04af2153bd751af5"
          className="object-cover  w-full h-[240px] right-0 bottom-0 rounded-tl-xl"
        />
        <div className="mt-6 text-center md:mt-0 md:text-left">
          <h2 className="inline-block text-2xl font-bold leading-tight tracking-tight text-transparent sm:text-3xl bg-clip-text bg-gradient-to-b from-white to-white/70">
            Transform static visuals with captivating animations
          </h2>
          <p className="max-w-lg mt-4 text-gray-300">
            Get attention, enhance engagement, and significantly boost
            conversions by integrating motion into the visuals your team works
            on.
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full p-10 md:flex-row-reverse">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="https://videocdn.cdnpk.net/videos/950f85a4-1ca2-420f-bf7e-5d9b587ae45b/horizontal/previews/clear/small.mp4?token=exp=1742194212~hmac=637d232bc6944e94be85fca66afbfc0d588cbbc2aa8bd07e04af2153bd751af5"
          className="object-cover  w-full h-[240px] right-0 bottom-0 rounded-tl-xl"
        />
        <div className="w-full mt-6 text-center md:mt-0 md:text-left">
          <h2 className="inline-block text-2xl font-bold leading-tight tracking-tight text-transparent sm:text-3xl bg-clip-text bg-gradient-to-b from-white to-white/70">
            Transform static visuals with captivating animations
          </h2>
          <p className="max-w-lg mt-4 text-gray-300">
            Get attention, enhance engagement, and significantly boost
            conversions by integrating motion into the visuals your team works
            on.
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full gap-10 p-10 md:flex-row">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="https://videocdn.cdnpk.net/videos/950f85a4-1ca2-420f-bf7e-5d9b587ae45b/horizontal/previews/clear/small.mp4?token=exp=1742194212~hmac=637d232bc6944e94be85fca66afbfc0d588cbbc2aa8bd07e04af2153bd751af5"
          className="object-cover  w-full h-[240px] right-0 bottom-0 rounded-tl-xl"
        />
        <div className="w-full mt-6 text-center md:mt-0 md:text-left">
          <h2 className="inline-block text-2xl font-bold leading-tight tracking-tight text-transparent sm:text-3xl bg-clip-text bg-gradient-to-b from-white to-white/70">
            Transform static visuals with captivating animations
          </h2>
          <p className="max-w-lg mt-4 text-gray-300">
            Get attention, enhance engagement, and significantly boost
            conversions by integrating motion into the visuals your team works
            on.
          </p>
        </div>
      </section>
    </div>
  );
};

export default VideoSection;
