import React from 'react';
import { motion } from 'framer-motion';
import useMedia from './../../../Hooks/useMedia';
import { departments } from '../../../Utils/Extra';
import { ReactComponent as ListIcon } from '../../../Assets/icons/list.svg';

const DepartmentsSection = () => {
	const mediumScreen = useMedia('(max-width: 1025px)');

	const dpsMap = departments.map((dp, index) => (
		<div className="dps-card" key={index}>
			<div>
				<p>{dp.name}</p>
				<img src={dp.src} alt={`Department ${dp.name}`} />
			</div>
		</div>
	));

	return (
		<>
			<div className="dp-title">
				<ListIcon />
				<p>Departamentos</p>
			</div>
			{!mediumScreen ? (
				<div className="departments-container">{dpsMap}</div>
			) : (
				<motion.div className="dp-mobile">{dpsMap}</motion.div>
			)}
		</>
	);
};

export default DepartmentsSection;
