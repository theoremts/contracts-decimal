import { declare, requires, ensures, positive, nonNegative, output, integer } from 'theoremts'

// ─────────────────────────────────────────────────────────────────────────────
// Theorem contracts for decimal.js — complete API coverage
//
// Maps Decimal methods to Z3 arithmetic so Theorem can reason about
// decimal operations in verified code.
//
// Usage:
//   npm install -D @theoremts/contracts-decimal
//
// Auto-discovered by Theorem, or add to theorem.config.ts:
//   contracts: ['node_modules/@theoremts/contracts-decimal/index.contracts.ts']
// ─────────────────────────────────────────────────────────────────────────────

// ── Arithmetic ───────────────────────────────────────────────────────────────

declare(Decimal.prototype.plus, (a: number, b: number): number => {
  ensures(output() === a + b)
})
declare(Decimal.prototype.add, (a: number, b: number): number => {
  ensures(output() === a + b)
})

declare(Decimal.prototype.minus, (a: number, b: number): number => {
  ensures(output() === a - b)
})
declare(Decimal.prototype.sub, (a: number, b: number): number => {
  ensures(output() === a - b)
})

declare(Decimal.prototype.times, (a: number, b: number): number => {
  ensures(output() === a * b)
})
declare(Decimal.prototype.mul, (a: number, b: number): number => {
  ensures(output() === a * b)
})

declare(Decimal.prototype.dividedBy, (a: number, b: number): number => {
  requires(b !== 0)
  ensures(output() === a / b)
})
declare(Decimal.prototype.div, (a: number, b: number): number => {
  requires(b !== 0)
  ensures(output() === a / b)
})

declare(Decimal.prototype.modulo, (a: number, b: number): number => {
  requires(b !== 0)
})
declare(Decimal.prototype.mod, (a: number, b: number): number => {
  requires(b !== 0)
})

declare(Decimal.prototype.negated, (a: number): number => {
  ensures(output() === -a)
})
declare(Decimal.prototype.neg, (a: number): number => {
  ensures(output() === -a)
})

declare(Decimal.prototype.absoluteValue, (a: number): number => {
  ensures(nonNegative(output()))
  ensures(output() >= a || output() >= -a)
})
declare(Decimal.prototype.abs, (a: number): number => {
  ensures(nonNegative(output()))
  ensures(output() >= a || output() >= -a)
})

declare(Decimal.prototype.toPower, (a: number, b: number): number => {
  ensures(output() === a ** b)
})
declare(Decimal.prototype.pow, (a: number, b: number): number => {
  ensures(output() === a ** b)
})

declare(Decimal.prototype.squareRoot, (a: number): number => {
  requires(nonNegative(a))
  ensures(nonNegative(output()))
})
declare(Decimal.prototype.sqrt, (a: number): number => {
  requires(nonNegative(a))
  ensures(nonNegative(output()))
})

declare(Decimal.prototype.logarithm, (a: number): number => {
  requires(positive(a))
})
declare(Decimal.prototype.log, (a: number): number => {
  requires(positive(a))
})

declare(Decimal.prototype.naturalLogarithm, (a: number): number => {
  requires(positive(a))
})
declare(Decimal.prototype.ln, (a: number): number => {
  requires(positive(a))
})

// ── Comparison ───────────────────────────────────────────────────────────────

declare(Decimal.prototype.greaterThan, (a: number, b: number): boolean => {
  ensures(output() === (a > b))
})
declare(Decimal.prototype.gt, (a: number, b: number): boolean => {
  ensures(output() === (a > b))
})

declare(Decimal.prototype.greaterThanOrEqualTo, (a: number, b: number): boolean => {
  ensures(output() === (a >= b))
})
declare(Decimal.prototype.gte, (a: number, b: number): boolean => {
  ensures(output() === (a >= b))
})

declare(Decimal.prototype.lessThan, (a: number, b: number): boolean => {
  ensures(output() === (a < b))
})
declare(Decimal.prototype.lt, (a: number, b: number): boolean => {
  ensures(output() === (a < b))
})

