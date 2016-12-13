'use strict';

import React, {PureComponent} from 'react';
import MultipleSelect from './multiple-select';


export default class extends PureComponent {
    get options() {
        return this.props.inputOptions.weekDays
    }

    get name() {
        return this.props.name || 'dayOfWeek'
    }

    render() {
        return <MultipleSelect
            {...this.props}
            style={{maxWidth: 400, minWidth: 220, width: this.props.defaultValue.length*110 || 220}}
            options={this.options}
            onValue={this.onValue.bind(this)} />
    }

    onValue(val) {
        this.props.setValue(this.name, val)
    }
}