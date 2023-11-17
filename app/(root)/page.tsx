import { Hero, Services } from '@/components'
import React from 'react'

const Home = () => {
    return (
        <div className='flex flex-col'>
            <Hero />
            <Services />
            <div className=' h-[1100px] bg-primary '>Home</div>
        </div>
    )
}

export default Home