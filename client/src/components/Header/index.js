import React, { useState, useEffect } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import API from '../../api/api';

function Header() {
	const [search, setSearch] = useState('');
	const [results, setResults] = useState([]);
	const [resultsTv, setResultsTv] = useState([]);
	const [resultsPerson, setResultsPerson] = useState([]);
	const [resultsCompany, setResultsCompany] = useState([]);

	useEffect( () => {
		if(search.length > 3){
			API.search.movie(search).then(r => {
				document.getElementsByClassName('search-result')[0].style.display = 'block';
				setResults(r.data.results);
				API.search.tv(search).then(t => {
					setResultsTv(t.data.results);
					API.search.person(search).then(p => {
						setResultsPerson(p.data.results);
						API.search.company(search).then(p => {
							setResultsCompany(p.data.results);
						});
					});
				})
			})
		}
		else{
			document.getElementsByClassName('search-result')[0].style.display = 'none';
		}
	}, [search])
	
	
	function handleChange(e){
		setSearch(e.target.value);
	}


	function renderResultsPerson(){
		return resultsPerson.slice(0, 10).map(r => {
			return <div key={r.id} onClick={() => {document.getElementsByClassName('search-result')[0].style.display = 'none'}}>
					<Link to={`/person/${r.id}`}>
						<div className='search-image'>
							<img src={API.image(r.profile_path, 'w200')}/>
						</div>

						<div className="search-content">
							<div className="search-name">
								{r.name}
							</div>

							<div className="search-description">
								{r.known_for_department}
							</div>
						</div>
					</Link>
					</div>
		})
	}


	function renderResultsTv(){
		return resultsTv.slice(0, 10).map(r => {
			return <div key={r.id} onClick={() => {document.getElementsByClassName('search-result')[0].style.display = 'none'}}>
					<Link to={`/tv/${r.id}`}>
						<div className='search-image'>
							<img src={API.image(r.poster_path, 'w200')}/>
						</div>

						<div className="search-content">
							<div className="search-name">
								{r.name}
							</div>

							<div className="search-description">
								{r.overview}
							</div>
						</div>
					</Link>
					</div>
		})
	}


	function renderResults(){
		return (
			results.slice(0, 10).map(r => {
				return <div key={r.id} onClick={() => {document.getElementsByClassName('search-result')[0].style.display = 'none'}}>
						<Link to={`/movie/${r.id}`}>
							<div className='search-image'>
								<img src={API.image(r.poster_path, 'w200')}/>
							</div>

							<div className="search-content">
								<div className="search-name">
									{(r.title ? r.title : r.name)}
								</div>

								<div className="search-description">
									{r.overview}
								</div>
							</div>
						</Link>
						</div>
			})
		)
	}


	function renderResultsCompany(){
		return (
			resultsCompany.slice(0, 10).map(r => {
				return <div key={r.id} onClick={() => {document.getElementsByClassName('search-result')[0].style.display = 'none'}}>
						<Link to={`/company/${r.id}`}>
							<div className='search-image'>
								<img src={API.image(r.logo_path, 'w200')}/>
							</div>

							<div className="search-content">
								<div className="search-name">
									{r.name}
								</div>
							</div>
						</Link>
						</div>
			})
		)
	}

	return (
		<header>
			<div className="up-header">
				<div className="brand">
					<h2>React Movies</h2>
				</div>
			</div>

			<div className="down-header">
				<div className="search">
					<input type="text" value={search} onChange={handleChange} placeholder="Busque por filmes, séries ou celebridades" autoComplete="off"/>
					<div className="search-result">
						{/* Filmes */}
						{renderResults()}
						{/* Séries */}
						{renderResultsTv()}
						{/* Celebridades */}
						{renderResultsPerson()}
						{renderResultsCompany()}
					</div>
				</div>


				<div className="navbar">
					<ul>
						<li><Link to="/">Filmes</Link></li>
						<li><Link to="/tv">Séries</Link></li>
						<li><Link to="/discovery">Descubra novos filmes</Link></li>
					</ul>
				</div>
			</div>



		</header>
	);
}

export default Header;