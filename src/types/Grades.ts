export interface Asignatura {
    id: string;
    nombre: string;
    sigla: string;
    nota?: string;
    tipoAsignaturaCodigo: string;
    cantidadVecesCursadas: number;
    anyoAcademico: number;
    codigoPeriodo: string;
    estadoInscripcion: EstadoInscripcion;
    estadoAsignatura: string;
}

export interface AsignaturaProcesada {
    id: string;
    nombre: string;
    sigla: string;
    nota: string;
    required: boolean;
    cantidadVecesCursadas: number;
    anyoAcademico: number;
    codigoPeriodo: string;
    estadoInscripcion: number;
    finished: boolean;
    state: number;
}

export interface PeriodoAcademico {
    promedio: number;
    aprobados: number;
    reprobados: number;
    encurso: number;
    asignaturas: AsignaturaProcesada[];
}

export type EstadoInscripcion = 'APROBADA' | 'REPROBADA' | 'INSCRITA';
export type GroupedData = Record<string, PeriodoAcademico>;