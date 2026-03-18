import MemberLayout from "../../shared/layouts/MemberLayout.jsx";
import {ProfileForm} from "../../features/member/profile/index.js";

export default function ProfilePage() {
    return (
        <MemberLayout>
            <ProfileForm />
        </MemberLayout>
    )
}
