import { Lazy, pipe, flow } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
// import * as Array from 'fp-ts/lib/Array'
// import * as NEA from "fp-ts/lib/NonEmptyArray";
import pino from "pino";
// import { ValidSomethingOptionsType, ValidSomethingOptionsArrayMonoid } from "types";

export const createLogger = (options?: Lazy<pino.LoggerOptions>) =>
  pipe(
    options,
    O.fromNullable,
    O.fold(
      () => pino(),
      (options) => pino(options())
    )
  )

export const getLogger =
  (parentLogger: pino.Logger) =>
    (childOptions?: Lazy<pino.Bindings>) =>
      pipe(
        childOptions,
        O.fromNullable,
        O.fold(
          () => parentLogger,
          (childOptions) => parentLogger.child(childOptions())
        )
      )


export const prepareLogger =
  (topLevelOptions: Lazy<pino.LoggerOptions>) =>
    pipe(
      topLevelOptions,
      createLogger,
      getLogger
    )



// const prepareScopedSomething =
//   (topLevelOptions: NEA.NonEmptyArray<Lazy<ValidSomethingOptionsType>>) =>
//     (lazyScopeLevelOptions?: Lazy<ValidSomethingOptionsType>) =>
//       pipe(
//         topLevelOptions,
//         (topLevelOptions) =>
//           pipe(
//             lazyScopeLevelOptions,
//             O.fromNullable,
//             O.fold(
//               () => ValidSomethingOptionsArrayMonoid.concat(topLevelOptions, []),
//               (lazyScopeLevelOptions) => ValidSomethingOptionsArrayMonoid.concat(topLevelOptions, [lazyScopeLevelOptions]))
//           )
//       )

// const createSomething =
//   (globalOptionsLazy: Lazy<ValidSomethingOptionsType>) =>
//     (serviceOptionsLazy: Lazy<ValidSomethingOptionsType>) =>
//       flow(
//         pipe(
//           prepareScopedSomething([globalOptionsLazy, serviceOptionsLazy])),
//         (lazyOptions) =>
//           pipe(lazyOptions, Array.map((option) => option())),
//         (options) => options.join('+')
//       )