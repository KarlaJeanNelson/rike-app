const menuItems = {
	new: 	{text: 'Create New', icon: 'plus'},
	all: 	{text: 'All', icon: 'cloud-meatball', queryField: '', queryText: ''},
	saved: {text: 'Saved', icon: 'save', queryField: 'status', queryText: 'saved'},
	scheduled: {text: 'Scheduled', icon: ['far', 'clock'], queryField: 'status', queryText: 'scheduled'},
	available: {text: 'Available', icon: 'share', queryField: 'status', queryText: 'available'},
	closed: {text: 'Closed', icon: 'archive', queryField: 'status', queryText: 'closed'},
}

const menuItemsOther = [
	menuItems.all,
	menuItems.scheduled,
	menuItems.available,
	menuItems.closed,
]

const menuItemsDonor = [
	menuItems.all,
	menuItems.saved,
	menuItems.scheduled,
	menuItems.available,
	menuItems.closed,
]

const menuItemsRescuer = [
	menuItems.all,
	menuItems.scheduled,
	menuItems.closed,
]

export {
	menuItems,
	menuItemsOther,
	menuItemsDonor,
	menuItemsRescuer
};