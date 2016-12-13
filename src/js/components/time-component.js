'use strict';

import React, {PureComponent} from 'react';
import MultipleSelect from './multiple-select';
import SingleSelect from './single-select';

export default class extends PureComponent {
    render() {
        if(this.props.multi) {
            return <MultipleSelect
                style={{width: 200}}
                {...this.props} />
        } else {
            return <SingleSelect
                style={{width: 100}}
                {...this.props} />
        }
    }
}