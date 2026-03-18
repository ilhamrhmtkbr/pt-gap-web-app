import MemberLayout from "../../shared/layouts/MemberLayout.jsx";
import {TransactionsData} from "../../features/member/transaction/index.js";

export default function () {
    return (
        <MemberLayout>
            <TransactionsData />
        </MemberLayout>
    )
}