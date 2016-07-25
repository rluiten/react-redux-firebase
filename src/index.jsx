import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';

const rootElement = document.getElementById('root');

function render(MyApp) {
	ReactDOM.render(
		<AppContainer errorReporter={Redbox}>
			<MyApp />
		</AppContainer>,
		rootElement
	);
}

render(App);

if (module.hot) {
	module.hot.accept('./App', () => {
		render(require('./App').App); // eslint-disable-line global-require
	});
}
