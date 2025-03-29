import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { X, GraduationCap, BookOpen, BarChart, LineChart } from "lucide-react"

export function StatisticsSkeleton() {
  return (
    <div className="w-[500px] border border-black rounded-lg shadow-md bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-6 w-48 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-36 bg-gray-200 rounded"></div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-50">
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </div>

        <div className="grid gap-4">
          {/* Información del programa */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 p-1 rounded">
                <GraduationCap className="h-5 w-5 text-gray-300" />
              </div>
              <div className="h-5 w-40 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="h-5 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full"></div>
          </div>

          <Separator className="bg-gray-200 my-1" />

          {/* Sección de créditos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 p-1 rounded">
                <BookOpen className="h-4 w-4 text-gray-300" />
              </div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-200 my-1" />

          {/* Sección de asignaturas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 p-1 rounded">
                <BarChart className="h-4 w-4 text-gray-300" />
              </div>
              <div className="h-4 w-36 bg-gray-200 rounded"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-200 my-1" />

          {/* Sección de avance esperado */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="bg-gray-200 p-1 rounded">
                <LineChart className="h-4 w-4 text-gray-300" />
              </div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-10 bg-gray-200 rounded"></div>
                    <div className="h-5 w-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    <div className="h-5 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="h-5 w-12 bg-gray-200 rounded mb-1 ml-auto"></div>
                  <div className="h-3 w-20 bg-gray-200 rounded ml-auto"></div>
                </div>
              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full"></div>

              <div className="flex justify-end">
                <div className="h-5 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}