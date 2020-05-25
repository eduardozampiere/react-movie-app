import React, { useState, useEffect } from 'react';
import API from '../../api/api';
import { Link } from 'react-router-dom';

import './style.css';



function Section(props) {
	const genres = props.genres;
	const [movies, setMovies] = useState([]);
	const f = props.f;
	const limit = props.limit;
	const to = props.to ? props.to : 'movie';
	useEffect( () => {
		f().then( r => {
			console.log(r.data.results);
			if(r.data.results) setMovies(r.data.results);
			else if(props.crew){
				if(r.data.crew) setMovies(r.data.crew);
			}
			else if(r.data.cast) setMovies(r.data.cast);

		});
	}, [f]);


	function renderMovieFooter(movie){
		return movie.genre_ids.map(id => {
			return genres.map(g => {
				if(g.id === id){											
					return <span key={g.id}>{g.name}</span>
				}
				return false;
			})
		})
	}

	function renderMovies(movies){
		let aux = [];
		if(limit) aux = movies.slice(0, limit);
		else aux = movies;
		return aux.map(movie => {
			return (
				<div className="movie-card" key={`${movie.id}`}>
					<Link to={`/${to}/${movie.id}`}>
						<div className="movie-poster">
							<img alt={movie.title} src={API.image(movie.poster_path)}/>
						</div>
						<div className="movie-body">
							<div className="movie-title">
								<span>{(movie.title ? movie.title : movie.name)}</span>
							</div>
							<div className="movie-badge">
								<span>{movie.vote_average}</span>
							</div>
						</div>
						<div className="movie-footer">
							{
								renderMovieFooter(movie)
							}
						</div>
					</Link>
				</div>
			)
		});
	}

	if(movies.length <= 0){
		return <></>
	}

	return (
			<section>
				<div>
					<h3>{props.title}</h3>
				</div>
				<section>
					{renderMovies(movies)}
				</section>
			</section>
	);
}

export default Section;