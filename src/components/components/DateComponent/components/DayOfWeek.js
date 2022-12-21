// @flow

import {PureComponent} from 'react'

const weekDaysOptions = [
    'Sundays', 'Mondays', 'Tuesdays', 'Wednesdays',
    'Thursdays', 'Fridays', 'Saturdays',
    
].map((day: string, i: number) => ({
    label: day,
    value: String(i)
}));

const options = [
    {
        label: 'every day',
        value: '*'
    },
    {
        label: 'Mondays to Fridays',
        value: '1-5'
    },
    {
        label: 'Saturdays and Sundays',
        value: '6,0'
    }
].concat(weekDaysOptions);

export default class DayOfWeek extends PureComponent {
    static getOptions() {
        return options
    }

    static className: string = 'DayOfWeek';
}
