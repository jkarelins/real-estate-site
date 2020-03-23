const initialState = {
  appointments: []
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_APPOINTMENT": {
      return {
        ...state,
        checkedAppointment: { found: true }
      };
    }
    case "GET_ONE_APPOINTMENT": {
      return {
        ...state,
        selectedAppointment: action.appointment
      };
    }
    case "GET_APPOINTMENTS": {
      return {
        ...state,
        appointments: action.appointments
      };
    }
    case "CANCEL_APPOINTMENT": {
      const appointments = state.appointments.map(appointment => {
        if (appointment.id === action.appointment.id) {
          return action.appointment;
        }
        return appointment;
      });
      return {
        ...state,
        appointments
      };
    }
    case "CHECK_APPOINTMENT": {
      return {
        ...state,
        checkedAppointment: action.appointment
      };
    }
    default: {
      return state;
    }
  }
}
