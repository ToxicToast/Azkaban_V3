import { Outlet } from 'react-router-dom';
import { Header } from './dashboard/header';

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex h-screen overflow-hidden">
                SIDEBAR
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    TOASTER
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
