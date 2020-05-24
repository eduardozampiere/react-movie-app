import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<div className="up-header">
				<div className="brand">
					<h2>React Movies</h2>
				</div>
			</div>

			<div className="down-header">
				<div className="navbar">
					<ul>
						<li><Link to="/">Filmes</Link></li>
						<li><Link to="/">Séries</Link></li>
					</ul>
				</div>

				<div className="search">
					<input type="text" placeholder="Busque por filmes, séries ou celebridades" autoComplete="off"/>
					<div className="search-result">

					</div>
				</div>
			</div>



		</header>
	);
}

export default Header;