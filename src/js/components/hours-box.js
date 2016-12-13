'use strict';

import React, {PureComponent} from 'react';
import TimeComponent from './time-component';

export default class extends PureComponent {
    get options() {
        return this.props.inputOptions.hours
    }

    render() {
        return <TimeComponent
            {...this.props}
            options={this.options}
            onValue={this.onValue.bind(this)} />
    }

    onValue(val) {
        this.props.setValue([this.props.name || 'hours'], val)
    }
}