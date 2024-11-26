# is-true-ai

A lightweight utility to detect if given value is true using AI.

## Installation

```bash
npm install is-true-ai
```

## Environment Variables

Create a `.env` file and add your OpenAI API key:

```bash
OPENAI_API_KEY=your_openai_api_key
```

## Usage

```javascript
const isTrueAI = require('is-true-ai');

console.log(isTrueAI(true)); // true
console.log(isTrueAI(false)); // false
console.log(isTrueAI('Hello, world!')); // true
console.log(isTrueAI('This is a test.')); // true
console.log(isTrueAI(NaN)); // false
console.log(isTrueAI(undefined)); // false
console.log(isTrueAI(null)); // false
console.log(isTrueAI({})); // false
console.log(isTrueAI([])); // false
```
