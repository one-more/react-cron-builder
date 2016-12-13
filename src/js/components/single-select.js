'use strict';

import React, {PureComponent} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';

export default class extends PureComponent {
    render() {
        return <Select
            value={this.parseValue(this.props.defaultValue)}
            onChange={this.onSelect.bind(this)}
            {...this.props} />
    }

    onSelect(value) {
        this.props.onValue(value)
    }

    parseValue(value) {
        if(Array.isArray(value)) {
            return _.first(value) || '*'
        } else {
            return value
        }
    }
}