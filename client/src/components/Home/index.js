import React, { useState, useEffect } from 'react';
import API from '../../api/api';
import Section from '../Section';

function Home() {
	const [genres, setGenres] = useState();

	useEffect(() => {
		document.title = "Filmes | React Movies"
		API.genres().then(r => {
			setGenres(r.data.genres);
		})
	}, []);
	
	if(!genres){
		return <></>
	}

	return (
		<>
			<Section f={API.movies.trends} title="Tendências" genres={genres} />	
			<Section f={API.movies.popular} title="Filmes Populares" genres={genres} />	
			<Section f={API.movies.topRated} title="Filmes com as melhores notas" genres={genres} />	
		</>
	);
}

export default Home;