import FuzzyText from '@/components/FuzzyText'
import { IconHome } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen bg-black'>
      <FuzzyText
        baseIntensity={0.18}
        hoverIntensity={0.4}
        enableHover={true}
      >
        404
      </FuzzyText>
      <FuzzyText
        baseIntensity={0.05}
        hoverIntensity={0.1}
        enableHover={true}
        fontSize={30}
        color='#fff'
      >
        Page Not Found
      </FuzzyText>

      <Link to={'/'} className='bg-[#E11D48] p-2 px-4 rounded text-white flex items-center font-semibold gap-2'><IconHome className='size-[1.4rem]' /> Home</Link>
    </div>
  )
}

export default PageNotFound
