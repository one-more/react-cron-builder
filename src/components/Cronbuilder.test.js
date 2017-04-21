import React from 'react'
import {mount} from 'enzyme'

import CronBuilder from './CronBuilder'
import Tab from './components/Tab'
import PeriodicallyTab from './components/PeriodicallyTab'
import {EVERY, MINUTES} from '../data/constants'

describe('CronBuilder', () => {
    it('initial render', () => {
        const wrapper = mount(<CronBuilder />);
        expect(wrapper.find('legend').find(Tab)).toHaveLength(3);
        expect(wrapper.find(PeriodicallyTab)).toHaveLength(1);
    });

    it('should parse expression', () => {
        const wrapper = mount(<CronBuilder
            cronExpression="5,15,25 */2 * * 1-5"
        />);
        expect(wrapper.instance().presetComponent.state).toEqual({
            minutes: ['5', '15', '25'],
            hours: '2',
            dayOfWeek: '1-5',
            dayOfMonth: EVERY,
            month: EVERY,
            activeTime: MINUTES,
            minutesMultiple: true,
            hoursMultiple: false
        });
    });

    it('should call onChange', () => {
        const onChange = jest.fn();
        const expression = '5,15,25 */2 5,6 5 1-5';
        const wrapper = mount(<CronBuilder
            cronExpression={expression}
            onChange={onChange}
        />);
        wrapper.find('[data-action]').simulate('click');
        expect(onChange).toHaveBeenCalledWith(expression)
    })
});
