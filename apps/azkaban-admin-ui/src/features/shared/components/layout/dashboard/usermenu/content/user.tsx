interface Props {
    username: string;
}

export function UserMenuContentUser(props: Props) {
    const { username } = props;
    return (
        <div className="px-4 pb-3 pt-1.5 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
            Welcome {username}!
        </div>
    );
}
