import React from 'react';
import { departments } from '../../../Utils/Extra';

const DepartmentsSection = () => {
	const dpsMap = departments.map((dp, index) => (
		<div className="dps-card" key={index}>
			<div>
				<p>{dp.name}</p>
				<img src={dp.src} alt={`Department ${dp.name}`} />
			</div>
		</div>
	));

	return <div className="departments-container">{dpsMap}</div>;
};

export default DepartmentsSection;
