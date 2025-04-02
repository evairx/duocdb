import { useStore } from '@nanostores/react';
import { stats } from '@/context/statsview';

export default function Overlay() {
    const $stats = useStore(stats);

    return (
        $stats && 
        <div 
            className="fixed inset-0 w-full h-full bg-black/40 backdrop-blur-xs z-30 pointer-events-auto overflow-hidden overscroll-none touch-move-none animate-fade-in [@media(max-width:711px)]:backdrop-blur-none [@media(max-width:711px)]:backdrop-saturate-0 [@media(max-width:711px)]:backdrop-brightness-50"
        />
    )
}