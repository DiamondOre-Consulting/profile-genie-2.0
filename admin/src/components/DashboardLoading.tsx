import video from '../assets/loading.webm'

const DashboardLoading = () => {
    return (
        <div className='w-screen flex items-center justify-center h-screen bg-[#010101]'>
            <video playsInline autoPlay loop muted src={video} className='mb-10'></video>
        </div>
    )
}

export default DashboardLoading
