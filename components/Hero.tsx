'use client';
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation'
import { Reveal } from '.';

const Hero = () => {
    return (
        <div className=' w-full  text-dark sm:mb-24'>
            <div className=' max-w-[1000px] mx-auto pt-8 flex justify-center '>
                <Reveal>
                    <div className='flex flex-col items-center'>

                        <div>
                            <Image
                                src="/logo-resized.png"
                                alt="background"
                                width={788}
                                height={402}
                                quality={100}
                            />
                        </div>
                        <div className=' flex flex-col justify-center items-center mt-10 gap-4 px-6'>
                            {/* <p className=' text-center font-bold text-2xl lg:text-3xl'>
                                UKRAINIAN ENVIROMENTAL MONITORING
                            </p> */}
                            <TypeAnimation
                                sequence={[
                                    'UKRAINIAN ENVIRONMENTAL OBSERVATION',
                                    1700,
                                    'UKRAINIAN ENVIRONMENTAL MONITORING',
                                    3500,
                                    '',
                                    1500

                                ]}
                                speed={1}
                                deletionSpeed={30}
                                style={{ fontSize: '1.875rem', fontWeight: '700', textAlign: 'center' }}
                                repeat={Infinity}

                            />

                            <div className=' max-w-[450px]'>
                                <p className='text-center text-md lg:text-lg'>The best source of information and analytics on the state of the environment in Ukraine</p>
                            </div>
                        </div>



                    </div>
                </Reveal>
            </div>
        </div>
    )
}

export default Hero
