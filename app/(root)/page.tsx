import { CustomButton, Hero, NewsSection, Services } from '@/components'
import React from 'react'

const Home = () => {
    return (
        <div className='flex flex-col'>
            <Hero />
            <Services />
            <NewsSection />
        </div>
    )
}

export default Home