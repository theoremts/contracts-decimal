# @theoremts/contracts-decimal

[Theorem](https://github.com/theoremts/theorem) contracts for [decimal.js](https://github.com/MikeMcl/decimal.js) — formal verification for decimal arithmetic.

## Installation

```bash
npm install -D @theoremts/contracts-decimal
```

## Setup

Add to your `theorem.config.ts`:

```typescript
import { defineConfig } from 'theoremts'

export default defineConfig({
  contracts: ['node_modules/@theoremts/contracts-decimal/index.contracts.ts'],
})
```

Or it's auto-discovered if you use the `@theoremts/contracts-*` naming convention.

## What's included

Maps Decimal.js methods to Z3 arithmetic:

| Decimal method | Z3 translation |
|---|---|
| `.plus(b)` | `a + b` |
| `.minus(b)` | `a - b` |
| `.times(b)` | `a * b` |
| `.dividedBy(b)` | `a / b` (requires `b !== 0`) |
| `.negated()` | `-a` |
| `.absoluteValue()` | `abs(a)` |
| `.greaterThan(b)` | `a > b` |
| `.lessThan(b)` | `a < b` |
| `.equals(b)` | `a === b` |
| `.isZero()` | `a === 0` |
| `.isPositive()` | `a > 0` |
| `.toNumber()` | identity |
| `.floor()` | `output <= a` |
| `.ceil()` | `output >= a` |
| `Decimal.max(a, b)` | `output >= a && output >= b` |
| `Decimal.min(a, b)` | `output <= a && output <= b` |

## Example

```typescript
import Decimal from 'decimal.js'
import { requires, ensures, positive, nonNegative, output } from 'theoremts'

function calculateInterest(principal: Decimal, rate: Decimal): Decimal {
  requires(principal.isPositive())
  requires(rate.greaterThan(0))
  requires(rate.lessThan(1))
  ensures(output().greaterThan(0))

  return principal.times(rate)
}
```

```
$ theorem verify src/
  calculateInterest
    ✓  output().greaterThan(0)
       using: requires: principal.isPositive(), requires: rate.greaterThan(0)
```

## License

MIT
