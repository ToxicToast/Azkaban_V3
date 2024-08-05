export function getStatusVariant(isDeleted: boolean, isActive: boolean) {
	if (isDeleted) {
		return 'destructive';
	} else if (!isActive) {
		return 'outline';
	}
	return 'default';
}
