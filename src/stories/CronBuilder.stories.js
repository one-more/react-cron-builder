import {storiesOf} from '@kadira/storybook'
import React from 'react'
import CronBuilder from '../components/CronBuilder'

storiesOf('CronBuilder', module)
    .add('default', () => <CronBuilder />);