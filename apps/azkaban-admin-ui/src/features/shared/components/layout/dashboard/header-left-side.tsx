import { Button } from '../../ui/button';

interface Props {
	toggleSidebar: () => void;
}

export function HeaderLeftSide(props: Props) {
	const { toggleSidebar } = props;

	return (
		<div className="flex">
			<Button
				className="bg-indigo-500 hover:bg-indigo-600 lg:hidden"
				onClick={() => toggleSidebar()}
			>
				<span className="sr-only">Open sidebar</span>
				<svg
					className="h-6 w-6 fill-current"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="4" y="5" width="16" height="2" />
					<rect x="4" y="11" width="16" height="2" />
					<rect x="4" y="17" width="16" height="2" />
				</svg>
			</Button>
		</div>
	);
}
