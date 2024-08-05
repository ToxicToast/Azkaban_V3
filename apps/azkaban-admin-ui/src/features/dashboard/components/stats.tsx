import { Card, CardContent, CardHeader, CardTitle, Show } from '../../shared';
import { ReactNode } from 'react';
import { Optional } from '@toxictoast/azkaban-base-types';

interface Props {
	title: string;
	icon: ReactNode;
	statistic: string;
	fromLastMonth?: Optional<string>;
}

export function Stats(props: Props) {
	const { title, icon, statistic, fromLastMonth } = props;

	return (
		<Card className="duration-200 ease-in-out hover:bg-accent">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{statistic}</div>
				<Show show={fromLastMonth !== undefined}>
					<p className="text-xs text-muted-foreground">
						{fromLastMonth} from last month
					</p>
				</Show>
			</CardContent>
		</Card>
	);
}
