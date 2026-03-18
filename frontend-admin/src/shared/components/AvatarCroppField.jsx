import {AvatarCrop} from "./AvatarCropper.jsx";
import {useController} from "react-hook-form";

export function AvatarCropField({ control }) {  // ← terima control sebagai prop
    const { field } = useController({ name: 'image', control, defaultValue: null })

    return (
        <AvatarCrop onCropComplete={(file) => field.onChange(file)} />
    )
}