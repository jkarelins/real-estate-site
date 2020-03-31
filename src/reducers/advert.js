const initialState = {
  allAdverts: [],
  advertsCount: 0
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_NEW_ADVERT": {
      return {
        ...state,
        lastAddedAdvert: action.advert,
        allAdverts: [...state.allAdverts, action.advert],
        advertsCount: state.advertsCount + 1
      };
    }
    case "FETCH_ALL_ADVERTS": {
      const { data, count } = action.adverts.data;
      if (state.allAdverts) {
        const modifiedAdverts = data.map(advert => {
          if (advert.advert_images.length !== 0) {
            return {
              ...advert,
              image: advert.advert_images[0].image.url
            };
          }
          return advert;
        });

        return {
          ...state,
          allAdverts: [...state.allAdverts, ...modifiedAdverts],
          advertsCount: count
        };
      }
      return {
        ...state,
        allAdverts: data,
        advertsCount: count
      };
    }
    case "FETCH_SEARCHED_ADVERTS": {
      const { data, count } = action.adverts.data;
      if (state.searchedAddress) {
        const modifiedAdverts = data.map(advert => {
          if (advert.advert_images.length !== 0) {
            return {
              ...advert,
              image: advert.advert_images[0].image.url
            };
          }
          return advert;
        });

        return {
          ...state,
          searchedAdverts: [...state.allAdverts, ...modifiedAdverts],
          advertsCount: count
        };
      }
      return {
        ...state,
        searchedAdverts: data,
        advertsCount: count
      };
    }
    case "FETCH_ONE_ADVERT": {
      return {
        ...state,
        selectedAdvert: action.advert
      };
    }
    case "GET_AGENCY_AGENTS": {
      const agencyAgents = action.agency.users.filter(
        agent => agent.role === "agencyAgent"
      );
      return {
        ...state,
        agencyAgents
      };
    }
    case "TOGGLE_AGENT_CONFIRMATION": {
      const agencyAgents = state.agencyAgents.map(agent => {
        if (agent.id === action.agent.id) {
          return { ...action.agent };
        }
        return agent;
      });

      return {
        ...state,
        agencyAgents
      };
    }
    case "GET_MY_ADVERTS": {
      return {
        ...state,
        myAdverts: [...action.adverts],
        myAdvertIds: [...action.adverts.map(advert => advert.id)]
      };
    }
    case "APPOINTMENT_WAS_EDITED": {
      if (state.myAdverts) {
        const editedAppointments = state.myAdverts.map(advert => {
          return {
            ...advert,
            advert_appointments: advert.advert_appointments.map(addApp => {
              if (addApp.appointmentId === action.appointment.id) {
                return {
                  ...addApp,
                  appointment: action.appointment
                };
              }
              return addApp;
            })
          };
        });
        return {
          ...state,
          myAdverts: editedAppointments
        };
      }
      return {
        ...state
      };
    }
    case "CANCEL_APPOINTMENT": {
      if (state.myAdverts) {
        const editedAppointments = state.myAdverts.map(advert => {
          return {
            ...advert,
            advert_appointments: advert.advert_appointments.map(addApp => {
              if (addApp.appointmentId === action.appointment.id) {
                return {
                  ...addApp,
                  appointment: action.appointment
                };
              }
              return addApp;
            })
          };
        });
        return {
          ...state,
          myAdverts: editedAppointments
        };
      }
      return {
        ...state
      };
    }
    case "ADD_NEW_IMAGE": {
      return {
        ...state,
        selectedAdvert: {
          ...state.selectedAdvert,
          advert_images: [
            ...state.selectedAdvert.advert_images,
            { image: { ...action.image }, imageId: action.image.id }
          ]
        }
      };
    }
    case "DELETE_ONE_IMAGE": {
      const advert_images = state.selectedAdvert.advert_images.filter(
        image => image.imageId !== action.image.id
      );
      return {
        ...state,
        selectedAdvert: {
          ...state.selectedAdvert,
          advert_images
        }
      };
    }
    case "ONE_EXTRA_ADDED": {
      return {
        ...state,
        selectedAdvert: {
          ...state.selectedAdvert,
          advert_extras: [
            ...state.selectedAdvert.advert_extras,
            { extraId: action.extra.id, extra: action.extra }
          ]
        }
      };
    }
    case "ONE_EXTRA_REMOVED": {
      const advert_extras = state.selectedAdvert.advert_extras.filter(
        advertCon => advertCon.extraId !== action.extra.id
      );
      return {
        ...state,
        selectedAdvert: {
          ...state.selectedAdvert,
          advert_extras
        }
      };
    }
    default: {
      return state;
    }
  }
}
