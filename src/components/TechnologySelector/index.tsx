import React from 'react'

interface TechnologySelectorProps {
	technologies: string[]
	setTechnology: React.Dispatch<React.SetStateAction<string>>
}

const TechnologySelector: React.FunctionComponent<TechnologySelectorProps> = ({
	technologies,
	setTechnology,
}: TechnologySelectorProps) => (
	<select onChange={(e) => setTechnology(e.target.value)} defaultValue="default">
		{technologies.map((technology) => (
			<option key={`integration${technology}`} value={technology}>
				{technology}
			</option>
		))}
		<option value="default" disabled hidden>
			Select techonology...
		</option>
	</select>
)

export default TechnologySelector
