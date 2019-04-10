import { createStandardAction } from 'typesafe-actions';

export const addLoginToken = createStandardAction('LOGIN/SET-TOKEN')<string>();
