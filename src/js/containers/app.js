'use strict';

import React, {PureComponent} from 'react';
import CronEditor from './cron-editor';

import * as reducers from '../reducers';
import { combineReducers } from 'redux';
import { createStore } from 'redux';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

import { Provider } from 'react-redux';

export default class extends PureComponent {
    render() {
        return <Provider store={store}>
            <CronEditor {...this.props} />
        </Provider>
    }
}