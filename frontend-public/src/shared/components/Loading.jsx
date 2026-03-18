/*
 * Loading.jsx — Berisi 3 varian loading indicator:
 *   1. Spinner       — animasi putar
 *   2. Loading Bar   — progress bar
 *   3. Skeleton      — placeholder konten
 *
 * Tambahkan keyframes di global CSS kamu (app.css / index.css):
 *
 * @keyframes fillProgress {
 *   0%   { width: 0; }
 *   100% { width: 100%; }
 * }
 * @keyframes skeleton-loading {
 *   0%   { background-position: 200% 0; }
 *   100% { background-position: -200% 0; }
 * }
 */

export function Spinner() {
    return (
        <div className="animate-spin rounded-full border-4 border-transparent border-t-[var(--primary-color)] bg-transparent w-[var(--x)] h-[var(--x)]" />
    )
}

export function LoadingBar() {
    return (
        <div className="relative h-[var(--s)] max-w-sm overflow-hidden rounded-[99px] bg-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
            <div className="progress h-full w-0 rounded-[99px] bg-[var(--primary-color)] [animation:fillProgress_11s_ease-out_forwards]" />
        </div>
    )
}

export function Skeleton({ className = 'w-full h-20' }) {
    return (
        <div className={`${className} rounded-md animate-[skeleton-loading_2s_infinite] bg-[linear-gradient(90deg,var(--border-color),var(--transtext-color)_50%,var(--border-color)_75%)] bg-[length:200%_100%]`} />
    )
}

// Default export semua sekaligus (untuk tampilan showcase)
export default function Loading() {
    return (
        <div className="flex flex-col gap-4">
            <Spinner />
            <LoadingBar />
            <Skeleton />
        </div>
    )
}
