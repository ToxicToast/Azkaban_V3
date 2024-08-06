import { SidebarHeader } from './sidebar/header';
import { SidebarLink } from './sidebar/link';
import { Group, Notebook, User, Cuboid } from 'lucide-react';
import { CubeIcon, DashboardIcon } from '@radix-ui/react-icons';
import {
	dashboardRoute,
	deleteUsersRoute,
	editUsersRoute,
	foodfolioBrandRoute,
	foodfolioBrandViewRoute,
	foodfolioCategoryAddRoute,
	foodfolioCategoryRoute,
	foodfolioCategoryViewRoute,
	foodfolioLocationRoute,
	groupsRoute,
	notificationsRoute,
	usersRoute,
	viewUsersRoute,
} from '../../../../../config/routes';

interface Props {
	sidebarOpen: boolean;
	toggleSidebar: () => void;
	version: string;
}

export function Sidebar(props: Props) {
	const { sidebarOpen, toggleSidebar, version } = props;

	return (
		<div>
			<div
				className={`fixed inset-0 z-40 bg-slate-300 bg-opacity-60 transition-opacity duration-200 dark:bg-slate-900 dark:bg-opacity-30 lg:z-auto lg:hidden ${
					sidebarOpen
						? 'opacity-100'
						: 'pointer-events-none opacity-0'
				}`}
			/>
			<div
				id="sidebar"
				className={`no-scrollbar lg:sidebar-expanded:!w-64 absolute left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-y-scroll border-r border-slate-200 bg-white p-4 transition-all duration-200 ease-in-out dark:border-slate-700 dark:bg-slate-800 lg:static lg:left-auto lg:top-auto lg:w-20 lg:translate-x-0 lg:overflow-y-auto 2xl:!w-64 ${
					sidebarOpen ? 'translate-x-0' : '-translate-x-64'
				}`}
			>
				<div className="mb-10 flex justify-between pr-3 sm:px-2">
					<button
						className="text-slate-500 hover:text-slate-400 lg:hidden"
						onClick={() => toggleSidebar()}
					>
						<span className="sr-only">Toggle sidebar</span>
						<svg
							className="h-6 w-6 fill-current"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
						</svg>
					</button>

					<a className="block" href="#">
						<svg width="32" height="32" viewBox="0 0 32 32">
							<defs>
								<linearGradient
									x1="28.538%"
									y1="20.229%"
									x2="100%"
									y2="108.156%"
									id="logo-a"
								>
									<stop
										stopColor="#A5B4FC"
										stopOpacity="0"
										offset="0%"
									/>
									<stop stopColor="#A5B4FC" offset="100%" />
								</linearGradient>
								<linearGradient
									x1="88.638%"
									y1="29.267%"
									x2="22.42%"
									y2="100%"
									id="logo-b"
								>
									<stop
										stopColor="#38BDF8"
										stopOpacity="0"
										offset="0%"
									/>
									<stop stopColor="#38BDF8" offset="100%" />
								</linearGradient>
							</defs>
							<rect
								fill="#6366F1"
								width="32"
								height="32"
								rx="16"
							/>
							<path
								d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
								fill="#4F46E5"
							/>
							<path
								d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
								fill="url(#logo-a)"
							/>
							<path
								d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
								fill="url(#logo-b)"
							/>
						</svg>
					</a>
				</div>

				<div className="space-y-8">
					<div>
						<SidebarHeader title="Azkaban" />
						<ul className="mb-3 mt-3">
							<SidebarLink
								title="Dashboard"
								path={dashboardRoute}
								icon={DashboardIcon}
							/>

							<SidebarLink
								title="Users"
								path={usersRoute}
								icon={User}
								otherPaths={[
									viewUsersRoute,
									deleteUsersRoute,
									editUsersRoute,
								]}
							/>

							<SidebarLink
								title="Groups"
								path={groupsRoute}
								icon={Group}
							/>

							<SidebarLink
								title="Notifications"
								path={notificationsRoute}
								icon={Notebook}
							/>
						</ul>

						<SidebarHeader title="FoodFolio" />
						<ul className="mb-3 mt-3">
							<SidebarLink
								title="Categories"
								path={foodfolioCategoryRoute}
								icon={CubeIcon}
								otherPaths={[
									foodfolioCategoryViewRoute,
									foodfolioCategoryAddRoute,
								]}
							/>
							<SidebarLink
								title="Brands"
								path={foodfolioBrandRoute}
								icon={CubeIcon}
								otherPaths={[foodfolioBrandViewRoute]}
							/>
							<SidebarLink
								title="Products"
								path="/foodfolio/products"
								icon={CubeIcon}
							/>
							<SidebarLink
								title="Locations"
								path={foodfolioLocationRoute}
								icon={CubeIcon}
							/>
							<SidebarLink
								title="Sizes"
								path="/foodfolio/sizes"
								icon={CubeIcon}
							/>
							<SidebarLink
								title="Types"
								path="/foodfolio/types"
								icon={CubeIcon}
							/>
							<SidebarLink
								title="Receipts"
								path="/foodfolio/receipts"
								icon={CubeIcon}
							/>
							<SidebarLink
								title="Warehouses"
								path="/foodfolio/warehouses"
								icon={CubeIcon}
							/>
						</ul>

						<SidebarHeader title="Twitch" />
						<ul className="mb-3 mt-3">
							<SidebarLink
								title="Viewers"
								path="/twitch/viewers"
								icon={Cuboid}
							/>
							<SidebarLink
								title="Streams"
								path="/twitch/streams"
								icon={Cuboid}
							/>
							<SidebarLink
								title="Messages"
								path="/twitch/messages"
								icon={Cuboid}
							/>
							<SidebarLink
								title="Ban List"
								path="/twitch/ban-list"
								icon={Cuboid}
							/>
						</ul>

						<SidebarHeader title="Co-Working" />
						<ul className="mb-3 mt-3">
							<SidebarLink
								title="Task List"
								path="/co-working/task-list"
								icon={Cuboid}
							/>
						</ul>

						<SidebarHeader title={`Version: ${version}`} />
					</div>
				</div>
			</div>
		</div>
	);
}
