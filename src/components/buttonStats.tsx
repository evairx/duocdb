import { useStore } from '@nanostores/preact';
import { stats } from '@/context/statsview';

import StatsSvg from '@/assets/svg/stats';

export default function ButtonStats() {
    const $stats = useStore(stats);

    return (
        <button 
            onClick={() => stats.set(!$stats)} 
            className="flex justify-center items-center	bg-black h-[2.2rem] w-[10rem] text-white text-sm rounded-2xl gap-2 cursor-pointer px-2 py-2 scale-button transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-60 [@media(max-width:711px)]:w-full [@media(max-width:711px)]:mt-2"
        >
            <StatsSvg /> Ver Estadisticas
        </button>
    )
}