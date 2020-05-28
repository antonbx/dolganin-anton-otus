interface IMatchParams {
	cityId: string
}

interface IMatch {
	params: IMatchParams
}

export interface IPropsMain {
}

export interface IPropsCity {
	match: IMatch
}

export interface IState {
	favorite: Array<ICity>,
	query: string
}

export interface IStyle {
	cityDiv: object,
	favoriteButton: object,
	searchInput: object
}

export interface ICity {
	key: string,
	name: string,
	temp: number,
	wind: number,
	forecast: string
}