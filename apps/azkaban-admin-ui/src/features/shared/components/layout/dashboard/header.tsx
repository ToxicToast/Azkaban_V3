import { HeaderLeftSide } from './header-left-side';
import { HeaderRightSide } from './header-right-side';
import { Notifications } from './notifications';
import { Notification } from '../../../types';
import { ThemeToggle } from './theme-toggle';
import { UserMenu } from './user-menu';
import { Search } from './search';

interface Props {
    sidebarOpen: boolean;
    onSidebarChange: (value: boolean) => void;
    username: string;
    onSignout: () => void;
    notifications?: Array<Notification>;
    removeNotification: (id: string) => void;
}

export function Header(props: Props) {
    const {
        sidebarOpen,
        onSidebarChange,
        username,
        onSignout,
        notifications,
        removeNotification,
    } = props;

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-[#182235]">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="-mb-px flex h-16 items-center justify-between">
                    <HeaderLeftSide />
                    <HeaderRightSide>
                        <Search />
                        <Notifications
                            notifications={notifications ?? []}
                            removeNotification={(id: string) =>
                                removeNotification(id)
                            }
                        />
                        <ThemeToggle />
                        <hr className="h-6 w-px border-none bg-slate-200 dark:bg-slate-700" />
                        <UserMenu
                            username={username}
                            onSignOut={() => onSignout()}
                        />
                    </HeaderRightSide>
                </div>
            </div>
        </header>
    );
}
