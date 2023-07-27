import React from 'react';
import { motion } from 'framer-motion';
import useMedia from './../../../Hooks/useMedia';
import { departments } from '../../../Utils/Extra';
import { ReactComponent as ListIcon } from '../../../Assets/icons/list.svg';
import useMeasure from 'react-use-measure';

const DepartmentsSection = () => {
	const [isDragging, setIsDragging] = React.useState(false);

	const [ref, { width }] = useMeasure();
	const mediumScreen = useMedia('(max-width: 600px)');

	const dpsMap = departments.map((dp, index) => (
		<div
			ref={ref}
			onClick={isDragging ? null : null}
			className="dps-card"
			key={index}
		>
			<div>
				<p>{dp.name}</p>
				<img
					draggable={false}
					src={dp.image}
					alt={`Department ${dp.name}`}
				/>
			</div>
		</div>
	));

	console.log(width * 12);

	return (
		<>
			<div className="dp-title">
				<ListIcon />
				<p>Departamentos</p>
			</div>
			{!mediumScreen ? (
				<div className="departments-container">{dpsMap}</div>
			) : (
				<div className="mbl-dp-container">
					<motion.div
						drag="x"
						dragConstraints={{ right: 0, left: -60 - width * 12 }}
						onDrag={() => setIsDragging(true)}
						onDragEnd={() => setIsDragging(false)}
						className="dp-mobile"
					>
						{dpsMap}
					</motion.div>
				</div>
			)}
		</>
	);
};

export default DepartmentsSection;
