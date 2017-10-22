import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/app/App';
import AppReducer from './components/app/appReducer';
import registerServiceWorker from './registerServiceWorker';
import { loadConfig, saveConfig } from './utils/localStorage';

let prevState = loadConfig();
let hadPrevState = prevState !== undefined;
const store = createStore(AppReducer, prevState);
store.subscribe(() => {
  saveConfig(store.getState());
})

ReactDOM.render(
    <Provider store={store}>
      <App
        restart = {hadPrevState}
      />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
