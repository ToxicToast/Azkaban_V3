import { Notification } from '../../../types';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { NotificationTriggerPartial } from './notifications/notification-trigger';

interface Props {
    dropdownOpen: boolean;
    setDropdownOpen: (value: boolean) => void;
    notifications: Array<Notification>;
    removeNotification: (id: string) => void;
}

export function Notifications(props: Props) {
    const { dropdownOpen, setDropdownOpen, notifications, removeNotification } =
        props;

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
