interface Props {
    title: string;
}

export function SidebarHeader(props: Props) {
    const { title } = props;

    return (
        <h3 className="pl-3 text-xs font-semibold uppercase text-slate-500">
            <span
                className="lg:sidebar-expanded:hidden hidden w-6 text-center lg:block 2xl:hidden"
                aria-hidden="true"
            >
                •••
            </span>
            <span className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                {title}
            </span>
        </h3>
    );
}
