'use strict';

import React, {PureComponent} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class extends PureComponent {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            value: []
        }
    }

    componentDidMount() { //because of the react-select bug - it sets wrong initial height
        this.setState({
            value: this.props.defaultValue
        })
    }

    render() {
        return <Select
                value={this.state.value}
                multi={true}
                onChange={this.onSelect.bind(this)}
                {...this.props} />
    }

    onSelect(value) {
        const lastEl = value.slice(-1)[0];
        if(lastEl && lastEl.isExclusive) {
            value = [lastEl]
        } else {
            value = value.filter(el => el && !el.isExclusive)
        }
        this.props.onValue(value);
        this.setState({value})
    }
}