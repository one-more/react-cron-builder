'use strict';

import _ from 'lodash';
import * as types from '../constants/action-types';

function defaultTabState() {
    return {
        minutes: '*',
        hours: '*',
        dayOfMonth: '*',
        month: '*',
        dayOfWeek: '*',
        timeTab: 'minutes',
        inputOptions: {
            get minutes() {
                const values = [];
                for(let i=1; i<60; i++) {
                    values.push(i)
                }
                return values.map(el => ({value: el, label: el}))
            },
            get hours() {
                return [1,2,3,4,5,6,8,12].map(el => ({value: el, label: el}))
            },
            get hours24() {
                const values = [];
                for(let i=0; i<24; i++) {
                    values.push(i)
                }
                return values.map(el => ('0'+el).slice(-2)).map((el, i) => ({value: i, label: el}))
            },
            get weekDays() {
                return [
                    {
                        value: '*',
                        label: 'every day',
                        isExclusive: true
                    },
                    {
                        value: '1-5',
                        label: 'Mondays to Fridays',
                        isExclusive: true
                    },
                    {
                        value: '6-0',
                        label: 'Saturdays and Sundays',
                        isExclusive: true
                    }
                ].concat(['Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'].map((el,i) => ({
                    value: (++i).toString(),
                    label: el
                })))
            },
            get monthDays() {
                const days = [];
                for(let i=1; i<32; i++) {
                    days.push({
                        label: i,
                        value: i
                    })
                }
                return [{
                    label: 'every month day',
                    value: '*',
                    isExclusive: true
                }].concat(days)
            },
            get months() {
                return [
                    {
                        label: 'every month',
                        value: '*',
                        isExclusive: true
                    }
                ].concat(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((el,i) => ({
                    value: i.toString(),
                    label: el
                })))
            }
        },

        dateFormatter(val) {
            switch(typeof val) {
                case 'string':
                    return val;
                case 'object':
                    return this.dateObjectFormatter(val);
                default:
                    return undefined
            }
        },

        dateObjectFormatter(val) {
            if(val == null) {
                return '*'
            }
            switch(val.length) {
                case 0:
                    return '*';
                case undefined:
                    return val.value;
                default:
                    return val.map(el => el.value).join(',')
            }
        },

        timeFormatter(val) {
            switch(typeof val) {
                case 'string':
                    return val;
                case 'object':
                    return this.timeObjectFormatter(val);
                default:
                    return undefined
            }
        },

        timeObjectFormatter(val) {
            if(val == null) {
                return '*'
            }
            switch(val.length) {
                case 0:
                    return '*';
                case 1: {
                    const value = val[0].value;
                    return value == 1 ? '*' : value
                }
                case undefined: {
                    const value = val.value;
                    return (value == 1 || value == undefined) ? '*' : '*/' + value
                }
                default:
                    return val.map(el => el.value).join(',')
            }
        },

        generateExpression() {
            return `
                    ${this.timeFormatter(this.minutes)} 
                    ${this.timeFormatter(this.hours)}
                    ${this.dateFormatter(this.dayOfMonth)}
                    ${this.dateFormatter(this.month)}
                    ${this.dateFormatter(this.dayOfWeek)}
                `.replace(/\s+/g, ' ')
        }
    }
}

const tabStates = [
    _.merge({}, defaultTabState(), {
        minutes: defaultTabState().inputOptions.minutes[0],
        hours: defaultTabState().inputOptions.hours[0]
    }),
    _.merge({}, defaultTabState(), {
        get minutes() {
            return this.inputOptions.minutes[5]
        },
        get hoursStartAt() {
            return this.inputOptions.hours[9]
        },
        get hoursEndAt() {
            return this.inputOptions.hours[18]
        },
        dayOfWeek: defaultTabState().inputOptions.weekDays[1],
        inputOptions: {
            minutes: defaultTabState().inputOptions.minutes.map(el => {
                el.label += el.label == 1 ? ' min' : ' mins';
                return el
            }),
            hours: defaultTabState().inputOptions.hours24.map(el => Object.assign(el, {
                label: el.label+':00'
            }))
        },
        generateExpression() {
            return `
                    ${this.timeFormatter(this.minutes)} 
                    ${this.hoursStartAt.value}-${this.hoursEndAt.value}
                    ${this.dateFormatter(this.dayOfMonth)}
                    ${this.dateFormatter(this.month)}
                    ${this.dateFormatter(this.dayOfWeek)}
                `.replace(/\s+/g, ' ')
        }
    }),
    _.merge({}, defaultTabState(), {
        get hours() {
            return this.inputOptions.hours[8]
        },
        minutes: defaultTabState().inputOptions.minutes[44],
        inputOptions: {
            hours: defaultTabState().inputOptions.hours24
        },
        generateExpression() {
            return `
                    ${this.minutes.value} 
                    ${this.hours.value}
                    ${this.dateFormatter(this.dayOfMonth)}
                    ${this.dateFormatter(this.month)}
                    ${this.dateFormatter(this.dayOfWeek)}
                `.replace(/\s+/g, ' ')
        }
    })
];

const defaultState = {
    activeTabIndex: 0,
    get tabState() {
        return tabStates[this.activeTabIndex]
    }
};

function checkStateValueIsArray(name, state) {
    if(!Array.isArray(state[name])) {
        state[name] = [state[name]];
    }
}

function checkStateValueIsObject(name, state) {
    if(Array.isArray(state[name])) {
        state[name] = _.first(state[name])
    }
}

export default function (state = defaultState, action) {
    switch(action.type) {
        case types.SET_ACTIVE_TAB:
            return {
                ...state,
                activeTabIndex: action.index,
                tabState: tabStates[action.index]
            };
        case types.CALCULATE_EXPRESSION:
            state.tabState.expression = state.tabState.generateExpression();
            return {
                ...state
            };
        case types.SWITCH_TIME_FORMAT: {
            const tabState = state.tabState;
            if(tabState.timeFormat == 'multi') {
                checkStateValueIsObject('minutes', tabState);
                checkStateValueIsObject('hours', tabState);
                tabState.timeFormat = 'single';
            } else {
                checkStateValueIsArray('minutes', tabState);
                checkStateValueIsArray('hours', tabState);
                tabState.timeFormat = 'multi';
            }
            return {
                ...state
            };
        }
        case types.SWITCH_TIME_TAB: {
            const tabState = state.tabState;
            if(tabState.timeTab == 'minutes') {
                tabState.timeTab = 'hours'
            } else {
                tabState.timeTab = 'minutes'
            }
            return {
                ...state
            };
        }
        case types.SET_VALUE:
            state.tabState[action.name] = action.val;
            return {
                ...state
            };
        default:
            return state
    }
}