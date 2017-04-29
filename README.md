# React Cron Builder
React component to build [cron](https://ru.wikipedia.org/wiki/Cron) expression

## installation
```` bash
npm install --save react-cron-builder
````
## demo
[Live demo](https://one-more.github.io/react-cron-builder/)

## usage
```` ecmascript 6
import CronBuilder from  'react-cron-builder

<CronBuilder 
    cronExpression="*/4 2,12,22 * * 1-5"
    onChange={::console.log}
    showResult={false}
/>
````