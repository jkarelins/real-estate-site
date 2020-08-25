const initialState = null;

export default function userReducer(state = initialState, action) {
  // If user in localStorage, but not in redux - logIn
  if(!state?.jwt && localStorage.getItem('user')){
    return JSON.parse(localStorage.getItem('user'));
  };
  switch (action.type) {
    case "SIGN_UP_USER": {
      return action.user;
    }
    case "LOG_IN__USER": {
      localStorage.setItem('user', JSON.stringify(action.user))
      return action.user;
    }
    case "LOG_OUT_USER": {
      localStorage.removeItem('user');
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
      if (!state.user.agency) {
        // IF PRIVATE PERSON
        return {
          ...state,
          user: {
            ...state.user,
            paidAdvertLimit: action.user.paidAdvertLimit,
            freeAdvertLimit: action.user.freeAdvertLimit
          }
        };
      } else if (action.user.agency) {
        // IF SPEND AGENCY BALANCE
        return {
          ...state,
          user: {
            ...state.user,
            agency: {
              ...state.user.agency,
              advertBalance: action.user.agency.advertBalance
            }
          }
        };
      } else {
        // HAVE AGENCY BALANCE, BUT STILL SPEND FREE LIMIT
        return {
          ...state,
          user: {
            ...state.user,
            paidAdvertLimit: action.user.paidAdvertLimit,
            freeAdvertLimit: action.user.freeAdvertLimit
          }
        };
      }
    }
    default: {
      return state;
    }
  }
}
