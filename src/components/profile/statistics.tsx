import { BarChart, BookOpen, GraduationCap, LineChart, X } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

import { StatisticsSkeleton } from "@/components/loading/statisticsSkeleton"
import { Counter } from "@/components/animated/counter"

export function Statistics({ onHandleOpen }: { onHandleOpen: () => void }) {
  // Datos del estudiante
  const studentData = {}

  const loading = true;

  if (loading) return <StatisticsSkeleton />;

  const plan = studentData.planesEstudios[0]
  const creditos = plan.avancePorCreditos
  const cantidad = plan.avancePorCantidad
  const avanceEsperado = plan.avanceEsperado

  // Componente de barra de progreso animada
  const AnimatedProgress = ({ value, delay = 0, className = "" }: { value: number, delay?: number, className?: string }) => {
    return (
      <div className={`bg-gray-200 rounded-full overflow-hidden h-1.5 ${className}`}>
        <motion.div
          className="h-full bg-black"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 1.2,
            delay,
            ease: "easeOut",
          }}
        />
      </div>
    )
  }

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }
  

  return (
    <motion.div
      className="w-[500px] border border-black rounded-lg shadow-md bg-white overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-6">
        <motion.div className="flex items-center justify-between mb-4" variants={itemVariants}>
          <div>
            <h2 className="text-xl font-bold">Estadísticas Académicas</h2>
            <p className="text-gray-600 text-sm">Progreso del estudiante</p>
          </div>
          <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.2 }}>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full cursor-pointer hover:opacity-90" onClick={onHandleOpen}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid gap-4">
          {/* Información del programa */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <GraduationCap className="h-5 w-5" />
              </motion.div>
              <h3 className="font-semibold">{plan.descripcionPlanEstudios}</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Avance general</span>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, duration: 0.3 }}>
                <Badge variant="outline" className="font-mono text-xs">
                  <Counter value={parseFloat(creditos.avance?.toString() ?? '0')} />%
                </Badge>
              </motion.div>
            </div>
            <AnimatedProgress value={Number.parseInt(creditos.avance)} delay={0.4} />
          </motion.div>

          <Separator className="bg-gray-200 my-1" />

          {/* Sección de créditos */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <BookOpen className="h-4 w-4" />
              </motion.div>
              <h4 className="text-sm font-semibold">Avance por Créditos</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div className="space-y-1" variants={itemVariants} custom={1}>
                <div className="flex justify-between">
                  <span className="text-xs">Créditos Aprobados</span>
                  <span className="text-xs font-mono">
                    <Counter value={creditos.creditosAprobados.creditos}/>/{creditos.creditosAprobados.total}
                  </span>
                </div>
                <AnimatedProgress value={Number.parseFloat(creditos.creditosAprobados.porcentaje)} delay={0.6} />
              </motion.div>

              <motion.div className="space-y-1" variants={itemVariants} custom={2}>
                <div className="flex justify-between">
                  <span className="text-xs">Créditos Inscritos</span>
                  <span className="text-xs font-mono">
                    <Counter value={creditos.creditosInscritos.creditos}/> /{creditos.creditosInscritos.total}
                  </span>
                </div>
                <AnimatedProgress value={Number.parseFloat(creditos.creditosInscritos.porcentaje)} delay={0.7} />
              </motion.div>

              <motion.div className="space-y-1" variants={itemVariants} custom={3}>
                <div className="flex justify-between">
                  <span className="text-xs">Créditos Plan</span>
                  <span className="text-xs font-mono">
                    <Counter value={creditos.creditosPlan.creditos}/> /{creditos.creditosPlan.total || 999}
                  </span>
                </div>
                <AnimatedProgress value={Number.parseFloat(creditos.creditosPlan.porcentaje)} delay={0.8} />
              </motion.div>

              <motion.div className="space-y-1" variants={itemVariants} custom={4}>
                <div className="flex justify-between">
                  <span className="text-xs">Créditos Pendientes</span>
                  <span className="text-xs font-mono">
                    <Counter value={creditos.creditosPendientes.creditos}/>/{creditos.creditosPendientes.total}
                  </span>
                </div>
                <AnimatedProgress value={Number.parseFloat(creditos.creditosPendientes.porcentaje)} delay={0.9} />
              </motion.div>
            </div>
          </motion.div>

          <Separator className="bg-gray-200 my-1" />

          {/* Sección de asignaturas */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.3 }}
              >
                <BarChart className="h-4 w-4" />
              </motion.div>
              <h4 className="text-sm font-semibold">Avance por Asignaturas</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.div className="space-y-1" variants={itemVariants} custom={5}>
                <div className="flex justify-between">
                  <span className="text-xs">Aprobadas</span>
                  <span className="text-xs font-mono">
                    <Counter value={cantidad.cantidadAprobadas} start={0.8}/>/{cantidad.cantidadTotal}
                  </span>
                </div>
                <AnimatedProgress value={(cantidad.cantidadAprobadas / cantidad.cantidadTotal) * 100} delay={1.1} />
              </motion.div>

              <motion.div className="space-y-1" variants={itemVariants} custom={6}>
                <div className="flex justify-between">
                  <span className="text-xs">Reprobadas</span>
                  <span className="text-xs font-mono">
                    <Counter value={cantidad.cantidadReprobadas} start={0.8}/>/{cantidad.cantidadTotal}
                  </span>
                </div>
                <AnimatedProgress value={(cantidad.cantidadReprobadas / cantidad.cantidadTotal) * 100} delay={1.2} />
              </motion.div>

              <motion.div className="space-y-1" variants={itemVariants} custom={7}>
                <div className="flex justify-between">
                  <span className="text-xs">Inscritas</span>
                  <span className="text-xs font-mono">
                    <Counter value={cantidad.cantidadInscritas} start={0.8}/>/{cantidad.cantidadTotal}
                  </span>
                </div>
                <AnimatedProgress value={(cantidad.cantidadInscritas / cantidad.cantidadTotal) * 100} delay={1.3} />
              </motion.div>

              <motion.div className="space-y-1" variants={itemVariants} custom={8}>
                <div className="flex justify-between">
                  <span className="text-xs">No Inscritas</span>
                  <span className="text-xs font-mono">
                    <Counter value={cantidad.cantidadNoInscritas} start={0.8}/>/{cantidad.cantidadTotal}
                  </span>
                </div>
                <AnimatedProgress value={(cantidad.cantidadNoInscritas / cantidad.cantidadTotal) * 100} delay={1.4} />
              </motion.div>
            </div>
          </motion.div>

          <Separator className="bg-gray-200 my-1" />

          {/* Sección de avance esperado */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.3 }}
              >
                <LineChart className="h-4 w-4" />
              </motion.div>
              <h4 className="text-sm font-semibold">Avance Esperado</h4>
            </div>

            <div className="space-y-2">
              <motion.div className="flex justify-between items-center" variants={itemVariants} custom={9}>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">Actual</span>
                    <Badge variant="outline" className="font-mono text-xs px-1.5 py-0">
                      {avanceEsperado.cantidadActual}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs">Esperado</span>
                    <Badge variant="outline" className="font-mono text-xs px-1.5 py-0">
                      {avanceEsperado.cantidadEsperadaFecha}
                    </Badge>
                  </div>
                </div>

                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                >
                  <div className="text-sm font-semibold"><Counter value={Number.parseFloat(avanceEsperado.porcentaje)} start={1.3}/>%</div>
                  <div className="text-xs text-gray-500">del esperado</div>
                </motion.div>
              </motion.div>

              <AnimatedProgress value={Number.parseFloat(avanceEsperado.porcentaje)} delay={1.7} />

              {!avanceEsperado.aldia && <motion.div
                className="flex justify-end"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <Badge
                  variant={avanceEsperado.aldia ? "default" : "destructive"}
                  className={`text-xs ${avanceEsperado.aldia ? "bg-black text-white" : "bg-red-600 text-white"}`}
                >
                  Atrasado
                </Badge>
              </motion.div>}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}