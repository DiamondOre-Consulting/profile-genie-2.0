// import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { Footer } from '@/components/ui/footer'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='bg-[#0c0d17]'>
            <div className="bg-transparent top-0 z-[1000] fixed  left-1/2 transform -translate-x-1/2 mx-auto flex justify-center items-center py-3">
                <div className={"bg-black/90 backdrop-blur-sm w-[95vw] max-w-[80rem] text-[0.9rem] font-[400] border border-neutral-800 text-white rounded-lg px-2 py-2 shadow-md "}>
                    <nav className="flex gap-2 w-fit mx-auto">
                        <Link to="/" className="px-4 py-1 transition duration-300 rounded-full hover:bg-lightGray hover:text-gray-200">Home</Link>
                        <Link to="/" className="px-4 py-1 transition duration-300 rounded-full hover:bg-lightGray hover:text-gray-200">About</Link>
                        <Link to="/" className="px-4 py-1 transition duration-300 rounded-full hover:bg-lightGray hover:text-gray-200">Projects</Link>
                        <Link to="/" className="px-4 py-1 transition duration-300 rounded-full hover:bg-lightGray hover:text-gray-200">Contact</Link>
                        <Link to="/" className="Btn">Hire me</Link>
                    </nav>
                </div>

            </div>
            <div className='bg-transparent'>{children}</div>
            <Footer />
        </div>
    )
}

export default HomeLayout
