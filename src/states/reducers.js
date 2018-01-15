// sleep
const initSleepState = {
    startSleepTime: 'na',
    endSleepTime: 'na',
    totalSleepTime: 'na',
    sleepToggle: false,
    sleep: false,  // 0時開始記時間 1時停止記時間
}

export function sleep(state = initSleepState, action) {
    switch (action.type) {
        case '@SLEEP/GET_START_SLEEP_TIME':
            return {
                ...state,
                startSleepTime: action.startSleepTime,
                sleep: true,
            };
        case '@SLEEP/GET_END_SLEEP_TIME':
            return {
                ...state,
                endSleepTime: action.endSleepTime,
                totalSleepTime: action.totalSleepTime,
                sleep: false,
            };
        case '@SLEEP/SLEEP_TOGGLE':
            return {
                ...state,
                sleepToggle: !state.sleepToggle,
            }
        default:
            return {
                ...state,
            };

    }
}

// phone
const initPhoneState = {
    startPhoneTime: 'na',
    endPhoneTime: 'na',
    totalPhoneTime: 'na',
    phone: false, // 0時開始記時間 1時停止記時間
    phoneToggle: false,
}

export function phone(state = initPhoneState, action) {
    switch (action.type) {
        case '@PHONE/GET_START_PHONE_TIME':
            return {
                ...state,
                startPhoneTime: action.startPhoneTime,
                phone: true,
            };
        case '@PHONE/GET_END_PHONE_TIME':
            return {
                ...state,
                endPhoneTime: action.endPhoneTime,
                totalPhoneTime: action.totalPhoneTime,
                phone: false,
            };
        case '@PHONE/PHONE_TOGGLE':
            return {
                ...state,
                phoneToggle: !state.phoneToggle,
            };
        default:
            return {
                ...state,
            };
    }
}

//breakFast
const initBreakFast = {
    breakFastToggle: false,
}

export function breakFast(state = initBreakFast, action) {
    switch (action.type) {
        case '@BREAKFAST/TOGGLE':
            return {
                ...state,
                breakFastToggle: !state.breakFastToggle,
            };
        default:
            return {
                ...state,
            };
    }
}
