import { Outlet } from 'react-router-dom';
import { Header } from './dashboard/header';
import { useToasts } from '../../hooks';
import { ToasterWidget } from '../../widgets/toaster.widget';

function DashboardLayout() {
    const { toasts } = useToasts();

    return (
        <div className="min-h-screen bg-background">
            <div className="flex h-screen overflow-hidden">
                SIDEBAR
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Header />
                    <main>
                        <Outlet />
                    </main>
                    <ToasterWidget toasts={toasts} />
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;
