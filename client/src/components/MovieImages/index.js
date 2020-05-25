import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import API from '../../api/api';

import './style.css';
function MovieImages(props) {
	const {id, api} = props;
	const [images, setImages] = useState([]);
	const [openedImage, setOpenedImage] = useState(0);

	useEffect( () => {
		console.log(api);
		api.images(id).then(r => {
			setImages(r.data.backdrops);
		});
	}, [id]);

	function showImage(url, i){
		setOpenedImage(i);
		const div = document.getElementById("open-image");
		const img = div.childNodes[2];
		div.style.display = 'flex';
		img.src = API.image(url, 'original');
	}

	function closeImage(){
		const div = document.getElementById("open-image");
		const img = div.childNodes[0];
		img.src = "";
		div.style.display = 'none';
	}

	function renderImages(){
		return images.map( (p, i) => {
			return (
					<>
						<img src={API.image(p.file_path, 'w200')} onClick={() => showImage(p.file_path, i)}/>
					</>
				)
		});
	}

	function changeImage(step){
		const total = images.length;
		if(openedImage + step >= total){
			showImage(images[0].file_path, 0);
		}
		else if(openedImage + step < 0){
			showImage(images[total - 1].file_path, total - 1);
			
		}
		else{
			showImage(images[openedImage + step].file_path, openedImage + step);
		}
	}

	return(
		<>
			<div id="open-image">
				<div id="close" onClick={closeImage}>
					
				</div>
				<div className="backward" onClick={() => changeImage(-1)}></div>
				<img src="#" />
				<div className="forward" onClick={() => changeImage(1)}></div>
			</div>
			<div className="images-movie">
				{renderImages()}
			</div>
		</>
	);
}

export default MovieImages;