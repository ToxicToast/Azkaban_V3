export function getStatusVariant(
	isDeleted: boolean,
	isBanned: boolean,
	isActive: boolean,
) {
	if (isDeleted || isBanned) {
		return 'destructive';
	} else if (!isActive) {
		return 'outline';
	}
	return 'default';
}
