// import { Lazy } from "@utils/types/lazy.types"
import { constant } from "fp-ts/lib/function";
// import { ValidSomethingOptionsType } from "types"

// const GLOBAL_OPTIONS: ValidSomethingOptionsType = 'global'
// const SERVICE_OPTIONS: ValidSomethingOptionsType = 'service'
// const SCOPE_SERVICE: ValidSomethingOptionsType = 'scope'

// const lazyGlobalOptions: Lazy<ValidSomethingOptionsType> = constant(GLOBAL_OPTIONS)
// const lazyServiceOptions: Lazy<ValidSomethingOptionsType> = constant(SERVICE_OPTIONS)

// const resolveSomething = createSomething(lazyGlobalOptions)(lazyServiceOptions);

// const lazyScopeOptions: Lazy<ValidSomethingOptionsType> = constant(SCOPE_SERVICE)
// const resultScoped = resolveSomething(lazyScopeOptions)
// console.log(resultScoped)
import { prepareLogger } from "@utils/logger/logger";
import pino from "pino";
import { v4 as uuidv4 } from "uuid";

const pinoParentOptions: pino.LoggerOptions = {
  name: 'my-app-1',
  level: 'info'
}
const pinoChildOptions: pino.Bindings = {
  level: 'debug',
  session: uuidv4()
}

const getLogger = prepareLogger(constant(pinoParentOptions))

const appLogger = getLogger()

const childLogger = getLogger(constant(pinoChildOptions))

appLogger.info('Bleb')
childLogger.info('Fren')