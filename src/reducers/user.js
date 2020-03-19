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
      return {
        ...state,
        user: { ...state.user, paidAdvertLimit: action.user.paidAdvertLimit }
      };
    }
    default: {
      return state;
    }
  }
}
