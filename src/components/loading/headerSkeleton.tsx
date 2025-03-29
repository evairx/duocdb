import { motion } from "framer-motion"

const mainVariants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
}

export default function StudentSkeleton() {
    return (
      <>
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={mainVariants}
            className="mb-[2rem] rounded-lg border bg-card p-6 shadow-s"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative overflow-hidden">
                <div className="h-16 w-16 rounded-full bg-gray-200"></div>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
              <div>
                <div className="relative mb-2 overflow-hidden">
                  <div className="h-7 w-40 rounded bg-gray-200"></div>
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative overflow-hidden">
                    <div className="h-4 w-4 rounded bg-gray-200"></div>
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden">
                    <div className="h-4 w-48 rounded bg-gray-200"></div>
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative overflow-hidden">
                <div className="h-10 w-36 rounded bg-gray-200"></div>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )
  }
  