import { API_KEY } from './../utils';

export const onUpdateSearchValue = query => {
    return {
        type: 'UPDATE_SEARCH_VALUE',
        query
    }
}

export const onShowError = () => ({
    type: 'SHOW_ERROR'
})

export const updateWeatherNow = weather => ({
    type: 'UPDATE_WEATHER_NOW',
    weather
})

export const updateWeatherTerm = (weather, days) => ({
    type: 'UPDATE_WEATHER_TERM',
    weather,
    days
})

export const onShowSearch = () => ({
    type: 'SHOW_SEARCH'
})

const dispatchIfSuccess = (response, fn) => dispatch => {
    let statusCode = Number(response.data.cod);
    if (statusCode === 200) {
        dispatch(fn(response.data, response.period));
    } else {
        dispatch(onShowError());
    }
}

export const fetchWeatherNow = city => dispatch =>  {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
        .then( response => response.json())
        .then( data => dispatchIfSuccess({data}, updateWeatherNow)(dispatch) )
        .catch((e)=>{ console.log('error', e); dispatch(onShowError()) });
}

export const fetchWeatherTerms = (city, period) => dispatch =>  {
    fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&cnt=${period}&appid=${API_KEY}`)
        .then( response => response.json())
        .then( data => dispatchIfSuccess({data, period}, updateWeatherTerm)(dispatch) )
        .catch((e)=>{ console.log('error', e); dispatch(onShowError()) });
}