import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Section from '../Section';

import API from '../../api/api';

import './style.css';
function MovieDetail(props) {
	const {id} = useParams();
	const [movie, setMovie] = useState({});
	const [cast, setCast] = useState([]);
	const [director, setDirector] = useState([]);
	const [genres, setGenres] = useState();
	
	useEffect( () => {
		API.movies.detail(id).then(r => {
			setMovie(r.data);
			console.log(r.data);
		});

		API.movies.credits(id).then(r => {
			setCast(r.data.cast);

			for(let i = 0; i < r.data.crew.length; i++){
				let c = r.data.crew[i];
				if(c.job === 'Director'){
					setDirector(c);
					break;
				}
			}
		});

		API.genres().then(r => {
			setGenres(r.data.genres);
		})
	
	}, [id]);


	function renderFristActors(){

		return cast.slice(0, 4).map(a => {
			return <Link key={a.id} to={`/person/${a.id}`}>{a.name}</Link>
		})
	}

	function renderGenres(){
		return movie.genres.map(g => {
			return <span key={g.id}>{g.name}</span>
		});
	}

	function formatDate(date){
		return date.split('-').reverse().join('/');
	}

	function formatValue(value){
		let n = value.toString();
		let t = n.length;
		let money = '';
		let aux = 0;
		for(let i = t-1; i >= 0; i--){
			money = n[i] + money;
			aux++;
			if(aux >= 3 && i > 0){
				money = '.' + money;
				aux = 0;
			}
		}
		return `$ ${money}`;
	}

	if(!movie.title){
		return <span>Loading</span>
	}
	return (
		<>
			<div className="movie">
				<div className="movie-poster">
					<img alt={movie.title} src={API.image(movie.poster_path)}/>
				</div>
				<div className="movie-detail">
					<div className="movie-header">
						<div className="movie-title">{ movie.title } | <small>{ movie.original_title }</small></div>
						<div className="movie-rate">{ movie.vote_average }</div>
					</div>
					<div className="movie-overview">{ movie.overview }</div>
					<div className="movie-genres">
						{
							renderGenres()
						}
					</div>
					<div className="movie-casting">
						<div className="movie-director">
							Diretor: <Link to={`/person/${director.id}`}>{director.name}</Link>
						</div>

						<div className="movie-actors">
							Elenco: {renderFristActors()}
						</div>
					</div>
					<div className="movie-footer">
						<div className="realease-date">Lançamento: <b>{ formatDate(movie.release_date) }</b></div>
						<div className="duration">Duração: <b>{ movie.runtime }s</b></div>
						<div className="budget">Orçamento: <b>{ formatValue(movie.budget) }</b></div>
						<div className="revenue">Faturamento: <b>{ formatValue(movie.revenue) }</b> </div>
					</div>
				</div>
			</div>
			
			<Section title="Recomendados" f={() => API.movies.recommendations(id)} genres={genres} limit={5}/>

			<div className="casting">
				
			</div>
		</>
	)
	
}

export default MovieDetail;