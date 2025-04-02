export interface CreditosData {
    total: number
    creditos: number
    porcentaje: string
}
  
export interface AvancePorCreditosData {
    avance: string
    creditosAprobados: CreditosData
    creditosInscritos: CreditosData
    creditosPlan: CreditosData
    creditosOptativo: CreditosData
    creditosPendientes: CreditosData
}
  
export interface AvancePorCantidadData {
    cantidadTotal: number
    cantidadAprobadas: number
    cantidadReprobadas: number
    cantidadInscritas: number
    cantidadNoInscritas: number
}
  
export interface AvanceEsperadoData {
    cantidadActual: number
    cantidadEsperadaFecha: number
    porcentajeCantidadEsperadaFecha: string
    porcentaje: string
    aldia: boolean
}
  
export interface PlanData {
    descripcionPlanEstudios: string
    mencion: string
    codigoSap: string
    creditosDuoc: number
    creditosOptativos: number
    avancePorCreditos: AvancePorCreditosData
    avancePorCantidad: AvancePorCantidadData
    avanceEsperado: AvanceEsperadoData
    planEstudioTerminado: boolean
}