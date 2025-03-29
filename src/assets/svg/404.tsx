import { motion } from "framer-motion"

const svgVariants = {
    hidden: { 
        opacity: 0,
        scale: 0.6
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1, },
    }
}

const pathVariants = {
    hidden: {
        opacity: 0,
        pathLength: 0
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 1.4,
            ease: "easeInOut",
            delay: 0.3
        }
    }
}

export default function NotFoundSvg() {
    return (
        <motion.svg 
            variants={svgVariants}
            initial="hidden"
            animate="visible"
            xmlns="http://www.w3.org/2000/svg"  
            width={72}  
            height={72}  
            viewBox="0 0 24 24"  
            fill="none" 
            stroke="currentColor"  
            strokeWidth={1.5}  
            strokeLinecap="round"  
            strokeLinejoin="round" 
            className="icon icon-tabler icons-tabler-outline icon-tabler-error-404">
                <motion.path variants={pathVariants} stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <motion.path variants={pathVariants} d="M3 8v3a1 1 0 0 0 1 1h3" />
                <motion.path variants={pathVariants} d="M7 8v8" />
                <motion.path variants={pathVariants}  d="M17 8v3a1 1 0 0 0 1 1h3" />
                <motion.path variants={pathVariants} d="M21 8v8" />
                <motion.path variants={pathVariants} d="M10 10v4a2 2 0 1 0 4 0v-4a2 2 0 1 0 -4 0" />
        </motion.svg>
    )
}