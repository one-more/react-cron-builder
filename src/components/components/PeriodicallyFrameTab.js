// @flow

import React from 'react'
import range from 'lodash/range'
import {toOptions} from 'utils'
import type {Option} from 'types/Option'
import PresetTab from './PresetTab'
import MultipleSwitcher from './MultipleSwitcher'
import TimeInput from './components/TimeInput'
import DateComponent, {DayOfWeek, DayOfMonth, Month} from './components/DateComponent'
import type {PresetTabProps} from './types/PresetTabProps'

const minutesOptions = toOptions(range(1, 60)).map((option: Option) => {
    const {label, value} = option;
    if(label === '1') {
        return {
            label: `${label} min`,
            value
        }
    } else {
        return {
            label: `${label} mins`,
            value
        }
    }
});

const hoursOptions = toOptions(range(0, 24)).map((option: Option) => {
    const {label, value} = option;
    return {
        label: `${'0'.concat(label).slice(-2)}:00`,
        value
    }
});

const timeInputProps = {
    style: {
        minWidth: 110
    }
};

export default class PeriodicallyFrameTab extends PresetTab {
    constructor(props: PresetTabProps, ctx: Object) {
        super(props, ctx);
        const {state} = this;
        this.state = {
            ...state,
            minutes: '6',
            hours: '9-18',
            hoursFrom: '9',
            hoursTo: '18'
        }
    }

    isMinutesMultiple = () => {
        const {minutesMultiple} = this.state;
        return minutesMultiple
    };

    onHoursChange = (field: string) => {
        return (value: string) => {
            const {hoursFrom, hoursTo} = this.state;
            if(field === 'hoursFrom') {
                this.setState({
                    hours: `${value}-${String(hoursTo)}`,
                    hoursFrom: value
                })
            } else {
                this.setState({
                    hours: `${String(hoursFrom)}-${value}`,
                    hoursTo: value
                })
            }
        }
    };

    render() {
        const {styleNameFactory} = this.props;
        const {minutes, hoursFrom, hoursTo, dayOfWeek, dayOfMonth, month} = this.state;
        return (
            <div
                {...styleNameFactory('preset')}
            >
                <div>
                    <MultipleSwitcher
                        styleNameFactory={styleNameFactory}
                        isMultiple={this.isMinutesMultiple()}
                        onChange={this.changeDateType}
                    />
                    <div
                        {...styleNameFactory('row', 'main')}
                    >
                        <TimeInput
                            options={minutesOptions}
                            onChange={this.selectMinutes}
                            styleNameFactory={styleNameFactory}
                            value={minutes}
                            multi={this.isMinutesMultiple()}
                            {...timeInputProps}
                        />
                    </div>
                </div>
                <div
                    {...styleNameFactory('row', 'hours-range')}
                >
                    <div>
                        <div
                            {...styleNameFactory('label')}
                        >
                            Starting at:
                        </div>
                        <TimeInput
                            styleNameFactory={styleNameFactory}
                            options={hoursOptions}
                            value={hoursFrom}
                            onChange={this.onHoursChange('hoursFrom')}
                            {...timeInputProps}
                        />
                    </div>
                    <div>
                        <div
                            {...styleNameFactory('label')}
                        >
                            Ending at:
                        </div>
                        <TimeInput
                            styleNameFactory={styleNameFactory}
                            options={hoursOptions}
                            value={hoursTo}
                            onChange={this.onHoursChange('hoursTo')}
                            {...timeInputProps}
                        />
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
