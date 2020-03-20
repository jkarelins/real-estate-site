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
        return {
          ...state,
          allAdverts: [...state.allAdverts, ...data],
          advertsCount: count
        };
      }
      return {
        ...state,
        allAdverts: data,
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
        myAdverts: [...action.adverts]
      };
    }
    default: {
      return state;
    }
  }
}
