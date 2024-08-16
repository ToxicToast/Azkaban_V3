import { Card, CardContent, CardHeader, CardTitle, Show } from '../../shared';
import { ReactNode } from 'react';
import { Optional } from '@toxictoast/azkaban-base-types';
import classNames from 'classnames';

interface Props {
	title: string;
	icon: ReactNode;
	statistic: string;
	fromLastMonth?: Optional<string>;
	isDisabled?: Optional<boolean>;
}

export function Stats(props: Props) {
	const { title, icon, statistic, fromLastMonth, isDisabled } = props;

	const cardClass = classNames({
		'duration-300': true,
		'ease-in-out': true,
		'hover:bg-accent': !isDisabled,
		'cursor-not-allowed': isDisabled,
		'bg-destructive': isDisabled,
	});

	return (
		<Card className={cardClass}>
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
