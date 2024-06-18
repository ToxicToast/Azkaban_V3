import { PropsWithChildren } from 'react';

export function HeaderRightSide(props: PropsWithChildren) {
    const { children } = props;

    return <div className="flex items-center space-x-3">{children}</div>;
}