declare(Decimal.prototype.lessThanOrEqualTo, (a: number, b: number): boolean => {
  ensures(output() === (a <= b))
})
declare(Decimal.prototype.lte, (a: number, b: number): boolean => {
  ensures(output() === (a <= b))
})

declare(Decimal.prototype.equals, (a: number, b: number): boolean => {
  ensures(output() === (a === b))
})
declare(Decimal.prototype.eq, (a: number, b: number): boolean => {
  ensures(output() === (a === b))
})

declare(Decimal.prototype.comparedTo, (a: number, b: number): number => {
  ensures(output() >= -1 && output() <= 1)
})
declare(Decimal.prototype.cmp, (a: number, b: number): number => {
  ensures(output() >= -1 && output() <= 1)
})

// ── Predicates ───────────────────────────────────────────────────────────────

declare(Decimal.prototype.isZero, (a: number): boolean => {
  ensures(output() === (a === 0))
})

declare(Decimal.prototype.isPositive, (a: number): boolean => {
  ensures(output() === (a > 0))
})

declare(Decimal.prototype.isNegative, (a: number): boolean => {
  ensures(output() === (a < 0))
})

declare(Decimal.prototype.isFinite, (a: number): boolean => {
  ensures(output() === true)  // Z3 Reals are always finite
})

declare(Decimal.prototype.isNaN, (a: number): boolean => {
  ensures(output() === false)  // Z3 Reals are never NaN
})

declare(Decimal.prototype.isInteger, (a: number): boolean => {
  ensures(output() === integer(a))
})

// ── Conversion ───────────────────────────────────────────────────────────────

declare(Decimal.prototype.toNumber, (a: number): number => {
  ensures(output() === a)
})

// ── Rounding ─────────────────────────────────────────────────────────────────

declare(Decimal.prototype.floor, (a: number): number => {
  ensures(output() <= a)
  ensures(output() >= a - 1)
  ensures(integer(output()))
})

declare(Decimal.prototype.ceil, (a: number): number => {
  ensures(output() >= a)
  ensures(output() <= a + 1)
  ensures(integer(output()))
})

declare(Decimal.prototype.round, (a: number): number => {
  ensures(output() >= a - 0.5)
  ensures(output() <= a + 0.5)
  ensures(integer(output()))
})

declare(Decimal.prototype.truncated, (a: number): number => {
  ensures(integer(output()))
})
declare(Decimal.prototype.trunc, (a: number): number => {
  ensures(integer(output()))
})

declare(Decimal.prototype.toDecimalPlaces, (a: number): number => {
  ensures(output() >= a - 0.5)
  ensures(output() <= a + 0.5)
})

declare(Decimal.prototype.toDP, (a: number): number => {
  ensures(output() >= a - 0.5)
  ensures(output() <= a + 0.5)
})

declare(Decimal.prototype.toFixed, (a: number): number => {
  ensures(output() >= a - 0.5)
  ensures(output() <= a + 0.5)
})

declare(Decimal.prototype.toSignificantDigits, (a: number): number => {
  ensures(output() !== null)
})
declare(Decimal.prototype.toSD, (a: number): number => {
  ensures(output() !== null)
})

// ── Static methods ───────────────────────────────────────────────────────────

declare(Decimal.max, (a: number, b: number): number => {
  ensures(output() >= a)
  ensures(output() >= b)
  ensures(output() === a || output() === b)
})

declare(Decimal.min, (a: number, b: number): number => {
  ensures(output() <= a)
  ensures(output() <= b)
  ensures(output() === a || output() === b)
})

declare(Decimal.abs, (a: number): number => {
  ensures(nonNegative(output()))
  ensures(output() >= a || output() >= -a)
})

declare(Decimal.sqrt, (a: number): number => {
  requires(nonNegative(a))
  ensures(nonNegative(output()))
})

declare(Decimal.ln, (a: number): number => {
  requires(positive(a))
})

declare(Decimal.log, (a: number): number => {
  requires(positive(a))
})
