'use strict';

import React, {PureComponent} from 'react';
import MultipleSelect from './multiple-select';

export default class extends PureComponent {
    get options() {
        return this.props.inputOptions.months
    }

    render() {
        return <MultipleSelect
            {...this.props}
            style={{maxWidth: 400, minWidth: 90}}
            onValue={this.onValue.bind(this)}
            options={this.options} />
    }

    onValue(val) {
        this.props.setValue(this.props.name || 'month', val)
    }
}