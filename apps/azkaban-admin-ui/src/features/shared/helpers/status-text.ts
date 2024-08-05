export function getStatusText(isDeleted: boolean, isActive: boolean): string {
	if (isDeleted) {
		return 'Deleted';
	} else if (!isActive) {
		return 'Inactive';
	}
	return 'Active';
}
