import { TransformFnParams } from 'class-transformer/types/interfaces';
import { MaybeType } from '../types/maybe.type';

export const upperCaseTransformer = (
  params: TransformFnParams,
): MaybeType<string> => params.value?.toUpperCase().trim();
