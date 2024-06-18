import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui';
import { UserMenuTrigger } from './usermenu/trigger';
import { UserMenuContent } from './usermenu/content';

interface Props {
    username: string;
}

export function UserMenu(props: Props) {
    const { username } = props;
    const [usermenuOpen, setUsermenuOpen] = useState<boolean>(false);

    return (
        <Popover
            open={usermenuOpen}
            onOpenChange={(value) => setUsermenuOpen(value)}
        >
            <PopoverTrigger>
                <UserMenuTrigger username={username} />
            </PopoverTrigger>

            <PopoverContent className="w-60">
                <UserMenuContent username={username} />
            </PopoverContent>
        </Popover>
    );
}
