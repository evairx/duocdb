import type { Asignatura, GroupedData, AsignaturaProcesada, PeriodoAcademico, EstadoInscripcion } from '@/types/Grades';

const API_URL = import.meta.env.GRADES_URL;

export async function getGrades(usuario: string, id: number,  token: string): Promise<GroupedData> {
    try {
        const data = await fetchAsignaturas(usuario, id, token);
        return processData(data);
    } catch (error) {
        console.error('Error fetching grades:', error);
        throw error;
    }
}

async function fetchAsignaturas(usuario: string, id: number, token: string): Promise<Asignatura[]> {
    const response = await fetch(
        `${API_URL}/${usuario}/${id}`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}

function processData(asignaturas: Asignatura[]): GroupedData {
    const groupedData = asignaturas.reduce((acc: GroupedData, asignatura) => {
        const key = `${asignatura.anyoAcademico}-${asignatura.codigoPeriodo}`;

        if (!acc[key]) {
            acc[key] = {
                promedio: 0,
                aprobados: 0,
                reprobados: 0,
                encurso: 0,
                asignaturas: []
            };
        }

        const asignaturaProcesada = transformAsignatura(asignatura);
        acc[key].asignaturas.push(asignaturaProcesada);
        updatePeriodoStats(acc[key], asignatura);

        return acc;
    }, {});

    return calculatePromedios(groupedData);
}

function formatTitle(title: string): string {
    const lowercaseWords = ['de', 'del', 'la', 'las', 'los', 'el'];
    
    return title
        .toLowerCase()
        .split(' ')
        .map((word, index) => {
            if (/^[IVXLCDM]+$/.test(word.toUpperCase())) {
                return word.toUpperCase();
            }

            if (index > 0 && lowercaseWords.includes(word)) {
                return word;
            }

            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

function transformAsignatura(asignatura: Asignatura): AsignaturaProcesada {
    return {
        id: asignatura.id,
        nombre: formatTitle(asignatura.nombre),
        sigla: asignatura.sigla,
        nota: asignatura.nota || '',
        required: asignatura.tipoAsignaturaCodigo === 'OBLI',
        cantidadVecesCursadas: asignatura.cantidadVecesCursadas,
        anyoAcademico: asignatura.anyoAcademico,
        codigoPeriodo: asignatura.codigoPeriodo,
        estadoInscripcion: getEstadoValue(asignatura.estadoInscripcion),
        finished: asignatura.estadoAsignatura === 'FINAL',
        state: getEstadoValue(asignatura.estadoInscripcion)
    };
}

function updatePeriodoStats(periodo: PeriodoAcademico, asignatura: Asignatura): void {
    if (asignatura.nota && asignatura.nota !== 'A') {
        const nota = parseFloat(asignatura.nota.replace(',', '.'));
        if (!isNaN(nota)) {
            periodo.promedio += nota;
        }
    }

    switch (asignatura.estadoInscripcion) {
        case 'APROBADA':
            periodo.aprobados++;
            break;
        case 'REPROBADA':
            periodo.reprobados++;
            break;
        default:
            periodo.encurso++;
    }
}

function calculatePromedios(groupedData: GroupedData): GroupedData {
    return Object.entries(groupedData).reduce((acc, [key, periodo]) => {
        const asignaturasConNota = periodo.asignaturas.filter(
            asig => asig.nota && asig.nota !== 'A' && !isNaN(parseFloat(asig.nota.replace(',', '.')))
        ).length;

        return {
            ...acc,
            [key]: {
                ...periodo,
                promedio: asignaturasConNota > 0
                    ? Number((periodo.promedio / asignaturasConNota).toFixed(1))
                    : 0
            }
        };
    }, {} as GroupedData);
}

function getEstadoValue(estado: EstadoInscripcion): number {
    switch (estado) {
        case 'APROBADA': return 1;
        case 'REPROBADA': return 2;
        default: return 0;
    }
}