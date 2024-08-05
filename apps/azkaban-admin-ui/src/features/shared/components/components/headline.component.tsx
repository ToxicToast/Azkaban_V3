import { Badge, Button } from '../../index';
import { ChevronLeft } from 'lucide-react';

interface Props {
	headline: string;
	badgeText: string;
	onNavigateBack?: () => void;
}

export function Headline(props: Props) {
	const { headline, badgeText, onNavigateBack } = props;

	return (
		<>
			<Button
				variant="outline"
				size="icon"
				className="h-7 w-7"
				onClick={() => onNavigateBack?.()}
			>
				<ChevronLeft className="h-4 w-4" />
				<span className="sr-only">Back</span>
			</Button>
			<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
				{headline}
			</h1>
			<Badge>{badgeText}</Badge>
		</>
	);
}
