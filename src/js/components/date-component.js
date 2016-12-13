'use strict';

import React, {PureComponent} from 'react';
import DaysBox from './days-box';
import MonthDaysBox from './month-days-box';
import MonthBox from './months-box';

export default class extends PureComponent {
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            isOpened: false
        }
    }

    render() {
        return <div>
            <label className="cron-editor__label">On:</label>
            <div className="cron-editor__row">
                <div name="week-days">
                    <DaysBox defaultValue={this.props.dayOfWeek} {...this.props} />
                </div>
                {this.state.isOpened && <div className="cron-editor__row">
                    <div className="cron-editor__near-block" name="month-days">
                        <MonthDaysBox defaultValue={this.props.dayOfMonth} {...this.props} />
                    </div>
                    <div className="cron-editor__near-block" name="months">
                        <MonthBox defaultValue={this.props.month} {...this.props} />
                    </div>
                </div>}
                {!this.state.isOpened && <div className="cron-editor__near-block">
                    <button role="full-date-select-switcher" onClick={this.onShowFull.bind(this)} className="cron-editor__tab">
                        ...
                    </button>
                </div>}
            </div>
        </div>
    }

    onShowFull() {
        this.setState({
            isOpened: true
        })
    }
}