import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { loginInitialState, loginReducer  } from './login';

export const reducers = {
  login: loginReducer,
};
export const initialState = {
  login: loginInitialState,
}

export type RootState = StateType<typeof initialState>;
