'use strict';

import React, {PureComponent} from 'react';
import PeriodicallyTab from '../components/periodically-tab';
import TimeFrameTab from '../components/timeframe-tab';
import FixedTimeTab from '../components/fixed-time-tab';
import ActionButton from '../components/action-btn';
import 'styles/cron-editor.styl'

import { connect } from 'react-redux';

import * as TestsActions from '../actions/cron';
import { bindActionCreators } from 'redux';

@connect(state => ({
    cron: state.cron
}))
export default class extends PureComponent {
    get tabState() {
        return this.props.cron.tabState
    }

    get tabs() {
        return [
            {
                index: 0,
                label: 'Periodically',
                component: PeriodicallyTab
            },
            {
                index: 1,
                label: 'Periodically within a time frame',
                component: TimeFrameTab
            },
            {
                index: 2,
                label: 'At a recurring fixed time',
                component: FixedTimeTab
            }
        ]
    }

    get activeTabIndex() {
        return this.props.cron.activeTabIndex
    }

    render() {
        const {dispatch} = this.props;
        const actions = bindActionCreators(TestsActions, dispatch);
        const Component = this.tabs[this.activeTabIndex].component;
        return <div className="cron-editor">
            <fieldset>
                <legend>
                    {this.tabs.map((tab, i) => {
                        const className = 'cron-editor__tab',
                            isActive = this.activeTabIndex == tab.index ? `${className}_active` : '';
                        return <button
                            role="preset-tab"
                            key={i} onClick={this.switchTab.bind(this, tab.index, actions.setActiveTab)}
                            className={`${className} ${isActive}`}>{tab.label}</button>
                    })}
                </legend>
                <Component {...this.tabState} {...actions} />
            </fieldset>
            <ActionButton onAction={this.onAction.bind(this, actions.calculateExpression)} />
            {this.props.showExpression && this.tabState.expression && <div className="cron-editor__result">
                {this.tabState.expression}
            </div>}
        </div>
    }

    onAction(cb) {
        cb();
        (this.props.onExpression || function () {})(this.tabState.expression)
    }

    switchTab(index, cb) {
        cb(index)
    }
}

