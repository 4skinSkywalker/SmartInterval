# SmartInterval

An interval that can be started/stopped and evaluates sequentially

## What I wanted to achieve

SmartInterval creates an interval that has the following features:
- Can be paused/stopped
- Can be forced to execute
- Evaluates sequentially (no other call is made before the current call is evaluated)

## Install

`npm i smartinterval`

## Getting started

This library is particularly useful because it evaluates async code periodically and sequentially.
Another call of your async job won't be sent until the previous call has been evaluated.
If you force it you will get an additional immediate call.

```js
let SmartInterval = require("smartinterval");

// Initialize the interval by new-ing the SmartInterval constructor
// It accepts 2 arguments:
// - An async function to be executed (job)
// - The time to wait between cycles (delay)
let dataFetcher = new SmartInterval(
    async () => {
        await getSomeData();
        await getSomeOtherData();
    },
    3000
);

// You can start it
dataFetcher.start();

// You can stop it
dataFetcher.stop();

// You can force it to run a cycle
// This is particularly useful when you receive an interaction and you want to immediately fetch the data
dataFetcher.forceExecution();
```
