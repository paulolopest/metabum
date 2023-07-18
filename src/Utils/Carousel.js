const carousel = document.querySelector('.pc-sc-similarProducts');

const dragging = (e) => {
	console.log(e.pageX);
};

carousel.addEventListener('mousemove', dragging);
