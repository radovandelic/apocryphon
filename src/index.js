import React from 'react';
import ReactDOM from 'react-dom';
import './sass/styles.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';

import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
