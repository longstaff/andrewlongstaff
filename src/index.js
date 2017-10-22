import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/app/App';
import AppReducer from './components/app/appReducer';
import registerServiceWorker from './registerServiceWorker';
import { loadConfig, saveConfig } from './utils/localStorage';

const store = createStore(AppReducer, loadConfig());
store.subscribe(() => {
  saveConfig(store.getState());
})

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
