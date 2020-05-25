import React from 'react';
import { render } from 'react-dom';

interface IProps {
    name: string
}

class HelloMessage extends React.Component<IProps> {
    private props: IProps;
    render() {
        return (
            <div>Hello, {this.props.name}</div>
        );
    }
}

const HelloFun = ({ name }: IProps) => (
    <div>Hello, {name}</div>
); 

const element = <div>Hello, Username</div>;

render(
    <HelloMessage name="Anton"/>,
    document.getElementById('root')
);