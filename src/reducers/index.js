const defaultAppState = {
    query: '',
    status: true,
    weather: {
        now: null,   
        term: null,
        days: 7
    }
}

export function rootReducer(state = defaultAppState, action){
    switch(action.type) {
        case 'UPDATE_SEARCH_VALUE': return { 
                                             ...state, 
                                             query: action.query 
                                            }; 
        case 'SHOW_SEARCH': return { 
                                     ...state, 
                                     ...defaultAppState
                                   }; 
        case 'UPDATE_WEATHER_NOW': return {   
                                        ...state, 
                                        status: true,
                                        weather: {
                                            ...state.weather,
                                            now: action.weather
                                        }
                                    }; 
        case 'UPDATE_WEATHER_TERM': return {   
                                            ...state, 
                                            status: true,
                                            weather: {
                                                ...state.weather,
                                                term: action.weather,
                                                days: action.days,
                                            }
                                        }; 
        case 'SHOW_ERROR': return {
            ...state,
            status: false,
        }
        default: return state;
    }
}

 