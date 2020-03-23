const initialState = {
  appointments: []
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_APPOINTMENT": {
      return {
        ...state,
        appointments: [...state.appointments, action.appointment]
      };
    }
    default: {
      return state;
    }
  }
}
