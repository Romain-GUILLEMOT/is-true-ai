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

isTrueAI(true) // true
isTrueAI(false) // false
isTrueAI('Hello, world!') // true
isTrueAI('This is a test.') // true
isTrueAI(NaN) // false
isTrueAI(undefined) // false
isTrueAI(null) // false
isTrueAI({}) // false
isTrueAI([]) // false
```

Note that returned value is not 100% accurate. It's a best effort guess. Also its a promise so you need to handle it. Good luck!