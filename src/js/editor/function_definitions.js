import { FlyFunctionMap } from './functions/navigation';
import { FlipFunctionMap } from './functions/flip';
import { LandFunctionMap } from './functions/land';
import { TakeOffFunctionMap } from './functions/takeoff';
import { MathFunctionMap } from './functions/math';

export const FunctionMap = {
  ...TakeOffFunctionMap,
  ...FlyFunctionMap,
  ...FlipFunctionMap,
  ...LandFunctionMap,
  ...MathFunctionMap
}
