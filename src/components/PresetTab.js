// @flow

import {PureComponent} from 'react'
import pick from 'lodash/pick'
import {MINUTES, EVERY} from 'data/constants'
import {isMultiple, ensureMultiple, replaceEvery} from 'utils'
import type {PresetTabState} from './types/PresetTabState'
import type {PresetTabProps} from './types/PresetTabProps'

export const ensureEveryOn = (value: string[] | string, multiple: boolean) => {
    const process = (item: string) => {
        if(item === EVERY) {
            return item
        }
        if(item.includes('-')) {
            return item
        }
        if(multiple && item.includes('/')) {
            return replaceEvery(item)
        }
        if(!multiple && !item.includes('/')) {
            return `*/${item}`
        }
        return item
    };
    if(value instanceof Array) {
        return value.map(process)
    } else {
        return process(value)
    }
};

export function ensureValue(value: string | string[]) {
    if (Array.isArray(value) && !value.length) {
        return [EVERY]
    }
    if (!value) {
        return EVERY
    }
    return value
}

export function ensureArrayValue(value: string[]): string[] {
    if (value.length) {
        return value
    }
    return [EVERY]
}

export default class PresetTab extends PureComponent {
    constructor(props: PresetTabProps, ctx: Object) {
        super(props, ctx);
        const {expression} = props;
        const {minutes, hours} = expression;
        const minutesMultiple = isMultiple(minutes),
            hoursMultiple = isMultiple(hours);
        this.state = {
            ...expression,
            activeTime: MINUTES,
            minutesMultiple,
            hoursMultiple,
            minutes,
            hours
        };
    }

    props: PresetTabProps;

    state: PresetTabState;

    selectMinutes = (value: string) => {
        this.setState({
            minutes: ensureValue(value)
        })
    };

    selectHours = (value: string) => {
        this.setState({
            hours: ensureValue(value)
        })
    };

    selectDayOfWeek = (value: string) => {
        this.setState({
            dayOfWeek: ensureArrayValue(value)
        })
    };

    selectDayOfMonth = (value: string) => {
        this.setState({
            dayOfMonth: ensureArrayValue(value)
        })
    };

    selectMonth = (value: string) => {
        this.setState({
            month: ensureArrayValue(value)
        })
    };

    changeDateType = () => {
        const {state} = this;
        const {activeTime} = state;
        const field = activeTime.toLowerCase();
        const key = `${field}Multiple`;
        const value = !this.state[key];
        this.setState({
            [key]: value,
            [field]: ensureMultiple(state[field], value)
        })
    };

    getExpression() {
        const {state} = this;
        const {minutes, hours, minutesMultiple, hoursMultiple} = state;
        return {
            minutes: ensureEveryOn(minutes, minutesMultiple),
            hours: ensureEveryOn(hours, hoursMultiple),
            ...pick(state, ['dayOfMonth', 'month', 'dayOfWeek'])
        }
    }
}
