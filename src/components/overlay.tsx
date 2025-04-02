import { useStore } from '@nanostores/preact';
import { stats } from '@/context/statsview';

export default function Overlay() {
    const $stats = useStore(stats);

    return (
        $stats && <div className="fixed inset-0 w-full h-full bg-black/40 z-30 pointer-events-auto overflow-hidden overscroll-none touch-move-none animate-fade-in"/>
    )
}