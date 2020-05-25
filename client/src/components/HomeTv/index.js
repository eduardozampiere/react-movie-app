import React, { useState, useEffect } from 'react';
import API from '../../api/api';
import Section from '../Section';

function Home() {
	const [genres, setGenres] = useState();

	useEffect(() => {
		API.genres().then(r => {
			setGenres(r.data.genres);
		})
	}, []);

	if(!genres){
		return <></>
	}
	
	return (
		<>
			<Section f={API.tv.trends} title="Tendências" genres={genres} to="tv" />	
			<Section f={API.tv.popular} title="Séries Populares" genres={genres} to="tv" />	
			<Section f={API.tv.topRated} title="Séries com as melhores notas" genres={genres} to="tv" />
		</>
	);
}

export default Home;