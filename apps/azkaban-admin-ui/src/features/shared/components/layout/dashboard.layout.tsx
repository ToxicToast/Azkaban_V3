import { Outlet } from 'react-router-dom';
import { Header } from './dashboard/header';
import { useToasts } from '../../hooks';
import { ToasterWidget } from '../../widgets/toaster.widget';
import { useCallback, useState } from 'react';
import { useAuthState } from '../../store/auth/auth.hook';
import { Sidebar } from './dashboard/sidebar';
import { useConfigState } from '../../store/config/config.hook';

function DashboardLayout() {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const { toasts } = useToasts();
	const { username } = useAuthState();
	const { version } = useConfigState();

	const onToggleSidebar = useCallback(() => {
		if (sidebarOpen) {
			setSidebarOpen(false);
		} else if (!sidebarOpen) {
			setSidebarOpen(true);
		}
	}, [sidebarOpen]);

	return (
		<div className="min-h-screen bg-background">
			<div className="flex h-screen overflow-hidden">
				<Sidebar
					sidebarOpen={sidebarOpen}
					toggleSidebar={() => onToggleSidebar()}
					version={version}
				/>
				<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
					<Header username={username ?? ''} />
					<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
						<Outlet />
					</main>
					<ToasterWidget toasts={toasts} />
				</div>
			</div>
		</div>
	);
}

export default DashboardLayout;
