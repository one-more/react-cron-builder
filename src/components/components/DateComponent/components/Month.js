// @flow

import {PureComponent} from 'react'

const monthOptions = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'
].map((month: string, i: number) => ({
    label: month,
    value: String(i + 1)
}));

const options = [
    {
        label: 'every month',
        value: '*'
    }
].concat(monthOptions)
.concat([{
    label: 'JFM',
    value: '1-3'
},{
    label: 'AMJ',
    value: '4-6'
},{
    label: 'JAS',
    value: '7-9'
},{
    label: 'OND',
    value: '10-12'
}]);

export default class Month extends PureComponent {
    static getOptions() {
        return options
    }
    static displayName: string = 'Month?';
    static className: string = 'Month';
}
