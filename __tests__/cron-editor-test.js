'use strict';

import React from 'react';
import {mount} from 'enzyme';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import App from '../src/js/containers/app';

chai.use(chaiEnzyme());

const wrapper = mount(<App onExpression={onExpression} />);
let testExpression = '';

function onExpression(expr) {
    expect(expr.trim()).to.equal(testExpression)
}
function generateExpression() {
    wrapper.find('.cron-editor__action').simulate('click')
}
function getSelectInput(parent) {
    return wrapper.find(parent+' .Select [role="combobox"]')
}
function setSelectValue(parent, value) {
    const input = getSelectInput(parent);
    input.simulate('change', {target: {
        value: value.toString()
    }});
    input.simulate('keydown', {keyCode: 13});
}
function removeSelectValue(parent) {
    getSelectInput(parent).simulate('keydown', {keyCode: 8})
}

/* FIRST TAB */
test('initial expression: * * * * *', () => {
    testExpression = '* * * * *';
    generateExpression()
});

test('select minutes increment: */5 * * * *', () => {
    testExpression = '*/5 * * * *';
    setSelectValue('[name="minutes"]', 5);
    generateExpression()
});

test('reset minutes: * * * * *', () => {
    testExpression = '* * * * *';
    removeSelectValue('[name="minutes"]');
    generateExpression()
});

test('select minutes increment: */3 * * * *', () => {
    testExpression = '*/3 * * * *';
    setSelectValue('[name="minutes"]', 3);
    generateExpression()
});

test('switch to hours tab', () => {
    wrapper.find('[role="hours-tab"]').simulate('click');
});

test('select hours increment: */3 */2 * * *', () => {
    testExpression = '*/3 */2 * * *';
    setSelectValue('[name="hours"]', 2);
    generateExpression()
});

test('reset hours: */3 * * * *', () => {
    testExpression = '*/3 * * * *';
    removeSelectValue('[name="hours"]');
    generateExpression()
});

test('select hours increment: */3 */5 * * *', () => {
    testExpression = '*/3 */5 * * *';
    setSelectValue('[name="hours"]', 5);
    generateExpression()
});

/* START DATE TEST */
test('select week days (sat-sun): */3 */5 * * 6-0', () => {
    testExpression = '*/3 */5 * * 6-0';
    setSelectValue('[name="week-days"]', 'sat');
    generateExpression()
});

test('select week days (thursdays): */3 */5 * * 4', () => {
    testExpression = '*/3 */5 * * 4';
    setSelectValue('[name="week-days"]', 'thu');
    generateExpression()
});

test('reset weekdays: */3 */5 * * *', () => {
    testExpression = '*/3 */5 * * *';
    removeSelectValue('[name="week-days"]');
    generateExpression()
});

test('select week days (mon-fri): */3 */5 * * 1-5', () => {
    testExpression = '*/3 */5 * * 1-5';
    setSelectValue('[name="week-days"]', 1);
    generateExpression()
});

test('show all date inputs', () => {
    wrapper.find('[role="full-date-select-switcher"]').simulate('click');
});

test('select month days: */3 */5 3 * 1-5', () => {
    testExpression = '*/3 */5 3 * 1-5';
    setSelectValue('[name="month-days"]', 3);
    generateExpression()
});

test('reset month days: */3 */5 * * 1-5', () => {
    testExpression = '*/3 */5 * * 1-5';
    removeSelectValue('[name="month-days"]');
    generateExpression()
});

test('select month days: */3 */5 3 * 1-5', () => {
    testExpression = '*/3 */5 3 * 1-5';
    setSelectValue('[name="month-days"]', 3);
    generateExpression()
});

test('select months: */3 */5 3 7 1-5', () => {
    testExpression = '*/3 */5 3 7 1-5';
    setSelectValue('[name="months"]', 7);
    generateExpression()
});

test('reset months: */3 */5 3 * 1-5', () => {
    testExpression = '*/3 */5 3 * 1-5';
    removeSelectValue('[name="months"]');
    generateExpression()
});

