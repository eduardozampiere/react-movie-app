import React, { useEffect, useState } from 'react';

import './style.css';
import { useParams } from 'react-router-dom';
import API from '../../api/api';
import Section from '../Section';

function Company() {
	const {id} = useParams();
	const [genres, setGenres] = useState([]);
	const [company, setCompany] = useState({});
	useEffect( () => {
		API.genres().then(r => {
			setGenres(r.data.genres);
		});

		API.company(id).then(r => {
			setCompany(r.data);
			console.log(r.data);
		});

	}, [id]);

	return (
		<>
			<div className="movie">
				<div className="movie-poster">
					<img alt={company.name} src={API.image(company.logo_path)}/>
				</div>
				<div className="movie-detail">
					<div className="movie-header">			
						<div className="movie-title">{ company.name } | {company.origin_country}</div>
					</div>
					<div className="movie-overview">{ company.description }</div>
					<div className="movie-genres">
					</div>
					<div className="movie-casting">		
						<div className="movie-director">
							Localizado em: {company.headquarters}
						</div>
						
					</div>
					<div className="movie-footer">
						Site: <a href={company.homepage}>{company.homepage}</a>
					</div>
				</div>
			</div>
		
			<Section title="Filmes" f={() => API.movies.discovery({with_companies: id})} genres={genres} to='movie'/>
			<Section title="Séries" f={() => API.tv.discovery({with_companies: id})} genres={genres} to='movie'/>

		</>
	);
}

export default Company;