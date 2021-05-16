import { SemigroupSum } from "fp-ts/number";
import * as Semigroup from "fp-ts/Semigroup";
import * as Function from "fp-ts/function";
import * as Boolean from "fp-ts/boolean";

describe('Semigroup', () => {
  describe('Semigroup - Primitive', () => {
    it('Semigroup - Numbers - Addition', () => {
      const x = 1;
      const y = 2;
      expect(SemigroupSum.concat(x, y)).toBe(3)
      expect(SemigroupSum.concat(null as unknown as number, y)).toBe(y)
      expect(SemigroupSum.concat(x, null as unknown as number)).toBe(x)
      expect(SemigroupSum.concat(null as unknown as number, null as unknown as number)).toBe(0)
    })
    it('Semigroup - Numbers - First/Last', () => {
      const x = 1;
      const y = 2;
      const semigroupFirst = Semigroup.first<number>()
      const semigroupLast = Semigroup.last<number>()
      expect(semigroupFirst.concat(x, y)).toBe(x)
      expect(semigroupLast.concat(x, y)).toBe(y)
      expect(semigroupFirst.concat(null as unknown as number, y)).toBe(null)
      expect(semigroupLast.concat(x, null as unknown as number)).toBe(null)
      expect(semigroupFirst.concat(null as unknown as number, null as unknown as number)).toBe(null)
      expect(semigroupLast.concat(null as unknown as number, null as unknown as number)).toBe(null)
    })
    it('Semigroup - Numbers - Combinator', () => {
      type numberPredicateType = (n: number) => boolean
      const isPositive: numberPredicateType = (n: number) => n > 0
      const isEven: numberPredicateType = (n: number) => n % 2 === 0

      expect(isPositive(1)).toBe(true)
      expect(isPositive(-1)).toBe(false)
      expect(isEven(2)).toBe(true)
      expect(isEven(3)).toBe(false)

      const predicateAllSemigroup = Function.getSemigroup<boolean>(Boolean.SemigroupAll)<number>()
      const isPositiveAndEven = predicateAllSemigroup.concat(isPositive, isEven)

      expect(isPositiveAndEven(2)).toBe(true)
      expect(isPositiveAndEven(3)).toBe(false)
      expect(isPositiveAndEven(-1)).toBe(false)
      expect(isPositiveAndEven(-2)).toBe(false)

      const predicateAnySemigroup = Function.getSemigroup<boolean>(Boolean.SemigroupAny)<number>()
      const isPositiveOrEven = predicateAnySemigroup.concat(isPositive, isEven)

      expect(isPositiveOrEven(2)).toBe(true)
      expect(isPositiveOrEven(3)).toBe(true)
      expect(isPositiveOrEven(-1)).toBe(false)
      expect(isPositiveOrEven(-2)).toBe(true)

    })
  })
})