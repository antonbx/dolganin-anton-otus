import {LitElement, html, css, customElement, property} from 'lit-element';

// private method hack
const buildTree = Symbol('buildTree');

@customElement('my-tree')
export class MyTree extends LitElement {

	@property()
	idKey;

	@property()
	idItems;

	static styles = css`
		.error {
			color: red;
		}`;

	error(errorMessage) {
		return html`<span class="error">${errorMessage}</span>`;
	}

	[buildTree](jsonData) {
		let content = [];
		jsonData.map((json) => {
			let key = json.hasOwnProperty(this.idKey)
				? json[this.idKey] : null;
			let items = json.hasOwnProperty(this.idItems)
				? json[this.idItems] : [];
			if (key) {
				content.push(html`<my-leaf>${key}</my-leaf>`);
			}
			items.map((item) => {
				content.push(html`<my-tree idKey="${this.idKey}" idItems="${this.idItems}">${JSON.stringify(item)}</my-tree>`);
			});
		});
		return content;
	}

	render() {
		try {
			return this[buildTree](
				[JSON.parse(this.textContent)]
			);
		} catch (e) {
			return this.error(e.toString());
		}
	}
}