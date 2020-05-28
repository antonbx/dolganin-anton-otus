import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { BASE_PATH } from './pages/config';
import MainPage from './pages/main';
import CityPage from './pages/city';

const App = () => (
	<BrowserRouter>
		<Route exact path={BASE_PATH + '/'} component={MainPage} />
		<Route exact path={BASE_PATH + '/city/:cityId'} component={CityPage} />
	</BrowserRouter>
);


render(
	<App />,
	document.getElementById('root')
);