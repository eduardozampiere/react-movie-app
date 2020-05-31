import React, { useState, useEffect } from 'react';
import API from '../../api/api';
import Section from '../Section';

import './style.css';
function Discovery() {
	const [genres, setGenres] = useState([]);
	const [certifications, setCertifications] = useState([]);
	const [years, setYears] = useState([]);

	// const [media, setMedia] = useState('');
	const [language, setLanguage] = useState(null);
	const [certificate, setCertificate] = useState(null);
	const [year, setYear] = useState(null);
	const [genre, setGenre] = useState(null);
	const [sort, setSort] = useState('popularity');
	const [order, setOrder] = useState('desc');


	useEffect( () => {
		document.title = "Discovery | React Movies"
		const y = new Date().getFullYear();
		const arr = [];
		for(let i = 1874; i <= y; i++){
			arr.push(i);
		}
		setYears(arr);

		API.genres().then(r => {
			setGenres(r.data.genres);
		});

		API.movies.certifications().then(r => {
			setCertifications(r.data.certifications.BR);
		});

	}, []);

	function handleSubmit(e){
		e.preventDefault();
		// if(!media){
		// 	alert('Escolha uma mídia!');
		// 	return false;
		// }

		// if(media === 'movie'){
		// 	API.movies.discovery({
		// 		'with_original_language': language,
		// 		'certification': certificate,
		// 		'certification_country': 'BR',
		// 		year,
		// 		'with_genres': genre,
		// 		'sort_by': `${sort}.${order}`
		// 	});
		// }
	}

	function handleChange(e, f){
		f(e.currentTarget.value);
	}

	return(
		<>
			<div className="discovery">
				<form onSubmit={handleSubmit}>
					{/* <div>
						<label>Tipo de Mídia</label>
						<select onChange={(e) => handleChange(e, setMedia)} name="media">
							<option value=""></option>
							<option value="movie">Filmes</option>
							<option value="tv">Séries</option>
						</select>
					</div> */}
					
					<div>
						<label>Idioma</label>
						<select onChange={(e) => handleChange(e, setLanguage)}>
							<option value="">Qualquer</option>
							<option value="de">Alemão</option>
							<option value="ko">Coréia</option>
							<option value="es">Espanhol</option>
							<option value="el">Grego</option>
							<option value="hi">Hindu</option>
							<option value="en">Inglês</option>
							<option value="ja">Japonês</option>
							<option value="zn">Mandarin</option>
							<option value="pt">Português</option>
							<option value="ru">Russo</option>
						</select>
					</div>

					<div>
						<label>Classificação indicativa</label>
						<select name="certification" onChange={(e) => handleChange(e, setCertificate)}>
							<option value="" >Qualquer</option>
							{
								certifications.map(c => {
									return <option key={c.order} value={c.certification}>{c.certification}</option>
								})
							}
						</select>
					</div>

					<div>
						<label>Ano de lançamento</label>
						<select name="year" onChange={(e) => handleChange(e, setYear)}>
							<option value="">Qualquer</option>
							{
								years.map(y => {
									return <option key={y} value={y}>{y}</option>
								})
							}
						</select>
					</div>

					<div>
						<label>Genero</label>
						<select name="genres" onChange={(e) => handleChange(e, setGenre)}>
							<option value="">Qualquer</option>
							{
								genres.map(g => {
									return <option key={g.id} value={g.id}>{g.name}</option>
								})
							}
						</select>
					</div>

					<div>
						<label>Ordenar por</label>
						<select name="sort-by" onChange={(e) => handleChange(e, setSort)}>
							<option value="popularity">Popularidade</option>
							<option value="vote_average">Nota</option>
							<option value="release_date">Data de lançamento</option>
							<option value="revenue">Faturamento</option>
							<option value="original_title">Nome</option>
						</select>
					</div>

					<div>
						<label>Ordem</label>
						<select name="order" onChange={(e) => handleChange(e, setOrder)}>
							<option value="desc">Maior para o menor</option>
							<option value="asc">Menor para o maior</option>
						</select>
					</div>

					{/* <button>Buscar</button> */}
				</form>
			</div>
			<Section genres={genres} f={() => API.movies.discovery({
				'with_original_language': language,
				'certification': certificate,
				'certification_country': 'BR',
				year,
				'with_genres': genre,
				'sort_by': `${sort}.${order}`
			})} title="Descobrir filmes"/>
		</>

	);
}

export default Discovery;