import * as t from 'io-ts'
import { date } from "io-ts-types";
import { Eq as eqNumber } from 'fp-ts/number'
import { Eq as eqString } from 'fp-ts/string'
import { Eq, contramap, getSemigroup as eqGetSemiGroup, struct } from "fp-ts/lib/Eq";
import * as FPDate from "fp-ts/Date";

export const SomeRecord = t.type({
  id: t.number,
  name: t.string,
  updatedOn: date
})

export type SomeRecord = t.TypeOf<typeof SomeRecord>

export const eqIdSomeRecord: Eq<SomeRecord> = contramap((r: SomeRecord) => r.id)(
  eqNumber
)

export const eqDateSomeRecord: Eq<SomeRecord> = contramap((r: SomeRecord) => r.updatedOn)(
  FPDate.Eq
)

export const eqTotalRecord = struct<SomeRecord>({
  id: eqNumber,
  name: eqString,
  updatedOn: FPDate.Eq
})

export const Semigroup = eqGetSemiGroup<SomeRecord>()
