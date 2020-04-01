const initialState = null;

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_ACTION_ERROR": {
      return {
        userErr: action.error
      };
    }
    case "ACTION_ERROR": {
      return {
        actionErr: action.error
      };
    }
    case "CLEAR_ERRORS": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
