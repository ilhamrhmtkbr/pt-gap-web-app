import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-gray-500">Halaman tidak ditemukan</p>
      <Link to="/" className="text-blue-600 hover:underline">Kembali ke Beranda</Link>
    </div>
  )
}
