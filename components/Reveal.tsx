'use client'
import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation, useIsPresent } from 'framer-motion'

interface Props {
    children: JSX.Element
    width?: 'fit-content' | '100%'
    height?: 'fit-content' | '100%'
}

const Reveal = ({ children, width = 'fit-content', height = 'fit-content' }: Props) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const mainControls = useAnimation()

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible')
        }
    }, [isInView])


    return (
        <div ref={ref} style={{ position: 'relative', width, height, overflow: 'hidden' }}>
            <motion.div style={{ height }}
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 }
                }}
                initial='hidden'
                animate={mainControls}
                transition={{ duration: 0.5, dealy: 0.25 }}
            >
                {children}
            </motion.div>
        </div>
    )
}

export default Reveal