'use strict';

import * as types from '../constants/action-types';

export function setActiveTab(index) {
    return {
        type: types.SET_ACTIVE_TAB,
        index
    }
}

export function calculateExpression() {
    return {
        type: types.CALCULATE_EXPRESSION
    }
}

export function switchTimeFormat(format) {
    return {
        type: types.SWITCH_TIME_FORMAT
    }
}

export function switchTimeTab() {
    return {
        type: types.SWITCH_TIME_TAB
    }
}

export function setValue(name, val) {
    return {
        type: types.SET_VALUE,
        name,
        val
    }
}