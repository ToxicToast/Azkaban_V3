import { LatestUser } from '../atoms/azkaban/latest-user.atom';
import { LatestNotification } from '../atoms/azkaban/latest-notification.atom';
import { LatestGroup } from '../atoms/azkaban/latest-group.atom';

export function AzkabanLatest() {
	return (
		<>
			<LatestNotification />
			<LatestUser />
			<LatestGroup />
		</>
	);
}
