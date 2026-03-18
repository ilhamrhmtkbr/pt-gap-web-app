import { useState, useRef } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Button from "./Button.jsx";

const ASPECT_PRESETS = [
    { label: 'Free',       value: undefined,   icon: '⊞' },
    { label: 'Square',     value: 1 / 1,       icon: '□' },
    { label: 'Landscape',  value: 16 / 9,      icon: '▬' },
    { label: 'Portrait',   value: 9 / 16,      icon: '▮' },
    { label: '4:3',        value: 4 / 3,       icon: '⬜' },
    { label: '3:4',        value: 3 / 4,       icon: '▯' },
]

async function getCroppedBlob(imageEl, crop) {
    const canvas = document.createElement('canvas')
    const scaleX = imageEl.naturalWidth / imageEl.width
    const scaleY = imageEl.naturalHeight / imageEl.height

    canvas.width = crop.width * scaleX
    canvas.height = crop.height * scaleY

    const ctx = canvas.getContext('2d')
    ctx.drawImage(
        imageEl,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0, 0,
        canvas.width,
        canvas.height
    )

    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => blob ? resolve(blob) : reject('Canvas empty'), 'image/jpeg', 0.9)
    })
}

export function AvatarCrop({ onCropComplete }) {
    const [imgSrc, setImgSrc] = useState(null)
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const [preview, setPreview] = useState(null)
    const [selectedPreset, setSelectedPreset] = useState(ASPECT_PRESETS[0]) // default: Free
    const imgRef = useRef(null)

    function onFileChange(e) {
        const file = e.target.files?.[0]
        if (!file) return
        setPreview(null)
        const reader = new FileReader()
        reader.onload = () => setImgSrc(reader.result)
        reader.readAsDataURL(file)
    }

    function onImageLoad(e) {
        const { width, height } = e.currentTarget
        applyCrop(width, height, selectedPreset.value)
    }

    function applyCrop(width, height, aspect) {
        if (aspect === undefined) {
            // Free crop — pakai seluruh gambar sebagai default
            setCrop({ unit: '%', x: 10, y: 10, width: 80, height: 80 })
        } else {
            const initial = centerCrop(
                makeAspectCrop({ unit: '%', width: 80 }, aspect, width, height),
                width, height
            )
            setCrop(initial)
        }
    }

    function handlePresetChange(preset) {
        setSelectedPreset(preset)
        if (imgRef.current) {
            applyCrop(imgRef.current.width, imgRef.current.height, preset.value)
        }
    }

    async function handleConfirm() {
        if (!completedCrop || !imgRef.current) return
        const blob = await getCroppedBlob(imgRef.current, completedCrop)
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })

        setPreview(URL.createObjectURL(blob))
        setImgSrc(null)
        onCropComplete(file)
    }

    function handleReset() {
        setPreview(null)
        setImgSrc(null)
        setSelectedPreset(ASPECT_PRESETS[0])
        onCropComplete(null)
    }

    return (
        <div className="grid gap-2">
            <label className="capitalize font-['Medium',_ui-sans-serif]">Image</label>

            {/* Preview hasil crop */}
            {preview && (
                <div className="flex items-center gap-3">
                    <img
                        src={preview}
                        alt="preview"
                        className="max-w-[200px] max-h-[200px] object-cover rounded-[var(--radius-s)] border border-[var(--border-color)]"
                    />
                    <button
                        type="button"
                        onClick={handleReset}
                        className="text-sm text-[var(--danger-color)] underline cursor-pointer"
                    >
                        Ganti foto
                    </button>
                </div>
            )}

            {/* Input file */}
            {!preview && !imgSrc && (
                <label className="cursor-pointer border border-dashed border-[var(--border-color)] rounded-[var(--radius-s)] p-4 text-center text-sm text-[var(--text-color)] hover:bg-[var(--bg-color)]">
                    <span>Klik untuk pilih foto</span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                        className="hidden"
                    />
                </label>
            )}

            {/* Crop UI */}
            {imgSrc && (
                <div className="grid gap-2">
                    {/* Aspect ratio selector */}
                    <div className="flex flex-wrap gap-1">
                        {ASPECT_PRESETS.map(preset => (
                            <button
                                key={preset.label}
                                type="button"
                                onClick={() => handlePresetChange(preset)}
                                className={`
                                    px-2 py-1 text-xs rounded border cursor-pointer transition-colors
                                    ${selectedPreset.label === preset.label
                                    ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)]'
                                    : 'border-[var(--border-color)] text-[var(--text-color)] hover:bg-[var(--bg-color)]'
                                }
                                `}
                            >
                                {preset.icon} {preset.label}
                            </button>
                        ))}
                    </div>

                    <ReactCrop
                        crop={crop}
                        onChange={setCrop}
                        onComplete={setCompletedCrop}
                        aspect={selectedPreset.value}
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            onLoad={onImageLoad}
                            style={{ maxHeight: 300, width: '100%', objectFit: 'contain' }}
                        />
                    </ReactCrop>

                    <div className="flex gap-2">
                        <Button variety={'button'} shape={'shape-2'} text={'Konfirmasi'} onClick={handleConfirm}/>
                        <Button variety={'button'} shape={'shape-1'} text={'Batal'} onClick={handleReset}/>
                    </div>
                </div>
            )}
        </div>
    )
}