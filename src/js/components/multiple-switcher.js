'use strict';

import React, {PureComponent} from 'react';
import _ from 'lodash';

export default class extends PureComponent {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            multi: props.multi || false
        }
    }

    render() {
        const Child = this.props.children;
        return <div>
            <div className="cron-editor__row" style={{marginBottom: 5}}>
                <button role="multiple-switcher-single"
                        onClick={this.onTabSelect.bind(this)}
                        className={`cron-editor__tab ${!this.state.multi && 'cron-editor__tab_active'}`}
                        disabled={!this.state.multi}>Every:</button>
                <button role="multiple-switcher-multi"
                        onClick={this.onTabSelect.bind(this)}
                        className={`cron-editor__tab ${this.state.multi && 'cron-editor__tab_active'}`}
                        disabled={this.state.multi}>On:</button>
            </div>
            <div className="cron-editor__row">
                <Child multi={this.state.multi} />
            </div>
        </div>
    }

    onTabSelect() {
        this.setState(prevState => {
            return {
                multi: !prevState.multi
            }
        }, () => {
            (this.props.onChange || _.noop)(this.state.multi)
        })
    }
}