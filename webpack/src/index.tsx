import React from 'react';
import { render } from 'react-dom';
import cities from './demo';
import { IProps, IState, ICity } from './interface';

const styles = {
	cityDiv: {
		height: '60px'
	}
};

class HelloMessage extends React.Component {
	private readonly props: IProps;
	private readonly state: IState;

	constructor(p, c) {
		super(p, c);
		this.state = {
			favorite: []
		};
	}

	// знаю, что это не обязательно,
	// просто не смог победить TS, он ругался, что метод не существует
	setState(state: IState) {
		super.setState(state);
	}

	addToFavorite(currentCity: ICity) {
		this.state.favorite.push(currentCity);
		this.setState(this.state);
	}

	removeFromFavorite(currentCity: ICity) {
		this.state.favorite.map((city, index) => {
			if (currentCity.key === city.key) {
				delete this.state.favorite[index];
			}
		});
		this.setState(this.state);
	}

	renderFavoriteButton(currentCity: ICity) {
		let favorited = false;
		this.state.favorite.map((city) => {
			if (currentCity.key === city.key) {
				favorited = true;
			}
		});

		const action = !favorited
			? () => this.addToFavorite(currentCity)
			: () => this.removeFromFavorite(currentCity);

		return (
			<div>
				<button onClick={action}>
					{favorited ? 'remove from favorite' : 'add to favorite'}
				</button>
			</div>
		);
	}

	renderCity(city: ICity) {
		return (
			<div style={styles.cityDiv} key={city.key}>
				<b>{city.name}</b>, wind: {city.wind} mps, temp: {city.temp} C
				{this.renderFavoriteButton(city)}
			</div>
		);
	}

	render() {
		return (
			<div>
				<h1>Cities:</h1>
				{cities.map((city) => this.renderCity(city))}
			</div>
		);
	}
}

render(
	<HelloMessage name="Petr"/>,
	document.getElementById('root')
);