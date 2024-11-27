/* eslint-disable react/prop-types */
import { AdminDashboard } from "./AdminDashboard"
import { UserDashboard } from "./UserDashboard"


function Dashboard({ user }) {
    return (
        <>
            {
                user === "admin" ? (
                    <AdminDashboard />
                ) : (
                    <UserDashboard />
                )
            }
        </>
    )
}
export default Dashboard


