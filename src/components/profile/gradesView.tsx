import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Check, X, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Counter } from "@/components/animated/counter"
import GradesSkeleton from "@/components/loading/gradesSkeleton"
import GradeErrorHistory from "@/components/animated/gradeErrorHistory"

interface GradesViewProps {
  id?: string;
}

const mainVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5 
    }
  },
}

export function GradesView({ id }: GradesViewProps) {
  const [grades, setGrades] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const resToken = await fetch(`/api/auth/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        } 
      });

      if (!resToken.ok) {
        setError(true);
        setLoading(false);
      }
      const token = await resToken.json();

      const resStudent = await fetch(`/api/student/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token.token}`,
        }
      });

      if (!resStudent.ok) {
        setError(true);
        setLoading(false);
        return;
      }

      const studentData = await resStudent.json();
      const sectionNumber = studentData.planesEstudios[0].planEstudio.codigoSap;
      
      const resGrades = await fetch(`/api/grades/${id}?section=${sectionNumber}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token.token}`,
          "Content-Type": "application/json",
        }
      })

      if (!resGrades.ok) {
        setError(true);
        setLoading(false);
        return;
      }

      const gradesData = await resGrades.json();

      setGrades(gradesData);
      setLoading(false);
    }
    fetchData();
  }, []);


  const [selectedSemester, setSelectedSemester] = useState("");

  useEffect(() => {
    if (grades && Object.keys(grades).length > 0) {
      setSelectedSemester(Object.keys(grades)[0]);
    }
  }, [grades]);
  
  if (loading) return <GradesSkeleton />;
  if (error) return  <GradeErrorHistory/>;
  if (!grades || Object.keys(grades).length === 0) return <p>No hay datos disponibles</p>;

  const overallStats = Object.values(grades as Record<string, { aprobados?: number; reprobados?: number; encurso?: number; promedio?: number }>).reduce<{
    promedio: number;
    aprobados: number;
    reprobados: number;
    encurso: number;
  }>(
    (acc, semester) => {
      return {
        aprobados: acc.aprobados + (semester.aprobados || 0),
        reprobados: acc.reprobados + (semester.reprobados || 0),
        encurso: acc.encurso + (semester.encurso || 0),
        promedio: acc.promedio + (semester.promedio || 0)
      };
    },
    { promedio: 0, aprobados: 0, reprobados: 0, encurso: 0 }
  );

  const overallAverageGrade = (overallStats.promedio / Object.keys(grades).length).toFixed(1);

  return (
    <motion.div variants={mainVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-950">Historial Académico</h2>
          <p className="text-zinc-500">Notas finales y estado de las asignaturas cursadas</p>
        </div>

        <div className="w-full md:w-64">
          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
            <SelectTrigger className="w-full border-zinc-300 bg-white cursor-pointer">
              <SelectValue placeholder="Seleccionar semestre" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(grades).map((semesterId) => (
                <SelectItem key={semesterId} value={semesterId}>
                  Semestre {semesterId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="semester" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-100">
          <TabsTrigger value="semester" className="cursor-pointer transition-all data-[state=active]:bg-zinc-950 data-[state=active]:text-white">
            Semestre Seleccionado
          </TabsTrigger>
          <TabsTrigger value="overall" className="cursor-pointer transition-all data-[state=active]:bg-zinc-950 data-[state=active]:text-white">
            Historial Completo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="semester" className="mt-4">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="text-sm font-medium text-zinc-500">Promedio</div>
              <div className="text-3xl font-bold mt-1 text-zinc-950">
                {grades[selectedSemester]?.promedio ? (
                  <Counter value={grades[selectedSemester].promedio} duration={1000} decimals={1} />
                ) : "-"}
              </div>
              <div className="text-xs text-zinc-500 mt-1">Calificación media</div>
            </div>

            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="text-sm font-medium text-zinc-500">Aprobadas</div>
              <div className="text-3xl font-bold mt-1 text-zinc-950">
                <Counter value={grades[selectedSemester]?.aprobados || 0} duration={1000} />
              </div>
              <div className="text-xs text-zinc-500 mt-1">Asignaturas</div>
            </div>

            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="text-sm font-medium text-zinc-500">Reprobadas</div>
              <div className="text-3xl font-bold mt-1 text-zinc-950">
                <Counter value={grades[selectedSemester]?.reprobados || 0} duration={1000} />
              </div>
              <div className="text-xs text-zinc-500 mt-1">Asignaturas</div>
            </div>

            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="text-sm font-medium text-zinc-500">En Curso</div>
              <div className="text-3xl font-bold mt-1 text-zinc-950">
                <Counter value={grades[selectedSemester]?.encurso || 0} duration={1000} />
              </div>
              <div className="text-xs text-zinc-500 mt-1">Asignaturas actuales</div>
            </div>
          </div>

          {grades[selectedSemester]?.asignaturas?.length > 0 ? (
            <div className="rounded-lg border overflow-hidden mt-6">
              <Table>
                <TableCaption>Calificaciones del semestre {selectedSemester}</TableCaption>
                <TableHeader className="bg-zinc-100">
                  <TableRow>
                    <TableHead className="w-[350px]">Asignatura</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Obligatorio</TableHead>
                    <TableHead className="text-right">Nota Final</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades[selectedSemester].asignaturas.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.nombre}</TableCell>
                      <TableCell>{course.sigla}</TableCell>
                      <TableCell>
                        {course.state === 0 && (
                          <Badge variant="outline" className="text-blue-500 border-blue-500">
                            <AlertCircle className="h-3 w-3 mr-1" /> En Curso
                          </Badge>
                        )}
                        {course.state === 1 && (
                          <Badge className="bg-zinc-950">
                            <Check className="h-3 w-3 mr-1" /> Aprobado
                          </Badge>
                        )}
                        {course.state === 2 && (
                          <Badge variant="outline" className="text-red-500 border-red-500">
                            <X className="h-3 w-3 mr-1" /> No Aprobado
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center">
                          {course.required ? (
                            <Check className="h-4 w-4 text-zinc-950 mr-1" />
                          ) : (
                            <X className="h-4 w-4 mr-1" />
                          )}
                          {course.required ? "Si" : "No"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {course.nota || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="rounded-lg border p-8 bg-white shadow-sm mt-6 text-center">
              <p className="text-zinc-500">No hay calificaciones disponibles para este semestre.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="overall" className="mt-4">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="text-sm font-medium text-zinc-500">Promedio General</div>
              <div className="text-3xl font-bold mt-1 text-zinc-950">
                <Counter value={parseFloat(overallAverageGrade)} duration={1000} decimals={1} />
              </div>
              <div className="text-xs text-zinc-500 mt-1">Calificación media total</div>
            </div>

            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="text-sm font-medium text-zinc-500">Total Aprobadas</div>
              <div className="text-3xl font-bold mt-1 text-zinc-950">
                <Counter value={overallStats.aprobados} duration={1000} />
              </div>
              <div className="text-xs text-zinc-500 mt-1">Asignaturas</div>
            </div>

            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="text-sm font-medium text-zinc-500">Total Reprobadas</div>
              <div className="text-3xl font-bold mt-1 text-zinc-950">
                <Counter value={overallStats.reprobados} duration={1000} />
              </div>
              <div className="text-xs text-zinc-500 mt-1">Asignaturas</div>
            </div>

            <div className="rounded-lg border p-4 bg-white shadow-sm">
              <div className="text-sm font-medium text-zinc-500">Total En Curso</div>
              <div className="text-3xl font-bold mt-1 text-zinc-950">
                <Counter value={overallStats.encurso} duration={1000} />
              </div>
              <div className="text-xs text-zinc-500 mt-1">Asignaturas</div>
            </div>
          </div>

          <div className="rounded-lg border overflow-hidden mt-6">
            <div className="p-4 bg-zinc-100 font-bold">Historial Académico Completo</div>
            <div className="divide-y">
              {Object.entries(grades).map(([semesterId, semesterData]) => (
                <div key={semesterId} className="p-4">
                  <div className="font-bold mb-3">Semestre {semesterId}</div>
                  <Table>
                    <TableHeader className="bg-zinc-50">
                      <TableRow>
                        <TableHead className="w-[350px]">Asignatura</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Obligatorio</TableHead>
                        <TableHead className="text-right">Nota Final</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semesterData.asignaturas.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>{course.nombre}</TableCell>
                          <TableCell>{course.sigla}</TableCell>
                          <TableCell>
                            {course.state === 0 && (
                              <Badge variant="outline" className="text-blue-500 border-blue-500">
                                <AlertCircle className="h-3 w-3 mr-1" /> En Curso
                              </Badge>
                            )}
                            {course.state === 1 && (
                              <Badge className="bg-zinc-950">
                                <Check className="h-3 w-3 mr-1" /> Aprobado
                              </Badge>
                            )}
                            {course.state === 2 && (
                              <Badge variant="outline" className="text-red-500 border-red-500">
                                <X className="h-3 w-3 mr-1" /> No Aprobado
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center">
                              {course.required ? (
                                <Check className="h-4 w-4 text-zinc-950 mr-1" />
                              ) : (
                                <X className="h-4 w-4 mr-1" />
                              )}
                              {course.required ? "Si" : "No"}
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {course.nota || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}