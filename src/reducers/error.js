const initialState = null;

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_ACTION_ERROR": {
      return state;
      // return action.error.data.message;
    }
    case "CLEAR_ERRORS": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
