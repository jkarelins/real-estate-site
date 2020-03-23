const initialState = {
  appointments: []
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    // case "NEW_APPOINTMENT": {
    //   return {
    //     ...state,
    //     appointments: [
    //       ...state.appointments,
    //       { ...action.appointment.appointment }
    //     ],
    //     randomAddress: action.appointment.randomAddress
    //   };
    // }
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
    default: {
      return state;
    }
  }
}
