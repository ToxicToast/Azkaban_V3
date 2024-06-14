import { Outlet } from 'react-router-dom';
import { Header } from './dashboard/header';
import { useToasts } from '../../hooks';

function DashboardLayout() {
    const { toasts, removeToast } = useToasts();

    return (
        <div className="min-h-screen bg-background">
            <div className="flex h-screen overflow-hidden">
                SIDEBAR
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    {JSON.stringify(toasts, null, 4)}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
