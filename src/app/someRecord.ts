import * as t from 'io-ts'
import { date } from "io-ts-types";
import { Eq as eqNumber, Ord as ordNumber } from 'fp-ts/number'
import { Eq as eqString } from 'fp-ts/string'
import { Eq, contramap as eqContramap, getSemigroup as eqGetSemiGroup, struct } from "fp-ts/lib/Eq";
import { contramap as ordContramap, Ord, reverse, min, max } from "fp-ts/lib/Ord";
import * as FPDate from "fp-ts/Date";

export const SomeRecord = t.type({
  id: t.number,
  name: t.string,
  updatedOn: date
})

export type SomeRecord = t.TypeOf<typeof SomeRecord>

export const eqIdSomeRecord: Eq<SomeRecord> = eqContramap((r: SomeRecord) => r.id)(
  eqNumber
)

export const eqDateSomeRecord: Eq<SomeRecord> = eqContramap((r: SomeRecord) => r.updatedOn)(
  FPDate.Eq
)

export const eqTotalRecord = struct<SomeRecord>({
  id: eqNumber,
  name: eqString,
  updatedOn: FPDate.Eq
})

export const Semigroup = eqGetSemiGroup<SomeRecord>()

export const getId = (someRecord: SomeRecord) => someRecord.id

export const getName = (someRecord: SomeRecord) => someRecord.name

export const getUpdatedOn = (someRecord: SomeRecord) => someRecord.updatedOn

export const ordId = ordContramap(getId)(ordNumber)

export const ordUpdatedOn = ordContramap(getUpdatedOn)(FPDate.Ord)

export const ordMinBy = (contravariant: boolean) => (someOrd: Ord<SomeRecord>) => {
  if (contravariant) return min(reverse(someOrd))
  return min(someOrd)
}

export const ordMaxBy = (contravariant: boolean) => (someOrd: Ord<SomeRecord>) => {
  if (contravariant) return max(reverse(someOrd))
  return max(someOrd)
}