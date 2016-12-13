'use strict';

import React, {PureComponent} from 'react';

export default class extends PureComponent {
    render() {
        return <div style={{textAlign: 'center'}}>
            <button className="cron-editor__action" onClick={this.props.onAction}>
                Generate Cron expression
            </button>
        </div>
    }
}