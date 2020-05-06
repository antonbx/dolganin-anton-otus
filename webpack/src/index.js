import * as $ from 'jquery';
import Post from '@models/Post';
import './babel';
import './styles/styles.css';
import './styles/less.less';

// кстати, мы можем делать еще так:
// import json './json.json'
// и даже грузить картинки: https://webpack.js.org/loaders/file-loader/
// а также шрифты, все тот же модуль
// и работать с xml: https://www.npmjs.com/package/xml-loader
// и с csv: https://webpack.js.org/loaders/css-loader/ && https://www.papaparse.com/

const post = new Post('Webpack title');

console.log(post.toString());

$('pre').html('her');