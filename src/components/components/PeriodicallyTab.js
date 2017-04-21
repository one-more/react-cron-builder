// @flow

import React from 'react'
import {If, Then, Else} from 'react-if'
import {MINUTES} from 'data/constants'
import {isMultiple, toggleDateType, toOptions} from 'utils'
import range from 'lodash/range'
import MultipleSwitcher from './MultipleSwitcher'
import TimeInput from './components/TimeInput'
import DateComponent, {DayOfWeek, DayOfMonth, Month} from './components/DateComponent'
import PresetTab from './PresetTab'
import type {PresetTabState} from './types/PresetTabState'

const minutesOptions = toOptions(range(1, 60));
const hoursOptions = toOptions(range(1, 13));

const isMinutes = (activeTime: string) => activeTime === MINUTES;

const timeInputProps = {style: {minWidth: 75}};

export default class PeriodicallyTab extends PresetTab {

    toggleActiveTime = () => {
        this.setState(({activeTime}: PresetTabState) => ({
            activeTime: toggleDateType(activeTime)
        }))
    };

    isMultiple = () => {
        const {activeTime, minutesMultiple, hoursMultiple} = this.state;
        if(activeTime === MINUTES) {
            return minutesMultiple
        } else {
            return hoursMultiple
        }
    };

    render() {
        const {styleNameFactory} = this.props;
        const {activeTime, minutes, hours, dayOfWeek, dayOfMonth, month} = this.state;
        return (
            <div {...styleNameFactory('preset')} >
                <div>
                    <MultipleSwitcher
                        styleNameFactory={styleNameFactory}
                        isMultiple={this.isMultiple()}
                        onChange={this.changeDateType}
                    />
                    <div
                        {...styleNameFactory('row', 'main')}
                    >
                        <If condition={isMinutes(activeTime)}>
                            <Then>
                                <TimeInput
                                    options={minutesOptions}
                                    value={minutes}
                                    styleNameFactory={styleNameFactory}
                                    onChange={this.selectMinutes}
                                    multi={isMultiple(minutes)}
                                    {...timeInputProps}
                                />
                            </Then>
                            <Else>
                                <TimeInput
                                    options={hoursOptions}
                                    value={hours}
                                    styleNameFactory={styleNameFactory}
                                    multi={isMultiple(hours)}
                                    onChange={this.selectHours}
                                    {...timeInputProps}
                                />
                            </Else>
                        </If>
                        <div
                            style={{width: 150}}
                        >
                            <MultipleSwitcher
                                styleNameFactory={styleNameFactory}
                                isMultiple={!isMinutes(activeTime)}
                                onChange={this.toggleActiveTime}
                                single="minutes"
                                multiple="hours"
                            />
                        </div>
                    </div>
                </div>
                <DateComponent
                    styleNameFactory={styleNameFactory}
                >
                    <DayOfWeek
                        value={dayOfWeek}
                        onChange={this.selectDayOfWeek}
                    />
                    <DayOfMonth
                        value={dayOfMonth}
                        onChange={this.selectDayOfMonth}
                    />
                    <Month
                        value={month}
                        onChange={this.selectMonth}
                    />
                </DateComponent>
            </div>
        )
    }
}
