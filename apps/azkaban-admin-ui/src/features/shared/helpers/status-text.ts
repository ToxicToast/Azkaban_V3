export function getStatusText(
	isDeleted: boolean,
	isBanned: boolean,
	isActive: boolean,
): string {
	if (isDeleted) {
		return 'Deleted';
	} else if (isBanned) {
		return 'Banned';
	} else if (!isActive) {
		return 'Inactive';
	}
	return 'Active';
}
