const initialState = null;

export default function successReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_NEW_ADVERT": {
      return {
        text: "You have added a new advertisement."
      };
    }
    case "SIGN_UP_USER": {
      return {
        text: "Thank you for your registration. Now you can Login."
      };
    }
    case "LOG_IN__USER": {
      return {
        text: `Welcome back ${action.user.user.username}`
      };
    }
    case "CLEAR_SUCCESS": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
