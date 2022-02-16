module.exports = {
	sections: [
		{
			value: 'html', 
			label: 'Semantic HTML'
		},
		{
			value: 'css', 
			label: 'CSS Layouts'
		},
		{
			value: 'a11y',
			label: 'Accessibility Testing'
		},
		{
			value: 'visual_regression',
			label: 'Visual Regression Testing (Percy)'
		},
		{
			value: 'ui',
			label: 'UI Testing (Cypress)'
		},
		{
			value: 'all',
			label: "I can't choose, it was all amazing!"
		}
	],
	html: {
		max: 5,
		min: 0,
		step: 1,
		opts: [
			{
				value: 0,
				label: 'Did not enjoy it at all'
			},
			{
				value: 1,
				label: 'It was ok, but I knew it all'
			},
			{
				value: 2,
				label: "Learnt some things but didn't like it"
			},
			{
				value: 3,
				label: 'It was alright'
			},
			{
				value: 4,
				label: 'Really enjoyed it, learnt a lot'
			},
			{
				value: 5,
				label: 'Loved it more than Quokkas'
			}
		]
	},
	css: {
		max: 5,
		min: 0,
		step: 1,
		opts: [
			{
				value: 0,
				label: 'Did not enjoy it at all'
			},
			{
				value: 1,
				label: 'It was ok, but I knew it all'
			},
			{
				value: 2,
				label: "Learnt some things but didn't like it"
			},
			{
				value: 3,
				label: 'It was alright'
			},
			{
				value: 4,
				label: 'Really enjoyed it, learnt a lot'
			},
			{
				value: 5,
				label: 'Loved it more than Quokkas'
			}
		]
	},
	a11y: {
		max: 5,
		min: 0,
		step: 1,
		opts: [
			{
				value: 0,
				label: 'Did not enjoy it at all'
			},
			{
				value: 1,
				label: 'It was ok, but I knew it all'
			},
			{
				value: 2,
				label: "Learnt some things but didn't like it"
			},
			{
				value: 3,
				label: 'It was alright'
			},
			{
				value: 4,
				label: 'Really enjoyed it, learnt a lot'
			},
			{
				value: 5,
				label: 'Loved it more than Quokkas'
			}
		]
	},
	visual_regression: {
		max: 5,
		min: 0,
		step: 1,
		opts: [
			{
				value: 0,
				label: 'Did not enjoy it at all'
			},
			{
				value: 1,
				label: 'It was ok, but I knew it all'
			},
			{
				value: 2,
				label: "Learnt some things but didn't like it"
			},
			{
				value: 3,
				label: 'It was alright'
			},
			{
				value: 4,
				label: 'Really enjoyed it, learnt a lot'
			},
			{
				value: 5,
				label: 'Loved it more than Quokkas'
			}
		]
	},
	ui: {
		max: 5,
		min: 0,
		step: 1,
		opts: [
			{
				value: 0,
				label: 'Did not enjoy it at all'
			},
			{
				value: 1,
				label: 'It was ok, but I knew it all'
			},
			{
				value: 2,
				label: "Learnt some things but didn't like it"
			},
			{
				value: 3,
				label: 'It was alright'
			},
			{
				value: 4,
				label: 'Really enjoyed it, learnt a lot'
			},
			{
				value: 5,
				label: 'Loved it more than Quokkas'
			}
		]
	},
	pacing: {
		max: 5,
		min: 0,
		step: 1,
		opts: [
			{
				value: 0,
				label: 'No way, was way too fast/slow'
			},
			{
				value: 5,
				label: 'Was a perfect pace'
			}
		]
	},
}