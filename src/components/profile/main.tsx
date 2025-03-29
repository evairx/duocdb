import { useState, useEffect } from "react";
import { Header } from "@/components/profile/header";
import { GradesView } from "@/components/profile/gradesView";
import { Statistics } from "@/components/profile/statistics";
import { motion } from "framer-motion";

const overlayVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
        }
    },
}
interface ProfileProps {
    id: string;
}

export default function Profile({ id }: ProfileProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    function handleOpen() {
        setIsOpen(!isOpen);
        console.log(isOpen);
    }

    return (
        <div>
            <Header id={id} onHandleOpen={handleOpen}/>
            <GradesView id={id}/>
            
            {isOpen && 
            <div className="fixed inset-0 w-full h-full bg-black/60 z-[999] pointer-events-auto overflow-hidden px-2 py-2">
                <div className="flex items-center justify-center h-full">
                    <Statistics onHandleOpen={handleOpen}/>
                </div>
            </div>}

            {isOpen && <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                className="fixed inset-0 w-full h-full bg-black/10 z-[998] pointer-events-auto overflow-hidden overscroll-none touch-move-none"
            />}
        </div>
    )
}