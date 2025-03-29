import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { motion } from "framer-motion"

// Reusable skeleton component
const Skeleton = ({ className = "", style = {} }) => (
  <div className={`bg-zinc-200 rounded-md animate-pulse ${className}`} style={style} />
)

// Stats card skeleton component
const StatsCardSkeleton = () => (
  <div className="rounded-lg border p-4 bg-white shadow-sm mt-2">
    <Skeleton className="h-5 w-32" />
    <Skeleton className="h-5 w-20 mt-3" />
    <Skeleton className="h-4 w-36 mt-3" />
  </div>
)

// Table row skeleton component
const TableRowSkeleton = ({ index }: { index: number }) => (
  <TableRow className="animate-pulse" style={{ animationDelay: `${index * 0.05}s` }}>
    <TableCell className="px-4"><Skeleton className="h-4 w-[80%]" /></TableCell>
    <TableCell className="px-4"><Skeleton className="h-4 w-16" /></TableCell>
    <TableCell className="px-4"><Skeleton className="h-6 w-24" /></TableCell>
    <TableCell className="px-4"><Skeleton className="h-4 w-8" /></TableCell>
    <TableCell className="text-right px-4"><Skeleton className="h-4 w-8 ml-auto" /></TableCell>
  </TableRow>
)

// Constants
const STATS_CARDS_COUNT = 4;
const TABLE_ROWS_COUNT = 5;
const SEMESTERS_COUNT = 3;

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

export default function AcademicHistorySkeleton() {
  return (
    <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={mainVariants}
    >
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div className="w-full md:w-64">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="w-full">
        <div className="grid w-full grid-cols-2 bg-zinc-100 rounded-t-lg overflow-hidden">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={`tab-${i}`} className="h-7 m-1" />
          ))}
        </div>

        <div className="mt-4">
          <div className="grid gap-6 md:grid-cols-4">
            {[...Array(STATS_CARDS_COUNT)].map((_, i) => (
              <StatsCardSkeleton key={`stat-${i}`} />
            ))}
          </div>

          <div className="rounded-lg border overflow-hidden mt-6">
            <Table>
              <TableCaption>
                <Skeleton className="h-6 w-64 mx-auto" />
              </TableCaption>
              <TableHeader className="bg-zinc-100">
                <TableRow>
                  {['Asignatura', 'Código', 'Estado', 'Obligatorio', 'Nota Final'].map((header) => (
                    <TableHead 
                      key={header}
                      className={`h-12 px-4 text-left align-middle font-bold text-muted-foreground ${
                        header === 'Asignatura' ? 'w-[350px]' : 
                        header === 'Nota Final' ? 'text-right' : 'w-[250px]'
                      }`}
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(TABLE_ROWS_COUNT)].map((_, i) => (
                  <TableRowSkeleton key={`row-${i}`} index={i} />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="hidden mt-4">
          <div className="grid gap-6 md:grid-cols-4">
            {[...Array(STATS_CARDS_COUNT)].map((_, i) => (
              <StatsCardSkeleton key={`overall-stat-${i}`} />
            ))}
          </div>

          {[...Array(SEMESTERS_COUNT)].map((_, semesterIndex) => (
            <div key={`semester-${semesterIndex}`} className="rounded-lg border overflow-hidden mt-6">
              <div className="p-4 bg-zinc-100">
                <Skeleton className="h-6 w-64" />
              </div>
              <div className="p-4 space-y-4">
                {[...Array(3)].map((_, rowIndex) => (
                  <div key={`semester-row-${rowIndex}`} className="grid grid-cols-5 gap-4">
                    {[...Array(5)].map((_, cellIndex) => (
                      <Skeleton
                        key={`cell-${cellIndex}`}
                        className="h-5"
                        style={{ animationDelay: `${(semesterIndex * 15 + rowIndex * 5 + cellIndex) * 0.03}s` }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}