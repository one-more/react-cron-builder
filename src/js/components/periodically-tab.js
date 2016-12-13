'use strict';

import React, {PureComponent} from 'react';
import DateComponent from './date-component';
import MinutesBox from './minutes-box';
import HoursBox from './hours-box';
import MultipleSwitcher from './multiple-switcher';
import _ from 'lodash';

export default class extends PureComponent {
    render() {
        const minutesTabClassName = `cron-editor__tab ${this.props.timeTab == 'minutes' && 'cron-editor__tab_active'}`,
            hoursTabClassName = `cron-editor__tab ${this.props.timeTab == 'hours' && 'cron-editor__tab_active'}`;
        return <div className="cron-editor__preset">
            <MultipleSwitcher onChange={this.props.switchTimeFormat}>
                {props => {
                    if(this.props.timeTab == 'minutes') {
                        return <div name="minutes">
                            <MinutesBox {...this.props} {...props} defaultValue={this.props.minutes} />
                        </div>
                    } else {
                        return <div name="hours">
                            <HoursBox {...this.props} {...props} defaultValue={this.props.hours} />
                        </div>
                    }
                }}
            </MultipleSwitcher>
            <div className="cron-editor__cell cron-editor__cell_middle" style={{marginLeft: '5px'}}>
                <button
                    role="minutes-tab"
                    onClick={this.props.switchTimeTab}
                    className={minutesTabClassName}
                    disabled={this.props.timeTab == 'minutes'}>minutes</button>
                <button
                    role="hours-tab"
                    onClick={this.props.switchTimeTab}
                    className={hoursTabClassName}
                    disabled={this.props.timeTab == 'hours'}>hours</button>
            </div>
            <DateComponent {...this.props} />
        </div>
    }
}