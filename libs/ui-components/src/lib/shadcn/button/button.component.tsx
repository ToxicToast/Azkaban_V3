import { ButtonHTMLAttributes, PropsWithChildren, useMemo } from 'react';
import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button-variants';
import { Optional } from '@toxictoast/azkaban-base-types';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils';

interface Props
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: Optional<boolean>;
}

export function Button(props: PropsWithChildren<Props>) {
	const { asChild, children, variant, size, className } = props;

	const defaultVariant = useMemo(() => {
		return variant ?? 'default';
	}, [variant]);

	const defaultSize = useMemo(() => {
		return size ?? 'default';
	}, [size]);

	const Comp = useMemo(() => {
		return asChild ? Slot : 'button';
	}, [asChild]);

	return (
		<Comp
			className={cn(
				buttonVariants({
					variant: defaultVariant,
					size: defaultSize,
					className,
				}),
			)}
			{...props}
		>
			{children}
		</Comp>
	);
}
