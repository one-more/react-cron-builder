import React, { Component } from 'react'
import DateComponent, { DayOfWeek, DayOfMonth, Month } from './index';
export default class AllDayComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <DateComponent
                        styleNameFactory={this.props.styleNameFactory}
                    >
                        <DayOfWeek
                            value={this.props.dayOfWeek}
                            onChange={this.props.selectDayOfWeek}
                        />

                    </DateComponent>
                    <DateComponent
                        styleNameFactory={this.props.styleNameFactory}
                    >
                        <DayOfMonth
                            value={this.props.dayOfMonth}
                            onChange={this.props.selectDayOfMonth}
                        />
                    </DateComponent>
                    <DateComponent
                        styleNameFactory={this.props.styleNameFactory}
                    >
                        <Month
                            value={this.props.month}
                            onChange={this.props.selectMonth}
                        />
                    </DateComponent>
            </div>
        )
    }
}
