import { useEffect, useState } from "react";

const icons = {
	speaking: {
		img: "mic",
		alt: "speaking",
	},
	organising: {
		img: "notes",
		alt: "organising",
	},
	attending: {
		img: "badge",
		alt: "",
	},
	workshop: {
		img: "presentation",
		alt: "running a workshop",
	},
};

const Current = (props) => {
	const { api } = props
	const [data, setData] = useState({
		city: "Perth",
		country: "Australia",
		country_code: "au",
	})

	useEffect(() => {
		fetch(`${api}/current`, {
			headers: {
				'Content-Type': 'application/json',
			}
		})
			.then((res) => res.json())
			.then(res => setData(res))
	}, [])

	return (
		<>
			{data && <>
				Right now Amy is in 
				<img
					height="18"
					width="24" 
					alt="" 
					src={`/img/countries/${data.country_code}.svg`} 
				/> 
				{data.city ? `${data.city}, ` : ''}{data.country}
				{data.conference && <>
					{data.eventType?.map((t) => (
						<img 
							height="18"
							width="24"
							key={t}
							alt={icons[t].alt}
							src={`img/icons/${icons[t].img}.svg`}
						/>
					))}
					at {data.eventUrl 
						? <a
							href={data.eventUrl} 
							target="_blank"
						>	
							{data.conference}
						</a>
						: data.conference
					}
				</>}
			</>}
		</>
	)
}

export default Current