test('select months: */3 */5 3 7 1-5', () => {
    testExpression = '*/3 */5 3 7 1-5';
    setSelectValue('[name="months"]', 7);
    generateExpression()
});
/* END DATE TEST */

test('switch to hours list', () => {
    wrapper.find('[role="multiple-switcher-multi"]').simulate('click');
});

test('select hours list: 3 5,6 3 7 1-5', () => {
    testExpression = '3 5,6 3 7 1-5';
    setSelectValue('[name="hours"]', 6);
    generateExpression()
});

test('switch to minutes list', () => {
    wrapper.find('[role="minutes-tab"]').simulate('click');
});

test('select minutes list: 3,30 5,6 3 7 1-5', () => {
    testExpression = '3,30 5,6 3 7 1-5';
    setSelectValue('[name="minutes"]', 30);
    generateExpression()
});
/* END FIRST TAB */

/* SECOND TAB */
test('switch to time frame tab', () => {
    wrapper.find('[role="preset-tab"]').at(1).simulate('click')
});

test('initial expression */6 9-18 * * 1-5', () => {
    testExpression = '*/6 9-18 * * 1-5';
    generateExpression()
});

test('reset minutes: * 9-18 * * 1-5', () => {
    testExpression = '* 9-18 * * 1-5';
    removeSelectValue('[name="minutes"]');
    generateExpression()
});

test('set minutes: */40 9-18 * * 1-5', () => {
    testExpression = '*/40 9-18 * * 1-5';
    setSelectValue('[name="minutes"]', 40);
    generateExpression()
});

test('switch to minutes list', () => {
    wrapper.find('[role="multiple-switcher-multi"]').simulate('click');
});

test('set minutes: 40,6 9-18 * * 1-5', () => {
    testExpression = '40,6 9-18 * * 1-5';
    setSelectValue('[name="minutes"]', 6);
    generateExpression()
});

test('switch to minutes increment', () => {
    wrapper.find('[role="multiple-switcher-single"]').simulate('click');
});

test('set minutes: */40 9-18 * * 1-5', () => {
    testExpression = '*/40 9-18 * * 1-5';
    setSelectValue('[name="minutes"]', 40);
    generateExpression()
});

test('set hours start: */40 3-18 * * 1-5', () => {
    testExpression = '*/40 3-18 * * 1-5';
    setSelectValue('[name="hours-start-at"]', 3);
    generateExpression()
});

test('set hours end: */40 3-21 * * 1-5', () => {
    testExpression = '*/40 3-21 * * 1-5';
    setSelectValue('[name="hours-end-at"]', 21);
    generateExpression()
});

test('try reset hours start: */40 3-21 * * 1-5', () => {
    testExpression = '*/40 3-21 * * 1-5';
    removeSelectValue('[name="hours-start-at"]');
    generateExpression()
});

test('try reset hours end: */40 3-21 * * 1-5', () => {
    testExpression = '*/40 3-21 * * 1-5';
    removeSelectValue('[name="hours-end-at"]');
    generateExpression()
});

/* START DATE TEST */
test('select week days (sat-sun): */40 3-21 * * 6-0', () => {
    testExpression = '*/40 3-21 * * 6-0';
    setSelectValue('[name="week-days"]', 'sat');
    generateExpression()
});

test('select week days (thursdays): */40 3-21 * * 4', () => {
    testExpression = '*/40 3-21 * * 4';
    setSelectValue('[name="week-days"]', 'thu');
    generateExpression()
});

test('reset weekdays: */40 3-21 * * *', () => {
    testExpression = '*/40 3-21 * * *';
    removeSelectValue('[name="week-days"]');
    generateExpression()
});

test('select week days (mon-fri): */40 3-21 * * 1-5', () => {
    testExpression = '*/40 3-21 * * 1-5';
    setSelectValue('[name="week-days"]', 1);
    generateExpression()
});

test('show all date inputs', () => {
    wrapper.find('[role="full-date-select-switcher"]').simulate('click');
});

test('select month days: */40 3-21 3 * 1-5', () => {
    testExpression = '*/40 3-21 3 * 1-5';
    setSelectValue('[name="month-days"]', 3);
    generateExpression()
});

