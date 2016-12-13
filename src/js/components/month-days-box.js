'use strict';

import React, {PureComponent} from 'react';
import MultipleSelect from './multiple-select';

export default class extends PureComponent {
    get options() {
        return this.props.inputOptions.monthDays
    }

    render() {
        return <MultipleSelect
            {...this.props}
            style={{maxWidth: 220, minWidth: 90}}
            onValue={this.onValue.bind(this)}
            options={this.options} />
    }

    onValue(val) {
        this.props.setValue(this.props.name || 'dayOfMonth', val)
    }
}