import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';// import { Container } from './styles';

import Container from '../components/Container';

const Home = lazy(() => import('../components/Home'));
const MovieDetail = lazy(() => import('../components/MovieDetail'));

function Routes() {

	return(
		<Router>
			<Suspense fallback={<span>Loading...</span>}>
				<Switch>
					<Route exact path="/">
						<Container>
							<Home />
						</Container>
					</Route>

					<Route extac path="/movie/:id">
						<Container>
							<MovieDetail />
						</Container>
					</Route>

					<Route exact path="/person/:id">
						<Container>
							<h1>Person page</h1>
						</Container>
					</Route>
				</Switch>
			</Suspense>
		</Router>
	)
}

export default Routes;