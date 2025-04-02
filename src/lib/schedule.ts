type Schedule = {
  asignaturaCodigoSap: string;
  descSede: string;
  horarios: {
    dia: string;
    horario: string;
    salaCodigo: string;
    modalidad: string;
    nombreDocente: string;
  }[];
};

type Course = {
  sigla: string;
  nombre: string;
  nota: string;
};

type ClassInfo = {
  horario: string;
  sala: string;
  modalidad: string;
  docente: string;
  nombreAsignatura: string;
  nota: string;
  campus: string;
  inicio?: number;
};

type DailySchedule = Record<string, ClassInfo[]>;

const parseTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + (minutes || 0);
};

const formatMinutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60) % 12 || 12;
  const mins = (minutes % 60).toString().padStart(2, '0');
  const period = minutes >= 720 ? 'PM' : 'AM';
  return `${hours}:${mins} ${period}`;
};

const formatCampusName = (campus: string): string =>
  campus.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

const convertirDia = (dia: string): string => {
  const dias: Record<string, string> = {
    lunes: 'monday', martes: 'tuesday', miércoles: 'wednesday', miercoles: 'wednesday',
    jueves: 'thursday', viernes: 'friday', sábado: 'saturday', sabado: 'saturday'
  };
  return dias[dia.toLowerCase().trim()] || dia;
};

const combinarClasesConsecutivas = (clases: ClassInfo[]): ClassInfo[] => {
  const grupos = new Map<string, ClassInfo & { tiempos: { inicio: number; fin: number }[] }>();

  for (const clase of clases) {
    const key = `${clase.nombreAsignatura}-${clase.docente}-${clase.sala}-${clase.modalidad}`;
    if (!grupos.has(key)) {
      grupos.set(key, { ...clase, tiempos: [] });
    }
    const [inicio, fin] = clase.horario.split(' - ').map(parseTimeToMinutes);
    grupos.get(key)!.tiempos.push({ inicio, fin });
  }

  return Array.from(grupos.values()).map(({ tiempos, ...grupo }) => {
    tiempos.sort((a, b) => a.inicio - b.inicio);
    return {
      ...grupo,
      horario: `${formatMinutesToTime(tiempos[0].inicio)} - ${formatMinutesToTime(tiempos.at(-1)!.fin)}`,
      inicio: tiempos[0].inicio
    };
  }).sort((a, b) => (a.inicio || 0) - (b.inicio || 0));
};

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

export const getSchedule = async (username: string, userId: string, token: string): Promise<DailySchedule> => {
  try {
    const [scheduleRes, coursesRes] = await Promise.all([
      fetch(`${import.meta.env.SCHEDULE_URL}/${username}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json() as Promise<Schedule[]>),
      fetch(`${import.meta.env.GRADES_URL}/${username}/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json() as Promise<Course[]>)
    ]);

    const horariosPorDia: DailySchedule = { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] };

    for (const asignatura of scheduleRes) {
      for (const horario of asignatura.horarios) {
        const diaIngles = convertirDia(horario.dia);
        if (!horariosPorDia[diaIngles]) continue;

        const datosAsignatura = coursesRes.find(asig => asig.sigla === asignatura.asignaturaCodigoSap);
        horariosPorDia[diaIngles].push({
          horario: horario.horario || "No especificado",
          sala: horario.salaCodigo || "Desconocida",
          modalidad: horario.modalidad || "Desconocida",
          docente: horario.nombreDocente || "No asignado",
          nombreAsignatura: datosAsignatura?.nombre ? formatTitle(datosAsignatura.nombre) : "Desconocida",
          nota: datosAsignatura?.nota || "N/A",
          campus: formatCampusName(asignatura.descSede)
        });
      }
    }

    for (const dia in horariosPorDia) {
      horariosPorDia[dia] = combinarClasesConsecutivas(horariosPorDia[dia]);
    }

    return horariosPorDia;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};