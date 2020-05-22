const sections = {
	1: {title: 'Section1'},
	2: {title: 'Section2'},
	3: {title: 'Section3'}
};

module.exports = [
	{
		title: 'Product1',
		price: 100,
		section: sections[1]
	},
	{
		title: 'Product2',
		price: 200,
		section: sections[2]
	},
	{
		title: 'Product3',
		price: 300,
		section: sections[3]
	},
	{
		title: 'Product4',
		price: 400,
		section: sections[1]
	},
	{
		title: 'Product5',
		price: 500,
		section: sections[2]
	}
];