import { HomeLayout } from '@/Layout/HomeLayout'
import template1 from '../assets/template1.mp4'
import { IconEye } from '@tabler/icons-react'
import { Link, useNavigate } from 'react-router-dom'

const SelectTemplate = () => {
    const navigate = useNavigate()
    return (
        <HomeLayout>
            <div>select template</div>
            <Link to={"/add-portfolio/template1"} className='text-white cursor-pointer inline-block overflow-hidden w-fit rounded bg-[#101828] border border-neutral-500'>

                <div className='font-semibold pl-2 flex items-center justify-between text-center uppercase tracking-wide'>
                    <h3>Template 1</h3>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/portfolio/preview/template1/GR17') }} className='bg-amber-500 flex items-center justify-center h-9 w-12'>
                        <IconEye />
                    </button>
                </div>
                <div>
                    <video className='max-w-[19rem] rounded-b' loop onMouseOver={(e) => e.currentTarget.play()} onMouseOut={(e) => e.currentTarget.pause()} src={template1}></video>
                </div>
            </Link>
        </HomeLayout>
    )
}

export default SelectTemplate
