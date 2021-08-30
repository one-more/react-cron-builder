// @flow

import React, { PureComponent, Children } from 'react'
import { If, Then } from 'react-if'
import { EVERY } from 'data/constants'
import head from 'lodash/head'
import type { Option } from 'types/Option'
import { getValues } from 'utils'
import Select from '../Select'

type Props = {
    styleNameFactory: any,
    children?: any
}

type State = {}

export default class DateComponent extends PureComponent {
    static defaultProps = {
        children: null
    };

    state: State;

    props: Props;

    onChange = (onChange: Function) => {
        return (value: Array<Option>) => {
            const values = getValues(value);
            const first = head(values);
            if (first === EVERY && values.length > 1) {
                onChange(values.filter((val: string) => val !== EVERY))
            } else {
                const everyIndex = values.indexOf(EVERY);
                if (everyIndex !== -1) {
                    onChange([EVERY])
                } else {
                    onChange(values)
                }
            }
        }
    };

    render() {
        const { styleNameFactory, children } = this.props;
        return (
            <div {...styleNameFactory('row', 'items-end')} >
                {Children.map(children, (child: React.Children) => {
                    const { value, onChange } = child.props;
                    const { getOptions } = child.type;
                    return (
                        <div>
                            <label {...styleNameFactory('label')} >
                                On {child.type.displayName}
                            </label>
                            <div
                                {...styleNameFactory('input')}
                            >
                                <Select
                                    style={{ minWidth: 120 }}
                                    value={value}
                                    options={getOptions()}
                                    multi
                                    autosize
                                    onChange={this.onChange(onChange)}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
