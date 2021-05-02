import { Lazy } from "fp-ts/lib/function";
import * as Array from 'fp-ts/lib/Array'
import * as t from "io-ts";


export const ValidGlobalOptions = t.literal('global')
export const ValidServiceOptions = t.literal('service')
export const ValidScopeOptions = t.literal('scope')

export const ValidSomethingOptions = t.union(
  [
    ValidGlobalOptions,
    ValidServiceOptions,
    ValidScopeOptions
  ]
);

export type ValidSomethingOptionsType = t.TypeOf<typeof ValidSomethingOptions>


export const ValidSomethingOptionsArrayMonoid = Array.getMonoid<Lazy<ValidSomethingOptionsType>>()
