import { HeaderLeftSide } from './header-left-side';
import { HeaderRightSide } from './header-right-side';

export function Header() {
  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <HeaderLeftSide />
          <HeaderRightSide>
            Notifications ThemeToggle
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            UserMenu
          </HeaderRightSide>
        </div>
      </div>
    </header>
  );
}
