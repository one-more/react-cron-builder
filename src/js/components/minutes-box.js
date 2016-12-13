'use strict';

import React, {PureComponent} from 'react';
import TimeComponent from './time-component';

export default class extends PureComponent {
    get options() {
        return this.props.inputOptions.minutes
    }

    render() {
        return <TimeComponent
            {...this.props}
            onValue={this.onValue.bind(this)}
            options={this.options} />
    }

    onValue(val) {
        this.props.setValue(this.props.name || 'minutes', val)
    }
}