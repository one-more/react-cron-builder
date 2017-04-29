import {storiesOf} from '@kadira/storybook'
import React from 'react'
import CronBuilder from '../CronBuilder'

storiesOf('CronBuilder', module)
    .add('default', () => <CronBuilder />);