import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap, Eye, ChartNoAxesCombined } from "lucide-react"
import HeaderSkeleton from "@/components/loading/headerSkeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface Student {
    nombre?: string;
    planesEstudios?: Array<{
        unidadAcademica?: {
            nombreCarrera?: string;
        };
    }>;
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

export function Header({ onHandleOpen, id }: {  onHandleOpen: () => void, id: string }) {
    const [student, setStudent] = useState<Student>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const resToken = await fetch(`/api/auth/token`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    } 
                });
            
                if (!resToken.ok) {
                    throw new Error('Error fetching token');
                }

                const token = await resToken.json();

                const response = await fetch(`/api/student/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token.token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching student data');
                }

                const data = await response.json();
                setStudent(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching student:', error);
                setLoading(false);
            }
        };

        fetchStudent();
    }, [])

    if(loading) return <HeaderSkeleton />;

    return (
        <>
            <title>{student?.nombre}</title>
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={mainVariants}
                className="mb-[2rem] rounded-lg border bg-card p-6 shadow-s"
            >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarImage src="/avatar.webp" alt="@duoc" />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                    <div>
                    <h1 className="text-2xl font-bold">{student?.nombre}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{student?.planesEstudios?.[0]?.unidadAcademica?.nombreCarrera}</span>
                    </div>
                </div>
                </div>
            </div>
            </motion.div>
        </>
    )
}