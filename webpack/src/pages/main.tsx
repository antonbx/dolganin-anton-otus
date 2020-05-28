import React from 'react';
import { Link, generatePath } from 'react-router-dom';
import cities from './demo';
import { IState, ICity } from './interface';
import { BASE_PATH } from './config';
import Storage from './storage';
import styles from './styles';

export default class MainPage extends React.Component {
	private readonly state: IState;
	private readonly storage;

	constructor(p, c) {
		super(p, c);
		this.storage = new Storage;
		this.state = this.storage.getStore();
	}

	setState(state: IState): void {
		this.storage.setStore(state);
		super.setState(state);
	}

	searchCity(input): void {
		this.state.query = input.target.value;
		this.setState(this.state);
	}

	addToFavorite(currentCity: ICity): void {
		this.state.favorite.push(currentCity);
		this.setState(this.state);
	}

	removeFromFavorite(currentCity: ICity): void {
		this.state.favorite.map((city, index) => {
			if (city && currentCity.key === city.key) {
				delete this.state.favorite[index];
			}
		});
		this.setState(this.state);
	}

	renderFavoriteButton(currentCity: ICity) {
		let favorited = false;
		this.state.favorite.map((city) => {
			if (city && currentCity.key === city.key) {
				favorited = true;
			}
		});

		const action = !favorited
			? () => this.addToFavorite(currentCity)
			: () => this.removeFromFavorite(currentCity);

		return (
			<div style={styles.favoriteButton}>
				<button onClick={action}>
					{favorited ? 'remove from favorite' : 'add to favorite'}
				</button>
			</div>
		);
	}

	renderCity(city: ICity) {
		if (this.state.query) {
			let query = this.state.query.toLowerCase();
			if (city.name.toLowerCase().indexOf(query) === -1) {
				return null;
			}
		}
		return (
			<div style={styles.cityDiv} key={city.key}>
				<Link to={generatePath(BASE_PATH + '/city/:cityId/', {cityId: city.key})}>
					{city.name}
				</Link>,
				wind: {city.wind} mps, temp: {city.temp} C
				{this.renderFavoriteButton(city)}
			</div>
		);
	}

	renderInput() {
		return (
			<input
				type="text"
				placeholder="search..."
				style={styles.searchInput}
				value={this.state.query}
				onChange={value => this.searchCity(value)}
			/>
		);
	}

	render() {
		return (
			<div>
				<h1>Cities:</h1>
				{this.renderInput()}
				{cities.map((city) => this.renderCity(city))}
			</div>
		);
	}
}