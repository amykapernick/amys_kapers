const colours = [
	{
		colour: '#318ce7',
		text: '#000000'
	},
	{
		colour: '#9440a0',
		text: '#ffffff'
	},
	{
		colour: '#64ad66',
		text: '#000000'
	},
	{
		colour: '#cb5699',
		text: '#000000'
	},
	{
		colour: '#7561c1',
		text: '#ffffff'
	},
	{
		colour: '#ffce03',
		text: '#000000'
	}
]

const shuffle = (array) => array
	.sort(() => Math.random() - 0.5)


const generateColours = shuffle(colours)

export default generateColours