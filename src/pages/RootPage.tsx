import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const RootPage: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}
export default RootPage
