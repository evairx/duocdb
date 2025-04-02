import { motion } from "framer-motion"
import { Counter } from "@/components/counter"
import { useStore } from '@nanostores/react';
import { stats } from '@/context/statsview';

import type { PlanData } from "@/types/StatsPage"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: (i: number) => ({ opacity: 0, y: 10, transition: { delay: i * 0.1 } }),
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
}

const CustomBadge = ({ children, variant = "default", className = "", }: { children: React.ReactNode, variant?: "default" | "outline" | "destructive" | "success", className?: string }) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"

  const variantStyles = {
    default: "bg-black text-white",
    outline: "border border-black bg-white text-black",
    destructive: "bg-black text-white",
    success: "bg-black text-white",
  }

  return <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>{children}</span>
}

const CustomSeparator = ({ className = "", }: { className?: string }) => {
  return <div className={`h-[1px] w-full bg-gray-200 ${className}`} />
}

const CustomButton = ({ children, variant = "default", size = "default", className = "", ...props }: { children: React.ReactNode, variant?: "default" | "ghost", size?: "default" | "sm" | "icon", className?: string, [key: string]: any }) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50"

  const variantStyles = {
    default: "bg-black text-white hover:bg-gray-800",
    ghost: "hover:bg-gray-100",
  }

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-8 w-8 p-0",
  }

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const AnimatedProgress = ({ value, delay = 0 }: { value: number; delay?: number }) => {
  return (
    <motion.div
      className="w-full h-[.400rem] bg-gray-200 rounded-full overflow-hidden mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className="h-full bg-black rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, value)}%` }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  )
}

export default function Statistics({ plan }: { plan?: PlanData }) {
  if (!plan) return null;
  const $stats = useStore(stats);
  
  const { avancePorCreditos, avanceEsperado, planEstudioTerminado, descripcionPlanEstudios } = plan

  const creditosPercentage = Number.parseFloat(avancePorCreditos.avance.replace("%", ""))
  const esperadoPercentage = Number.parseFloat(avanceEsperado.porcentaje)

  return (
    $stats && <div className="fixed inset-0 w-full h-full z-50 pointer-events-auto overflow-hidden px-2 py-2 [@media(max-width:711px)]:px-0 [@media(max-width:711px)]:py-0 animate-fade-in">
        <div className="flex items-center justify-center h-screen">
            <motion.div
                className="rounded-[.350rem] bg-white rounded-lg shadow-sm border border-gray-200 p-5 w-[448px] [@media(max-width:711px)]:w-full [@media(max-width:711px)]:h-full [@media(max-width:711px)]:rounded-none [@media(max-width:711px)]:border-0 [@media(max-width:711px)]:shadow-none [@media(max-width:711px)]:overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <h3 className="text-lg font-bold text-black">Progreso Académico</h3>
                        <p className="text-sm text-gray-600">{descripcionPlanEstudios}</p>
                    </div>
                    <CustomButton variant="ghost" size="icon" className="rounded-full" onClick={() => stats.set(!$stats)} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 text-gray-500"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        <span className="sr-only">Cerrar</span>
                    </CustomButton>
                </div>

                <div className="mb-4 p-3 border border-gray-200 rounded-md flex items-center gap-3">
                    {planEstudioTerminado ? (
                    <>
                        <svg data-v-56bd7dfc="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-6 w-6 text-black"><path d="M21.801 10A10 10 0 1 1 17 3.335"></path><path d="m9 11 3 3L22 4"></path></svg>
                        <div>
                            <h4 className="font-semibold text-black">Plan de estudios completado</h4>
                            <p className="text-xs text-gray-600">Has completado todos los requisitos académicos</p>
                        </div>
                    </>
                    ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-6 w-6 text-black"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <div>
                            <h4 className="font-semibold text-black">Plan de estudios en progreso</h4>
                            <p className="text-xs text-gray-600">Continúa avanzando en tu carrera</p>
                        </div>
                    </>
                    )}
                </div>

                <CustomSeparator className="my-4" />

                <div className="space-y-6">
                    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
                    <motion.div variants={itemVariants} custom={1} className="space-y-3">
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-5 w-5 text-black"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
                            <h4 className="font-semibold text-black">Avance de créditos</h4>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700">Aprobados:</span>
                                    <CustomBadge variant="outline" className="font-mono text-xs">
                                        {avancePorCreditos.creditosAprobados.creditos}
                                    </CustomBadge>
                                </div>
                                <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">Total:</span>
                                <CustomBadge variant="outline" className="font-mono text-xs">
                                    {plan.creditosDuoc}
                                </CustomBadge>
                            </div>
                        </div>

                        <motion.div
                            className="text-right"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            <div className="text-xl font-bold text-black">
                            <Counter value={creditosPercentage} start={0} />%
                            </div>
                            <div className="text-xs text-gray-600">completado</div>
                        </motion.div>
                        </div>

                        <AnimatedProgress value={creditosPercentage} delay={0.9} />
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                        <div className="flex flex-col">
                            <span className="text-gray-600 mb-1">Inscritos</span>
                            <span className="font-semibold">{avancePorCreditos.creditosInscritos.creditos} créditos</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-600 mb-1">Pendientes</span>
                            <span className="font-semibold">{avancePorCreditos.creditosPendientes.creditos} créditos</span>
                        </div>
                        </div>
                    </motion.div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <h5 className="font-semibold text-black mb-3">Créditos Optativos</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col">
                            <span className="text-gray-600 mb-1">Completados</span>
                            <span className="font-semibold">{avancePorCreditos.creditosOptativo.creditos} créditos</span>
                            </div>
                            <div className="flex flex-col">
                            <span className="text-gray-600 mb-1">Requeridos</span>
                            <span className="font-semibold">{plan.creditosOptativos} créditos</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progreso de optativos</span>
                        <span>
                            {avancePorCreditos.creditosOptativo.creditos > 0
                            ? ((avancePorCreditos.creditosOptativo.creditos / plan.creditosOptativos) * 100).toFixed(1)
                            : "0"}
                            %
                        </span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-black rounded-full"
                            initial={{ width: 0 }}
                            animate={{
                            width: `${Math.min(100, (avancePorCreditos.creditosOptativo.creditos / plan.creditosOptativos) * 100)}%`,
                            }}
                            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                        />
                        </div>
                    </div>

                <motion.div variants={itemVariants} custom={5} className="space-y-3">
                    <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-5 w-5 text-black"><line x1="12" x2="12" y1="20" y2="10"></line><line x1="18" x2="18" y1="20" y2="4"></line><line x1="6" x2="6" y1="20" y2="16"></line></svg>
                    <h4 className="font-semibold text-black">Avance esperado</h4>
                    </div>

                    <motion.div className="flex justify-between items-center" variants={itemVariants} custom={9}>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">Actual:</span>
                        <CustomBadge variant="outline" className="font-mono text-xs">
                            {avanceEsperado.cantidadActual}
                        </CustomBadge>
                        </div>
                        <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">Esperado:</span>
                        <CustomBadge variant="outline" className="font-mono text-xs">
                            {avanceEsperado.cantidadEsperadaFecha}
                        </CustomBadge>
                        </div>
                    </div>

                    <motion.div
                        className="text-right"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.6, duration: 0.5 }}
                    >
                        <div className="text-xl font-bold text-black">
                        <Counter value={esperadoPercentage} start={1.3} />%
                        </div>
                        <div className="text-xs text-gray-600">del esperado</div>
                    </motion.div>
                    </motion.div>

                    <AnimatedProgress value={esperadoPercentage} delay={1.7} />

                    {!avanceEsperado.aldia && (
                    <motion.div
                        className="flex justify-end mt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.5 }}
                    >
                        <CustomBadge variant="destructive" className="text-xs">
                        Atrasado
                        </CustomBadge>
                    </motion.div>
                    )}
                </motion.div>
                </motion.div>
            </div>
            </motion.div>
        </div>
    </div>
  )
}

