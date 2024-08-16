import { Show } from '../../../../widgets';
import { SidebarLink } from './link';
import { Cuboid } from 'lucide-react';
import { Badge } from '../../../ui';

interface Props {
	canSee: boolean;
}

export function SidebarTwitch(props: Props) {
	const { canSee } = props;

	return (
		<Show show={canSee}>
			<SidebarLink
				title="Viewers"
				path="/twitch/viewers"
				icon={<Cuboid className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
			<SidebarLink
				title="Streams"
				path="/twitch/streams"
				icon={<Cuboid className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
			<SidebarLink
				title="Messages"
				path="/twitch/messages"
				icon={<Cuboid className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
			<SidebarLink
				title="Ban List"
				path="/twitch/ban-list"
				icon={<Cuboid className="h-4 w-4 shrink-0" />}
				disabled={true}
			/>
		</Show>
	);
}
