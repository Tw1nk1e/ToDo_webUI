import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "mobx-react";
import { createStores } from "./app/stores/createStore";

import App from './app/App';

const rootStore = createStores();

const Root = (
  <Provider {...rootStore}>
    <App />
  </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));