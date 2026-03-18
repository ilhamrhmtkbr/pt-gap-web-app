// Komponen avatar / placeholder image
export default function Image({src}) {
    return (
        <img src={src} loading={"lazy"} decoding={"async"} alt={src} className="w-[111px] h-[111px] object-cover bg-[var(--bg-color)] border-[var(--border-color)] border rounded-full" />
    )
}
