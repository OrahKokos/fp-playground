import { Ord as ordNumber } from "fp-ts/number";
import { Ord as ordString } from "fp-ts/string";
import { Ord, min as ordMin, reverse } from "fp-ts/lib/Ord";
import { SomeRecord, ordMaxBy, ordMinBy, ordId, ordUpdatedOn } from "@app/someRecord";


describe('Ord', () => {
  it('Ord - Numbers - Max/Min', () => {
    const minNumber = ordMin(ordNumber)
    const maxNumber = ordMin(reverse(ordNumber))

    expect(minNumber(1, 2)).toBe(1)
    expect(maxNumber(1, 2)).toBe(2)
  })
  it('Ord - Strings - Longer/Shorter', () => {
    const minString = ordMin(ordString)
    const maxString = ordMin(reverse(ordString))

    expect(minString('a', 'aa')).toBe('a')
    expect(maxString('a', 'aa')).toBe('aa')
  })
  it('Ord - Record', () => {
    const currentTime = new Date()
    const someRecord1: SomeRecord = {
      id: 1,
      name: 'record-1',
      updatedOn: new Date(new Date(currentTime.getTime()).setDate(-2))
    }
    const someRecord2: SomeRecord = {
      id: 2,
      name: 'record-2',
      updatedOn: new Date(new Date(currentTime.getTime()).setDate(-1))
    }

    // Id variants
    const getLowerId1 = ordMinBy(false)(ordId)
    const getHigherId1 = ordMinBy(true)(ordId)
    const getLowerId2 = ordMaxBy(true)(ordId)
    const getHigherId2 = ordMaxBy(false)(ordId)

    expect(getLowerId1(someRecord1, someRecord2)).toBe(someRecord1)
    expect(getLowerId2(someRecord1, someRecord2)).toBe(someRecord1)
    expect(getHigherId1(someRecord1, someRecord2)).toBe(someRecord2)
    expect(getHigherId2(someRecord1, someRecord2)).toBe(someRecord2)

    // updatedOn varaints
    const getOlder1 = ordMinBy(false)(ordUpdatedOn)
    const getNewer1 = ordMinBy(true)(ordUpdatedOn)
    const getOlder2 = ordMaxBy(true)(ordUpdatedOn)
    const getNewer2 = ordMaxBy(false)(ordUpdatedOn)

    expect(getOlder1(someRecord1, someRecord2)).toBe(someRecord1)
    expect(getOlder2(someRecord1, someRecord2)).toBe(someRecord1)
    expect(getNewer1(someRecord1, someRecord2)).toBe(someRecord2)
    expect(getNewer2(someRecord1, someRecord2)).toBe(someRecord2)

  })
})