test('reset month days: */40 3-21 * * 1-5', () => {
    testExpression = '*/40 3-21 * * 1-5';
    removeSelectValue('[name="month-days"]');
    generateExpression()
});

test('select month days: */40 3-21 3 * 1-5', () => {
    testExpression = '*/40 3-21 3 * 1-5';
    setSelectValue('[name="month-days"]', 3);
    generateExpression()
});

test('select months: */40 3-21 3 7 1-5', () => {
    testExpression = '*/40 3-21 3 7 1-5';
    setSelectValue('[name="months"]', 7);
    generateExpression()
});

test('reset months: */40 3-21 3 * 1-5', () => {
    testExpression = '*/40 3-21 3 * 1-5';
    removeSelectValue('[name="months"]');
    generateExpression()
});

test('select months: */40 3-21 3 7 1-5', () => {
    testExpression = '*/40 3-21 3 7 1-5';
    setSelectValue('[name="months"]', 7);
    generateExpression()
});
/* END DATE TEST */

/* END OF SECOND TAB */

/* THIRD TAB */
test('switch to fixed time tab', () => {
    wrapper.find('[role="preset-tab"]').at(2).simulate('click')
});

test('initial expression 45 8 * * *', () => {
    testExpression = '45 8 * * *';
    generateExpression()
});

test('set minutes: 10 8 * * *', () => {
    testExpression = '10 8 * * *';
    setSelectValue('[name="minutes"]', 10);
    generateExpression()
});

test('set hours: 10 12 * * *', () => {
    testExpression = '10 12 * * *';
    setSelectValue('[name="hours"]', 12);
    generateExpression()
});

test('try to reset minutes: 10 12 * * *', () => {
    testExpression = '10 12 * * *';
    removeSelectValue('[name="minutes"]');
    generateExpression()
});

test('try to reset hours: 10 12 * * *', () => {
    testExpression = '10 12 * * *';
    removeSelectValue('[name="hours"]');
    generateExpression()
});

/* START DATE TEST */
test('select week days (sat-sun): 10 12 * * 6-0', () => {
    testExpression = '10 12 * * 6-0';
    setSelectValue('[name="week-days"]', 'sat');
    generateExpression()
});

test('select week days (thursdays): *10 12 * * 4', () => {
    testExpression = '10 12 * * 4';
    setSelectValue('[name="week-days"]', 'thu');
    generateExpression()
});

test('reset weekdays: *10 12 * * *', () => {
    testExpression = '10 12 * * *';
    removeSelectValue('[name="week-days"]');
    generateExpression()
});

test('select week days (mon-fri): 10 12 * * 1-5', () => {
    testExpression = '10 12 * * 1-5';
    setSelectValue('[name="week-days"]', 1);
    generateExpression()
});

test('show all date inputs', () => {
    wrapper.find('[role="full-date-select-switcher"]').simulate('click');
});

test('select month days: 10 12 3 * 1-5', () => {
    testExpression = '10 12 3 * 1-5';
    setSelectValue('[name="month-days"]', 3);
    generateExpression()
});

test('reset month days: 10 12 * * 1-5', () => {
    testExpression = '10 12 * * 1-5';
    removeSelectValue('[name="month-days"]');
    generateExpression()
});

test('select month days: 10 12 3 * 1-5', () => {
    testExpression = '10 12 3 * 1-5';
    setSelectValue('[name="month-days"]', 3);
    generateExpression()
});

test('select months: 10 12 3 7 1-5', () => {
    testExpression = '10 12 3 7 1-5';
    setSelectValue('[name="months"]', 7);
    generateExpression()
});

test('reset months: 10 12 3 * 1-5', () => {
    testExpression = '10 12 3 * 1-5';
    removeSelectValue('[name="months"]');
    generateExpression()
});

test('select months: 10 12 3 7 1-5', () => {
    testExpression = '10 12 3 7 1-5';
    setSelectValue('[name="months"]', 7);
    generateExpression()
});
/* END DATE TEST */

/* END OF THIRD TAB */