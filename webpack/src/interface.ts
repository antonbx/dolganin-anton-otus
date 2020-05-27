export interface IProps {
	name: string
}

export interface IState {
	favorite: Array<ICity>
}

export interface ICity {
	key: string,
	name: string,
	temp: number,
	wind: number
}