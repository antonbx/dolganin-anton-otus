import {LitElement, html, css, customElement, property} from 'lit-element';

@customElement('my-leaf')
export class MyLeaf extends LitElement {

	static styles = css`
		div {
			border: 1px solid green;
			padding: 2px;
			margin: 2px;
		}`;

	render() {
		return html`<div>${this.textContent}</div>`;
	}
}