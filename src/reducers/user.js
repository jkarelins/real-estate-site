const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGN_UP_USER": {
      return action.user;
    }
    case "LOG_IN__USER": {
      return action.user;
    }
    case "LOG_OUT_USER": {
      return initialState;
    }
    case "ADD_EXTRA_ADVERTS": {
      if (!state.user.agency) {
        return {
          ...state,
          user: { ...state.user, paidAdvertLimit: action.user.paidAdvertLimit }
        };
      } else {
        return {
          ...state,
          user: {
            ...state.user,
            agency: {
              ...state.user.agency,
              advertBalance: action.user.advertBalance
            }
          }
        };
      }
    }
    case "CREATE_NEW_ADVERT": {
      return {
        ...state,
        user: {
          ...state.user,
          paidAdvertLimit: action.user.paidAdvertLimit,
          freeAdvertLimit: action.user.freeAdvertLimit
        }
      };
    }
    default: {
      return state;
    }
  }
}
