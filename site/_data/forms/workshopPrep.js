module.exports = {
	os: [
		{
			value: 'mac', 
			label: 'MacOS'
		},
		{
			value: 'windows', 
			label: 'Windows'
		},
		{
			value: 'linux',
			label: 'Linux'
		}
	],
	browser: [
		{
			value: 'firefox',
			label: 'Firefox'
		},
		{
			value: 'chrome',
			label: 'Chrome'
		},
		{
			value: 'edge',
			label: 'Edge'
		},
		{
			value: 'safari',
			label: 'Safari'
		},
		{
			value: 'ie',
			label: 'Internet Explorer'
		}
	],
	node_cli: {
		max: 5,
		min: 0,
		step: 1,
		opts: [
			{
				value: 0,
				label: 'Never used it before'
			},
			{
				value: 1,
				label: 'I think I used it once'
			},
			{
				value: 2,
				label: 'Can follow a tutorial'
			},
			{
				value: 3,
				label: 'Fine as long as it works'
			},
			{
				value: 4,
				label: 'Use it regularly'
			},
			{
				value: 5,
				label: 'I can exit vim without Google'
			}
		]
	},
	css_skills: {
		max: 5,
		min: 0,
		step: 1,
		opts: [
			{
				value: 0,
				label: 'Never used it before'
			},
			{
				value: 1,
				label: 'Tweaks, sizing, colours'
			},
			{
				value: 2,
				label: 'Bootstrap, Tailwind, etc'
			},
			{
				value: 3,
				label: 'Relatively confident'
			},
			{
				value: 4,
				label: 'Use it regularly'
			},
			{
				value: 5,
				label: 'Build pixel-perfect page'
			}
		]
	},
	js_skills: {
		max: 5,
		min: 0,
		step: 1,
		opts: [
			{
				value: 0,
				label: 'Never used it before'
			},
			{
				value: 1,
				label: 'Used it once or twice'
			},
			{
				value: 2,
				label: 'Can follow a tutorial'
			},
			{
				value: 3,
				label: 'Fine as long as it works'
			},
			{
				value: 4,
				label: 'Use it regularly'
			},
			{
				value: 5,
				label: 'I use JS for everything'
			}
		]
	},
	node_version: {
		max: 16,
		min: 6,
		step: 1,
		opts: [
			{
				value: 6,
				label: '6.x.x'
			},
			{
				value: 8,
				label: '8.x.x'
			},
			{
				value: 10,
				label: '10.x.x'
			},
			{
				value: 12,
				label: '12.x.x'
			},
			{
				value: 14,
				label: '14.x.x'
			},
			{
				value: 16,
				label: '16.x.x'
			}
		]
	},
}