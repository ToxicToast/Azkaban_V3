import { Notification } from '../../../types';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { NotificationTriggerPartial } from './notifications/notification-trigger';
import { useState } from 'react';

interface Props {
    notifications: Array<Notification>;
    removeNotification: (id: string) => void;
}

export function Notifications(props: Props) {
    const { notifications, removeNotification } = props;
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    return (
        <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <PopoverTrigger>
                <NotificationTriggerPartial dropdownOpen={dropdownOpen} />
            </PopoverTrigger>
            <PopoverContent className="w-80">
                {JSON.stringify(notifications, null, 4)}
            </PopoverContent>
        </Popover>
    );
}
