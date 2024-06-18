import { Toast, ToastClose, ToastDescription } from '../components/ui/toast';
import { Toast as ToastBaseType } from '../types';
import { useCallback } from 'react';

interface Props {
    toasts: Array<ToastBaseType>;
}

export function ToasterWidget(props: Props) {
    const { toasts } = props;

    const transformVariant = useCallback((type: string) => {
        if (type === 'danger') {
            return 'destructive';
        }
        return 'default';
    }, []);

    return (
        <>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    {...props}
                    variant={transformVariant(toast.type)}
                >
                    <div className="grid gap-1">
                        <ToastDescription>{toast.text}</ToastDescription>
                    </div>
                    <ToastClose />
                </Toast>
            ))}
        </>
    );
}
