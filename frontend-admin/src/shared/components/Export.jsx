import { useState, useRef } from 'react'
import Modal from './Modal'
import api from "../../lib/axios.js";

/*
 * Export.jsx — Plain React
 *
 * Props:
 *   - exportPdfUrl   : URL endpoint export PDF (string)
 *   - exportExcelUrl : URL endpoint export Excel (string)
 *   - branches       : Array of { id, name } untuk dropdown cabang
 *
 * Cara pake:
 *   <Export
 *       exportPdfUrl="/api/reports/export/pdf"
 *       exportExcelUrl="/api/reports/export/excel"
 *       branches={branchList}
 *   />
 */

function getFirstDayOfMonth() {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
}

function getTodayDate() {
    return new Date().toISOString().split('T')[0]
}

function getMondayOfWeek() {
    const now = new Date()
    const day = now.getDay() || 7
    const diff = now.getDate() - day + 1
    const monday = new Date(now.setDate(diff))
    return monday.toISOString().split('T')[0]
}

function getFirstDayOfLastMonth() {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0]
}

function getLastDayOfLastMonth() {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0]
}

export default function Export({ exportPdfUrl, exportExcelUrl, branches = [] }) {
    const modalRef = useRef(null)

    const [form, setForm] = useState({
        start_date: getFirstDayOfMonth(),
        end_date: getTodayDate(),
        branch_id: '',
        group_by: 'daily',
    })

    const [isExporting, setIsExporting] = useState({ pdf: false, excel: false })

    async function handleExport(type) {
        if (form.start_date > form.end_date) {
            alert('Tanggal mulai tidak boleh lebih besar dari tanggal akhir.')
            return
        }
        setIsExporting(prev => ({ ...prev, [type]: true }))
        try {
            let endpoint = type === 'pdf' ? exportPdfUrl : exportExcelUrl

            const res = await api.post(
                endpoint,
                { ...form },
                { responseType: 'blob' }
            )

            const blob = new Blob([res.data])
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = `laporan-pdf.${type === 'pdf' ? 'pdf' : 'xlsx'}`
            link.click()
            URL.revokeObjectURL(link.href)
        } catch (err) {
            console.error('Export gagal:', err)
        } finally {
            setTimeout(() => setIsExporting(prev => ({ ...prev, [type]: false })), 2000)
        }
    }

    function setPreset(preset) {
        const today = getTodayDate()
        const now   = new Date()

        const presets = {
            today:      { start_date: today, end_date: today },
            this_week:  { start_date: getMondayOfWeek(), end_date: today },
            this_month: { start_date: getFirstDayOfMonth(), end_date: today },
            last_month: { start_date: getFirstDayOfLastMonth(), end_date: getLastDayOfLastMonth() },
            this_year:  { start_date: `${now.getFullYear()}-01-01`, end_date: today },
        }

        if (presets[preset]) {
            setForm(prev => ({ ...prev, ...presets[preset] }))
        }
    }

    const presetList = [
        { key: 'today',      label: 'Hari Ini' },
        { key: 'this_week',  label: 'Minggu Ini' },
        { key: 'this_month', label: 'Bulan Ini' },
        { key: 'last_month', label: 'Bulan Lalu' },
        { key: 'this_year',  label: 'Tahun Ini' },
    ]

    return (
        <>
            <div
                onClick={() => modalRef.current.toggleModal()}
                className="cursor-pointer group outline-none flex items-center justify-center gap-x-4 py-[calc(var(--m)/2)] px-[var(--m)] h-max min-w-[77px] w-max rounded-[var(--radius-s)] text-[length:var(--s)] border border-solid border-[var(--border-color)] hover:outline-4 hover:outline-solid hover:outline-[var(--transprimary-color)] hover:border-[1px] hover:border-solid hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
            >
                <svg className="max-w-[var(--l)] max-h-[var(--l)] fill-[var(--text-color)] group-hover:fill-[var(--primary-color)]"
                    xmlns="http://www.w3.org/2000/svg" height="800" width="800" viewBox="0 0 459.636 459.636">
                    <path d="M424.621 50.643H136.299c-19.307 0-35.015 15.707-35.015 35.014v52.272h41.669c12.94-31.165 53.868-39.785 78.182-15.461l73.448 73.448c18.737 18.736 18.741 49.064.001 67.802l-73.447 73.447c-24.303 24.307-65.232 15.735-78.184-15.458h-41.669v52.272c0 19.307 15.707 35.014 35.015 35.014h288.322c19.307 0 35.015-15.707 35.015-35.014V85.657c0-19.307-15.707-35.014-35.015-35.014zM171.254 303.266c0 14.182 17.221 21.362 27.281 11.3l73.449-73.449c6.241-6.241 6.242-16.359 0-22.6l-73.449-73.449c-10.038-10.043-27.281-2.903-27.281 11.3v13.522H15.981C7.155 169.891 0 177.046 0 185.872v87.891c0 8.826 7.155 15.981 15.981 15.981l155.273.001v13.521z" />
                </svg>
                <span className="capitalize font-['Medium',_ui-sans-serif] text-[length:var(--s)]">Export</span>
            </div>

            <Modal ref={modalRef} title="Export" footer={<p>Filter</p>}>
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">Export Laporan Penjualan</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Pilih filter lalu export dalam format yang diinginkan</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>

                {/* Preset Periode */}
                <div className="px-6 pt-4">
                    <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Preset Periode</p>
                    <div className="flex flex-wrap gap-2">
                        {presetList.map(preset => (
                            <button
                                key={preset.key}
                                onClick={() => setPreset(preset.key)}
                                type="button"
                                className="px-3 py-1.5 text-xs font-medium rounded-full border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter Form */}
                <div className="px-6 py-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                        <input
                            type="date"
                            value={form.start_date}
                            max={form.end_date}
                            onChange={e => setForm(prev => ({ ...prev, start_date: e.target.value }))}
                            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-150"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Tanggal Akhir</label>
                        <input
                            type="date"
                            value={form.end_date}
                            min={form.start_date}
                            max={getTodayDate()}
                            onChange={e => setForm(prev => ({ ...prev, end_date: e.target.value }))}
                            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-150"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Cabang</label>
                        <select
                            value={form.branch_id}
                            onChange={e => setForm(prev => ({ ...prev, branch_id: e.target.value }))}
                            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-150"
                        >
                            <option value="">Semua Cabang</option>
                            {branches.map(branch => (
                                <option key={branch.id} value={branch.id}>{branch.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Tampilkan per</label>
                        <select
                            value={form.group_by}
                            onChange={e => setForm(prev => ({ ...prev, group_by: e.target.value }))}
                            className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-150"
                        >
                            <option value="daily">Harian</option>
                            <option value="monthly">Bulanan</option>
                        </select>
                    </div>
                </div>

                <div className="border-t border-gray-100 mx-6" />

                {/* Export Buttons */}
                <div className="px-6 py-4 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => handleExport('pdf')}
                        disabled={isExporting.pdf}
                        type="button"
                        className="flex items-center justify-center gap-2.5 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                    >
                        {isExporting.pdf
                            ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 17h8v-1H8v1zm0-3h8v-1H8v1zm0-3h5v-1H8v1z" /></svg>
                        }
                        <span>{isExporting.pdf ? 'Menggenerate...' : 'Export PDF'}</span>
                    </button>

                    <button
                        onClick={() => handleExport('excel')}
                        disabled={isExporting.excel}
                        type="button"
                        className="flex items-center justify-center gap-2.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium text-sm rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
                    >
                        {isExporting.excel
                            ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                            : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12 10 8.72H8.22L7 10.87 5.78 8.72H4L6 12 4.03 15.28H5.82M13.88 19.5V17H8.25V19.5M13.88 15.75V12.63H8.25V15.75M13.88 11.38V8.25H8.25V11.38M20.75 19.5V17H15.13V19.5M20.75 15.75V12.63H15.13V15.75M20.75 11.38V8.25H15.13V11.38" /></svg>
                        }
                        <span>{isExporting.excel ? 'Menggenerate...' : 'Export Excel'}</span>
                    </button>

                    <div className="flex items-center gap-2 ml-auto text-xs text-gray-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>File akan ter-download otomatis</span>
                    </div>
                </div>
            </Modal>
        </>
    )
}
