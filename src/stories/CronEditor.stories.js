import {storiesOf} from '@kadira/storybook'
import React from 'react'
import CronEditor from '../js/containers/app'

storiesOf('CronEditor', module)
    .add('default', () => <CronEditor showExpression={true} />);