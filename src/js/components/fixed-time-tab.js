'use strict';

import React, {PureComponent} from 'react';
import DateComponent from './date-component';
import HoursBox from './hours-box';
import MinutesBox from './minutes-box';

export default class extends PureComponent {
    render() {
        return <div className="cron-editor__preset">
            <div className="cron-editor__row">
                <div className="cron-editor__cell cron-editor__cell_large">
                    <label className="cron-editor__label">
                        At:
                    </label>
                    <div className="cron-editor__row">
                        <div>
                            <div name="hours">
                                <HoursBox onInputKeyDown={this.preventReset} clearable={false} {...this.props} defaultValue={this.props.hours} />
                            </div>
                        </div>
                        <div className="cron-editor__near-block">
                            <div name="minutes">
                                <MinutesBox onInputKeyDown={this.preventReset} clearable={false} {...this.props} defaultValue={this.props.minutes} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cron-editor__cell cron-editor__cell" style={{marginLeft: 30}}>
                    <DateComponent {...this.props} />
                </div>
            </div>
        </div>
    }

    preventReset(e) {
        if(e.keyCode == 8) {
            e.preventDefault()
        }
    }
}