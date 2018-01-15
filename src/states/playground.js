export function setWeather(code, temp) {
    return {
        type: '@PLAY/SET_WEATHER',
        code,
        temp
    };
}

const initWeatherState = {
    code: -1,
    temp: 0
};

export function weather(state = initWeatherState, action){
    switch (action.type) {
        case '@PLAY/SET_WEATHER':
            return {
                ...state,
                code: action.code,
                temp: action.temp
            };
    
        default:
            return state;
    }
}