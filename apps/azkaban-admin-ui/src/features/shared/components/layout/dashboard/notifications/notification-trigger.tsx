interface Props {
    dropdownOpen: boolean;
}

export function NotificationTriggerPartial(props: Props) {
    const { dropdownOpen } = props;

    return (
        <div
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600/80 ${
                dropdownOpen && 'bg-slate-200'
            }`}
        >
            <span className="sr-only">Notifications</span>
            <svg
                className="h-4 w-4"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className="fill-current text-slate-500 dark:text-slate-400"
                    d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z"
                />
                <path
                    className="fill-current text-slate-400 dark:text-slate-500"
                    d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z"
                />
            </svg>
        </div>
    );
}
