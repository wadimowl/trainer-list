import { UserState } from './user.state';
import { HttpActionState } from '../http-meta';
import { UserActions } from './user.actions';
import { createReducer, on } from '@ngrx/store';
import { Trainer } from '../../../services/main-api/users/users.types';

const initialState: UserState = {
  user: null,
  whatPropertiesIsChanging: new Set, // to track what property from user object was changed on frontend but server have not responded yet
  meta: HttpActionState.Init
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.fetchUserForModeration, UserActions.fetchUserById, state => ({ ...state, meta: HttpActionState.Busy })),
  on(UserActions.fetchUser.processed, (state, { user }) => ({ ...state, meta: HttpActionState.Done, user })),
  on(UserActions.fetchUser.fail, UserActions.changeUserProperty.fail, (state, { error }) => ({ ...state, meta: { error } })),
  on(UserActions.fetchUser.cancel, state => {
    return { ...state, meta: state.meta === HttpActionState.Busy ? HttpActionState.Done : state.meta };
  }),
  on(UserActions.changeUserProperty.processing, (state, { property, value }) => {
    if (!state.user) {
      return state;
    }
    const whatPropertiesIsChanging = new Set(state.whatPropertiesIsChanging);
    const user: Trainer = { ...state.user, [property]: value };
    return { ...state, user, whatPropertiesIsChanging: whatPropertiesIsChanging.add(property) };
  }),
  on(UserActions.changeUserProperty.approveProcessing, (state, { property, value }) => {
    if (!state.user) {
      return state;
    }
    const content = [ ...state.user[property]! ];
    content[value.id] = { ...content[value.id], approved: value.status };
    const user: Trainer = { ...state.user, [property]: content };
    return { ...state, user };
  }),
  on(UserActions.changeUserProperty.processed, (state, { property }) => {
    const whatPropertiesIsChanging = new Set(state.whatPropertiesIsChanging);
    whatPropertiesIsChanging.delete(property);
    return { ...state, whatPropertiesIsChanging };
  }),
  on(UserActions.fetchUser.clear, () => initialState),
);
