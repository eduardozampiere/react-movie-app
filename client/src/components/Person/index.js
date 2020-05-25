import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/api';
import MovieImages from '../MovieImages';
import Section from '../Section';
// import { Container } from './styles';
import './style.css';

function Person() {
	const {id} = useParams();
	const [person, setPerson] = useState({});
	const [images, setImages] = useState([]);
	const [genres, setGenres] = useState([]);
	useEffect( () => {
		API.genres().then(r => {
			setGenres(r.data.genres);
		})

		API.person.detail(id).then(r => {
			console.log(r.data);
			setPerson(r.data);
		});

		API.person.credits(id).then(r => {
			console.log(r);
		});

	}, [id]);

	function formatDate(date){
		if(!date) return false;
		return date.split('-').reverse().join('/');
	}

	function renderMovieFooter(person){
			return(
				<>
					<div className="realease-date">Nascimento: <b>{ formatDate( person.birthday) }</b></div>
					{/* <div className="duration">Duração: <b>{ (movie.runtime ? movie.runtime : movie.episode_run_time[0]) }m</b></div> */}
					{/* <div className="budget">Orçamento: <b>{ formatValue(movie.budget) }</b></div> */}
					{/* <div className="revenue">Faturamento: <b>{ formatValue(movie.revenue) }</b> </div> */}
				</>
			)
		}

	return(
		<>
			<div className="movie">
				<div className="movie-poster">
					<img alt={person.name} src={API.image(person.profile_path)}/>
				</div>
				<div className="movie-detail">
					<div className="movie-header">
						<div className="movie-title">{ person.name } | {person.known_for_department}</div>
						{/* <div className="movie-rate">{ movie.vote_average }</div> */}
					</div>
					<div className="movie-overview">{ person.biography }</div>
					<div className="movie-genres">
												
					</div>
					<div className="movie-casting">		
						<div className="movie-director">
							Nascido em: {person.place_of_birth}
						</div>

						
					</div>
					<div className="movie-footer">
						{renderMovieFooter(person)}
					</div>
				</div>
			</div>
			<MovieImages id={id} api={API.person} to="person"/>
			<Section title="Filmes" f={() => API.person.credits(id)} genres={genres} to='movie' limit={20}/>
			<Section title="Séries" f={() => API.person.creditsTv(id)} genres={genres} to='tv' limit={20}/>
			<Section title="Filmes por trás da camera" f={() => API.person.credits(id)} crew={true} genres={genres} to='movie' limit={10}/>

		</>
	)
}

export default Person;