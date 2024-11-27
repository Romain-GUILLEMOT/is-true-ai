# is-true-ai

A lightweight utility to detect if given value is true using AI.

## Installation

```bash
npm install is-true-ai
```

## Initialize

```typescript
import { initializeOpenAI } from 'is-true-ai';

initializeOpenAI({ apiKey: process.env.OPENAI_API_KEY }); // use your own OpenAI API key
```

## Usage

```typescript
import { isTrueAI } from 'is-true-ai';

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