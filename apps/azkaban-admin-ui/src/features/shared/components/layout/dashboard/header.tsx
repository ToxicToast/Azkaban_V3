import { HeaderLeftSide } from './header-left-side';
import { HeaderRightSide } from './header-right-side';
import { Notifications } from './notifications';
import { Notification } from '../../../types';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

interface Props {
    sidebarOpen: boolean;
    onSidebarChange: (value: boolean) => void;
    username: string;
    onSignout: () => void;
    notifications?: Array<Notification>;
    removeNotification: (id: string) => void;
}

export function Header(props: Props) {
    const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [usermenuOpen, setUsermenuOpen] = useState<boolean>(false);

    const {
        sidebarOpen,
        onSidebarChange,
        username,
        onSignout,
        notifications,
        removeNotification,
    } = props;

    return (
        <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    <HeaderLeftSide />
                    <HeaderRightSide
                        searchModalOpen={searchModalOpen}
                        onSearchModalChange={() =>
                            setSearchModalOpen((prev) => !prev)
                        }
                    >
                        {JSON.stringify(searchModalOpen)}
                        <Notifications
                            dropdownOpen={dropdownOpen}
                            setDropdownOpen={(value: boolean) =>
                                setDropdownOpen(value)
                            }
                            notifications={notifications ?? []}
                            removeNotification={(id: string) =>
                                removeNotification(id)
                            }
                        />
                        <ThemeToggle />
                        <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
                        UserMenu
                    </HeaderRightSide>
                </div>
            </div>
        </header>
    );
}
