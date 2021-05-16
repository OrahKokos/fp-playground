import * as M from "fp-ts/Monoid";
import * as Number from "fp-ts/number";
import * as String from "fp-ts/string";
import * as Boolean from "fp-ts/boolean";
describe('Monoid', () => {
  describe('Monoid - Primitive', () => {
    it('Monoid - Number', () => {
      const summed = M.concatAll(Number.MonoidSum)
      const sumRes1 = summed([1, 2, 3, 4])
      expect(sumRes1).toBe(10)

      const sumRes2 = summed([null as unknown as number, 2, 3, 4])
      expect(sumRes2).toBe(9)

      const sumRes3 = summed([undefined as unknown as number, 2, 3, 4])
      expect(sumRes3).toBe(NaN)
    })
    it('Monoid - String', () => {
      const concatString = M.concatAll(String.Monoid)
      const sumRes1 = concatString(['More', 'docs', 'needed'])
      expect(sumRes1).toBe('Moredocsneeded')

      const sumRes2 = concatString([null as unknown as string, 'docs', 'needed'])
      // ehh
      expect(sumRes2).toBe('nulldocsneeded')

      const sumRes3 = concatString([undefined as unknown as string, 'docs', 'needed'])
      // ehh
      expect(sumRes3).toBe('undefineddocsneeded')
    })
    it('Monoid - Boolean', () => {
      const allTrue = M.concatAll(Boolean.MonoidAll)

      const allTrueRes1 = allTrue([true, true, true])
      const allTrueRes2 = allTrue([true, true, false])
      expect(allTrueRes1).toBe(true)
      expect(allTrueRes2).toBe(false)

      const someTrue = M.concatAll(Boolean.MonoidAny)

      const someTrueRes1 = someTrue([true, true, true])
      const someTrueRes2 = someTrue([true, true, false])
      expect(someTrueRes1).toBe(true)
      expect(someTrueRes2).toBe(true)

    })
  })
})