// @flow

import type {Option} from 'types/Option'
import type {CronExpression} from 'types/CronExpression'

import head from 'lodash/head'
import values from 'lodash/values'
import {MINUTES, HOURS} from 'data/constants'

export const toggleMultiple = (value: any) => {
    if(value instanceof Array) {
        return head(value)
    } else {
        return [value]
    }
};

export const toOptions = (_values: Array<any>) => {
    return _values.map(String).map((value: string) => ({
        value,
        label: value
    }))
};

export const toggleDateType = (value: string) => {
    return value === MINUTES ? HOURS : MINUTES
};

export const parseTimeValue = (value: any) => {
    if(value instanceof Array) {
        return value.map(parseTimeValue)
    }
    switch (value) {
        case '*':
            return '1';
        default:
            return value;
    }
};

export const isMultiple = (value: any) => value instanceof Array;

export const ensureMultiple = (value: any, multiple: boolean) => {
    if(multiple && !isMultiple(value)) {
        return toggleMultiple(value)
    }
    if(!multiple && isMultiple(value)) {
        return toggleMultiple(value)
    }
    return value
};

export const getValues = (value: Array<Option>) => value.map((option: Option) => option.value);

export const getValue = (value: any) => {
    return typeof value === 'object' ? value.value : value
};

export const generateCronExpression = (expression: CronExpression) => {
    return values(expression).join(' ')
};

export const splitMultiple = (value: string) => {
    if(value.includes(',')) {
        return value.split(',')
    }
    return value
};

export const parseCronExpression = (expression: string) => {
    const [minutes, hours, dayOfMonth, month, dayOfWeek] = expression.split(' ');
    return {
        minutes: splitMultiple(minutes),
        hours: splitMultiple(hours),
        dayOfMonth: splitMultiple(dayOfMonth),
        month: splitMultiple(month),
        dayOfWeek: splitMultiple(dayOfWeek)
    }
};
