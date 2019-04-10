import { ActionType, StateType } from 'typesafe-actions';
import * as actions from '../actions/login';
interface ILoginState {
  token: string;
}
export const loginInitialState: ILoginState = {
  token: '',
}

export const loginReducer = (state: ILoginState = loginInitialState, action: LoginActions) => {
  console.log(action)
  switch (action.type) {
    case 'LOGIN/SET-TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default: {
      return state;
    }
  }
}
export type LoginActions = ActionType<typeof actions>;
