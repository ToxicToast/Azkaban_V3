import { useCallback, useEffect, useState } from 'react';
import { Subject, takeUntil } from 'rxjs';
import { Toast } from '../types';
import { toastService } from '../service';

export function useToasts() {
	const [toasts, setToasts] = useState<Array<Toast>>([]);

	useEffect(() => {
		const unsubscribe$ = new Subject();
		//
		toastService
			.getToastObservable()
			.pipe(takeUntil(unsubscribe$))
			.subscribe((toast) =>
				setToasts((prevToasts) => [...prevToasts, toast]),
			);
		//
		return () => {
			unsubscribe$.next('unsubscribe');
			unsubscribe$.complete();
		};
	}, []);

	const removeToast = useCallback((toastId: string) => {
		setToasts((toasts) => toasts.filter((t) => toastId !== t.id));
	}, []);

	return { toasts, removeToast };
}
