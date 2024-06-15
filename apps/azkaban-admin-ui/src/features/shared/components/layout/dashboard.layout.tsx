import { Outlet } from 'react-router-dom';
import { Header } from './dashboard/header';
import { useToasts } from '../../hooks';
import { ToasterWidget } from '../../widgets/toaster.widget';
import { useState } from 'react';
import { useAuthState } from '../../store/auth/auth.hook';
import { Sidebar } from './dashboard/sidebar';

function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const { toasts } = useToasts();
    const { username } = useAuthState();

    return (
        <div className="min-h-screen bg-background">
            <div className="flex h-screen overflow-hidden">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    closeSidebar={() => setSidebarOpen(false)}
                />
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    <Header
                        sidebarOpen={sidebarOpen}
                        onSidebarChange={(value: boolean) =>
                            setSidebarOpen(value)
                        }
                        username={username ?? ''}
                        onSignout={() => {
                            console.log('signout');
                        }}
                        notifications={[]}
                        removeNotification={(id: string) => {
                            console.log(id);
                        }}
                    />
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
