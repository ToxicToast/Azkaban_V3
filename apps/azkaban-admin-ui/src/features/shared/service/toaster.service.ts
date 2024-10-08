import { Subject } from 'rxjs';
import { Toast } from '../types';

class ToastService {
	private notificationSubject = new Subject<Toast>();

	public sendToast(notification: Omit<Toast, 'id'>) {
		const id = `${Date.now()}-${Math.random()}`;
		this.notificationSubject.next({ ...notification, id });
	}

	public getToastObservable() {
		return this.notificationSubject.asObservable();
	}
}

export const toastService = new ToastService();
