// @flow

import React, {PureComponent, Children} from 'react'
import {If, Then, Else} from 'react-if'
import {EVERY} from 'data/constants'
import head from 'lodash/head'
import type {Option} from 'types/Option'
import {getValues} from 'utils'
import Select from '../Select'

type Props = {
    styleNameFactory: any,
    children?: any
}

type State = {
    expanded: boolean
}

export default class DateComponent extends PureComponent {
    static defaultProps = {
        children: null
    };

    state: State = {
        expanded: false
    };

    props: Props;

    toggleExpand = () => {
        this.setState(({expanded}: State) => ({
            expanded: !expanded
        }))
    };

    onChange = (onChange: Function) => {
        return (value: Array<Option>) => {
            const values = getValues(value);
            const first = head(values);
            if(first === EVERY && values.length > 1) {
                onChange(values.filter((val: string) => val !== EVERY))
            } else {
                const everyIndex = values.indexOf(EVERY);
                if(everyIndex !== -1) {
                    onChange([EVERY])
                } else {
                    onChange(values)
                }
            }
        }
    };

    render() {
        const {styleNameFactory, children} = this.props;
        const {expanded} = this.state;
        return (
            <div
                style={{position: 'relative'}}
            >
                <label {...styleNameFactory('label')} >
                    On:
                </label>
                <div {...styleNameFactory('row')} >
                    {Children.map(children, (child: React.Children, i: number) => {
                        const {value, onChange} = child.props;
                        const {getOptions} = child.type;
                        return (
                            <If condition={i === 0 || expanded} >
                                <Then>
                                    <div
                                        {...styleNameFactory('input')}
                                    >
                                        <Select
                                            value={value}
                                            options={getOptions()}
                                            multi
                                            autosize
                                            onChange={this.onChange(onChange)}
                                        />
                                    </div>
                                </Then>
                            </If>
                        )
                    })}
                </div>
                <div
                    style={{position: 'absolute'}}
                    {...styleNameFactory('link')}
                    onClick={this.toggleExpand}
                    data-expand
                >
                    <If condition={expanded} >
                        <Then>
                            <span>show less &laquo;</span>
                        </Then>
                        <Else>
                            <span>show more &raquo;</span>
                        </Else>
                    </If>
                </div>
            </div>
        )
    }
}
