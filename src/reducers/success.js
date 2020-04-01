const initialState = null;

export default function successReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_NEW_ADVERT": {
      return {
        text: "You have successfully added a new advertisement."
      };
    }
    case "TOGGLE_AGENT_CONFIRMATION": {
      return {
        text: `Agent profile ${
          action.agent.agentConfirmedByManager
            ? "confirmed successfully"
            : "successfully blocked"
        }.`
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
    case "LOG_OUT_USER": {
      return {
        text: `Thank you for your visit. See you soon.`
      };
    }
    case "NEW_APPOINTMENT": {
      return {
        text: `New Appointment request was succesfully sent.`
      };
    }
    case "CANCEL_APPOINTMENT": {
      return {
        text: `Appointment was succesfully canceled.`
      };
    }
    case "APPOINTMENT_WAS_EDITED": {
      return {
        text: `Appointment was succesfully edited.`
      };
    }
    case "ONE_EXTRA_ADDED": {
      return {
        text: `Appointment advantage succesfully added.`
      };
    }
    case "ONE_EXTRA_REMOVED": {
      return {
        text: `Appointment advantage succesfully removed.`
      };
    }
    case "ADD_NEW_IMAGE": {
      return {
        text: `Advertisement image succesfully uploaded.`
      };
    }
    case "DELETE_ONE_IMAGE": {
      return {
        text: `Advertisement image succesfully removed.`
      };
    }
    case "LIKE_ADVERT": {
      return {
        text: `Advertisement succesfully added to your Favorites list.`
      };
    }
    case "DISLIKE_ADVERT": {
      return {
        text: `Advertisement succesfully removed from your Favorites list.`
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
