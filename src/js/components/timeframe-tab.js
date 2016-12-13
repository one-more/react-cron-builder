'use strict';

import React, {PureComponent} from 'react';
import DateComponent from './date-component';
import MinutesBox from './minutes-box';
import HoursBox from './hours-box';
import MultipleSwitcher from './multiple-switcher';

export default class extends PureComponent {
    render() {
        return <div className="cron-editor__preset">
            <div className="cron-editor__row" style={{alignItems: 'flex-end'}}>
                <MultipleSwitcher onChange={this.props.switchTimeFormat}>
                    {props => {
                        return <div className="cron-editor__cell">
                            <div name="minutes">
                                <MinutesBox {...props} {...this.props} defaultValue={this.props.minutes}  />
                            </div>
                        </div>
                    }}
                </MultipleSwitcher>
                <div className="cron-editor__cell cron-editor__cell_small" style={{marginLeft: 60}}>
                    <label className="cron-editor__label">
                        Starting at:
                    </label>
                    <div name="hours-start-at">
                        <HoursBox onInputKeyDown={this.preventReset} clearable={false} {...this.props} name={'hoursStartAt'} defaultValue={this.props.hoursStartAt} />
                    </div>
                </div>
                <div className="cron-editor__cell cron-editor__cell_middle">
                    <label className="cron-editor__label">
                        Ending at:
                    </label>
                    <div name="hours-end-at">
                        <HoursBox onInputKeyDown={this.preventReset} clearable={false} {...this.props} name={'hoursEndAt'} defaultValue={this.props.hoursEndAt} />
                    </div>
                </div>
                <div className="cron-editor__cell">
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