import React from 'react';
import cities from './demo';
import { Link, generatePath } from 'react-router-dom';
import { IPropsCity, IState, ICity } from './interface';
import { BASE_PATH } from './config';
import Storage from './storage';

export default class CityPage extends React.Component {
	private readonly props: IPropsCity;
	private readonly state: IState;
	private readonly storage;

	constructor(p, c) {
		super(p, c);
		this.storage = new Storage;
		this.state = this.storage.getStore();
	}

	resolveCity(): ICity|null {
		const cityId = this.props.match.params.cityId;
		let resolvedCity = null;
		cities.map((city: ICity) => {
			if (city.key === cityId) {
				console.log(9);
				resolvedCity = city;
			}
		});
		return resolvedCity;
	}

	renderCity(city: ICity) {
		return (
			<div>
				<h1>{city.name}</h1>
				wind: {city.wind} mps, temp: {city.temp} C, <br/>
				forecast: {city.forecast}
			</div>
		);
	}

	render404() {
		return <h3>City not found</h3>;
	}

	render() {
		const city = this.resolveCity();
		if (!city) {
			return this.render404();
		}

		return (
			<div>
				{this.renderCity(city)}
				<Link to={generatePath(BASE_PATH + '/')}>
					back
				</Link>
			</div>
		);
	}
}