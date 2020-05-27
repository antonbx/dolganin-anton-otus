const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const demo = require('./demo');

const app = express();
let cart = {};

const schema = buildSchema(`
	type Section {
		title: String!
	}
	type Product {
		title: String!,
		price: Int!,
		section: Section
	}
	type CartItem {
		product: Product!,
		quantity: Int!
	}
	type Mutation {
		addToCart(id: Int!): Boolean
	}
	type Query {
		product(id: Int!): Product,
		products: [Product],
		cart: [CartItem]
	}
`);

const root = {
	product: (product) => {
		if (demo.hasOwnProperty(product.id)) {
			return demo[product.id];
		}
		return null;
	},
	products: () => demo,
	cart: () => {
		let cartData = [];
		for (let key in cart) {
			cartData.push(cart[key]);
		}
		return cartData;
	},
	addToCart: (product) => {
		let found = false;
		demo.map((item) => {
			if (item.hasOwnProperty('id')) {
				if (item.id === product.id) {
					if (cart.hasOwnProperty(product.id)) {
						cart[product.id]['quantity']++;
					} else {
						cart[product.id] = {
							product: item,
							quantity: 1
						};
					}
					found = true;
				}
			}
		});
		return found;
	}
};

app.use('/graphql', graphqlHTTP({
	schema: schema,
	rootValue: root,
	graphiql: true
}));
app.listen(4000, () => {
	console.log('Now browse to http://localhost:4000/graphql')
});