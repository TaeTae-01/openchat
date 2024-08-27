import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div>
            <h2>Layout!!</h2>
            <Outlet />
        </div>
    );
}

export default Layout;