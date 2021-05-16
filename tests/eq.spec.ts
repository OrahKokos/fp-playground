import { SomeRecord, eqIdSomeRecord, eqDateSomeRecord, Semigroup, eqTotalRecord } from "@app/someRecord";

describe('Eq', () => {
  const now = new Date()
  const someRecord1: SomeRecord = {
    id: 1,
    name: 'some-1',
    updatedOn: new Date(now.setDate(now.getDate() - 2))
  }
  const someRecord2: SomeRecord = {
    id: 2,
    name: 'some-1',
    updatedOn: new Date(now.setDate(now.getDate() - 1))
  }
  const someRecord3: SomeRecord = {
    id: 3,
    name: 'some-1',
    updatedOn: new Date()
  }
  it("Eq - SomeRecord - ID(number)", () => {
    const someScopedRecord: SomeRecord = {
      ...someRecord1,
      ...{ name: 'some-scoped', updatedOn: new Date() }
    }
    expect(eqIdSomeRecord.equals(someRecord1, someRecord1)).toBe(true)
    expect(eqIdSomeRecord.equals(someRecord1, someScopedRecord)).toBe(true)

    expect(eqIdSomeRecord.equals(someRecord1, someRecord2)).toBe(false)
    expect(eqIdSomeRecord.equals(someRecord1, someRecord3)).toBe(false)
    expect(eqIdSomeRecord.equals(someRecord2, someRecord3)).toBe(false)
  })
  it("Eq - SomeRecord - updatedOn(Date)", () => {
    const someScopedRecord: SomeRecord = {
      ...someRecord1,
      ...{ id: 15, name: 'some-scoped' }
    }
    expect(eqDateSomeRecord.equals(someRecord1, someRecord1)).toBe(true)
    expect(eqDateSomeRecord.equals(someRecord1, someScopedRecord)).toBe(true)

    expect(eqDateSomeRecord.equals(someRecord1, someRecord2)).toBe(false)
    expect(eqDateSomeRecord.equals(someRecord1, someRecord3)).toBe(false)
    expect(eqDateSomeRecord.equals(someRecord2, someRecord3)).toBe(false)
  })
  it("Eq - SomeRecord - ID(number) + updatedOn(Date) - Combinator", () => {
    const eqIdAndDate = Semigroup.concat(eqIdSomeRecord, eqDateSomeRecord)

    const someScopedRecord: SomeRecord = {
      ...someRecord1,
      ...{ name: 'some-scoped' }
    }

    expect(eqIdAndDate.equals(someRecord1, someRecord1)).toBe(true)
    expect(eqIdAndDate.equals(someRecord1, someScopedRecord)).toBe(true)

    expect(eqIdAndDate.equals(someRecord1, someRecord2)).toBe(false)
    expect(eqIdAndDate.equals(someRecord1, someRecord3)).toBe(false)
    expect(eqIdAndDate.equals(someRecord2, someRecord3)).toBe(false)
  })
  it("Eq - SomeRecord - Full structure", () => {
    expect(eqTotalRecord.equals(someRecord1, someRecord1)).toBe(true)
    expect(eqTotalRecord.equals(someRecord1, someRecord2)).toBe(false)
    expect(eqTotalRecord.equals(someRecord1, someRecord3)).toBe(false)
    expect(eqTotalRecord.equals(someRecord2, someRecord3)).toBe(false)
  })
})