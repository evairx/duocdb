import { motion } from "framer-motion";

const svgVariants = {
    hidden: { rotate: -180 },
    visible: {
        rotate: 0,
        transition: { duration: 1 },
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
            ease: "easeInOut"
        }
    }
}

export default function DbSvg() {
    return (
        <motion.svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-database"
            variants={svgVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.path stroke="none" d="M0 0h24v24H0z" fill="none"
                variants={pathVariants}
            />
            <motion.path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" 
                variants={pathVariants}
            />
            <motion.path d="M4 6v6a8 3 0 0 0 16 0v-6" 
                variants={pathVariants}
            />
            <motion.path d="M4 12v6a8 3 0 0 0 16 0v-6"
                variants={pathVariants}
            />
        </motion.svg>
    )
}