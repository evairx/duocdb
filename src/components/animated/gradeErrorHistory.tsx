import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const mainVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8
        }
    }
}

const svgVariants = {
    hidden: { rotate: -180 },
    visible: {
        rotate: 0,
        transition: { duration: 1 },
        delay: 0.3
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

const moduleVariants = {
    hidden: {
        opacity: 0,
        scale: 0.7,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            delay: 0.3
        },
    },
}

export default function AcademicHistoryErrorModern() {
  return (
    <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={mainVariants}
    >
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Historial Académico</h2>
          <p className="text-zinc-500">Notas finales y estado de las asignaturas cursadas</p>
        </div>

        <div className="w-full md:w-64">
          <Button variant="outline" className="w-full h-10 gap-2">
            <RefreshCw className="h-4 w-4" />
            Actualizar datos
          </Button>
        </div>
      </div>

      <Tabs defaultValue="semester" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-100">
          <TabsTrigger
            value="semester"
            className="cursor-pointer transition-all data-[state=active]:bg-zinc-950 data-[state=active]:text-white hover:opacity-80"
          >
            Semestre Seleccionado
          </TabsTrigger>
          <TabsTrigger
            value="overall"
            className="cursor-pointer transition-all data-[state=active]:bg-zinc-950 data-[state=active]:text-white hover:opacity-80"
          >
            Historial Completo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="semester" className="mt-4">
          <div className="grid gap-6 md:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-lg border bg-white p-4 shadow-sm flex items-center justify-center h-[100px]"
              >
                <div className="w-12 h-1.5 bg-zinc-200 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-400 rounded-full w-1/3 animate-[shimmer_1s_infinite]"></div>
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            variants={moduleVariants}
            initial="hidden"
            animate="visible"
            className="rounded-lg border bg-white mt-6 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-zinc-100 flex items-center justify-center">
              <motion.svg
                variants={svgVariants}
                initial="hidden"
                animate="visible"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-zinc-400"
              >
                <motion.path
                    variants={pathVariants}
                    d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </motion.svg>
            </div>
            <h3 className="text-xl font-medium text-zinc-900 mb-2">No pudimos cargar tus datos</h3>
            <p className="text-zinc-500 mb-6 max-w-md mx-auto">
              Parece que hay un problema temporal para mostrar tu información académica.
            </p>
            <div className="flex justify-center gap-3">
              <Button className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Intentar nuevamente
              </Button>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="overall" className="mt-4">
          <div className="grid gap-6 md:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="rounded-lg border bg-white p-4 shadow-sm flex items-center justify-center h-[100px]"
              >
                <div className="w-12 h-1.5 bg-zinc-200 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-zinc-400 rounded-full w-1/3 animate-[shimmer_1s_infinite]"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg border bg-white mt-6">
            <div className="p-6 text-center">
              <div className="relative w-full h-40 mb-6 bg-gradient-to-r from-zinc-100 to-zinc-50 rounded-lg overflow-hidden flex items-center justify-center">
                <motion.svg
                    variants={svgVariants}
                    initial="hidden"
                    animate="visible"
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-zinc-300"
                >
                  <motion.path
                    variants={pathVariants}
                    d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent bottom-0 h-1/2"></div>
              </div>
              <h3 className="text-xl font-medium text-zinc-900 mb-2">Historial no disponible</h3>
              <p className="text-zinc-500 mb-6 max-w-md mx-auto">
                No podemos mostrar tu historial académico en este momento. Por favor intenta más tarde.
              </p>
              <Button className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Actualizar
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

