import { getStepsFields, checkToQueen, clearBoardStatus, checkToDouble } from './fieldStatusReducer'
import { SocketService } from '../services/socketService';


const fields = [];

const socketService = new SocketService();

for (let i = 0; i < 32; i++) {
    fields.push({
        checker: (i < 12 || i > 19),
        fieldIndex: i,
        myCheckers: +(i > 19),
        status: 0,
        victimField: null,
        queen: false
    })
}

export function game(state = {}, action) {
    state.fields = state.fields || fields;
    state.rooms = state.rooms || [];
    state.myId = state.myId || '';
    state.gameTitle = state.gameTitle || 'Easy Checkers';
    state.mySide = state.mySide;
    state.turn = (state.turn === undefined)? state.mySide: state.turn;
    state.finishedGame = state.finishedGame;
    switch (action.type) {
        case 'CLICK_FIELD': {
            if (state.fields[action.payload].checker) {
                const fieldArr = clearBoardStatus(state.fields),
                    steps = getStepsFields(action.payload, state.fields[action.payload].myCheckers, state.fields[action.payload].queen);

                steps.forEach(elem => {
                    let myFields;
                    if (!state.fields[action.payload].queen) {
                        myFields = elem.includes('m');
                        elem = parseFloat(elem);
                    }
                    if (elem >= 0 && elem <= 31) {
                        if (!fieldArr[elem].checker && myFields) {
                            fieldArr[elem].status = 2;
                        } else {
                            getStepsFields(fieldArr[elem].fieldIndex, state.fields[action.payload].myCheckers, state.fields[action.payload].queen).forEach(el => {
                                if (!state.fields[action.payload].queen) {
                                    el = parseFloat(el);
                                }
                                if ((el >= 0 && el <= 31) && 
                                    !fieldArr[el].checker && 
                                    fieldArr[elem].checker
                                ) {
                                    if (state.fields[action.payload].queen) {
                                        let pos = steps.indexOf(el);
                                        if ((pos > -1) && (((action.payload > elem) && (el < elem)) || ((action.payload < elem) && (el > elem)))) {
                                            if (el < action.payload) {
                                                if (fieldArr[steps[pos-2]].checker && !(action.payload === steps[pos-2]) && fieldArr[steps[pos-1]].checker || (fieldArr[action.payload].myCheckers === fieldArr[elem].myCheckers) || checkToDouble(pos, true, steps, fieldArr)) {
                                                    fieldArr[el].status = 4;
                                                } else {
                                                    fieldArr[el].victimField = elem;
                                                    fieldArr[el].status = 3;
                                                }
                                            } else {
                                                if (fieldArr[steps[pos+2]].checker && !(action.payload === steps[pos+2]) && fieldArr[steps[pos+1]].checker || (fieldArr[action.payload].myCheckers === fieldArr[elem].myCheckers) || checkToDouble(pos, false, steps, fieldArr)) {
                                                    fieldArr[el].status = 4;
                                                } else {
                                                    fieldArr[el].victimField = elem;
                                                    fieldArr[el].status = 3;
                                                }
                                            }
                                        }
                                    } else if (
                                        (Math.abs(fieldArr[el].fieldIndex - fieldArr[action.payload].fieldIndex) !== 8) &&
                                        (Math.abs(fieldArr[el].fieldIndex - fieldArr[action.payload].fieldIndex) !== 1) && 
                                        (fieldArr[action.payload].myCheckers !== fieldArr[elem].myCheckers)
                                    ) {
                                        fieldArr[el].victimField = elem;
                                        fieldArr[el].status = 3;
                                    }
                                }
                            })
                        }
                        if (state.fields[action.payload].queen) {
                            for (let i = 0; i < steps.length; i++) {
                                if ((fieldArr[steps[i]].status !== 3)&&(fieldArr[steps[i]].status !== 4)&&(!fieldArr[steps[i]].checker)) {
                                    fieldArr[steps[i]].status = 2;
                                }
                            }
                        }
                    }
                })

                fieldArr[action.payload].status = 1;
                
                return {
                    ...state,
                    fields: fieldArr,
                    activeField: {
                        index: action.payload,
                        myCheckers: fieldArr[action.payload].myCheckers
                    }
                };
            }
            break;
        }
        case 'ONE_STEP': {
            const cacheArr = clearBoardStatus(state.fields);

            cacheArr[state.activeField.index].checker = false;
            cacheArr[action.payload].checker = true;
            cacheArr[action.payload].myCheckers = state.activeField.myCheckers;
            cacheArr[action.payload].queen = cacheArr[state.activeField.index].queen || checkToQueen(action.payload, state.activeField.myCheckers);
            
            socketService.sendBoard(cacheArr, state.room);

            return {
                ...state,
                fields: cacheArr,
                activeField: null,
                turn: +(!state.turn)
            };
            break;
        }
        case 'ONE_HIT': {
            const cacheArr = clearBoardStatus(state.fields);

            cacheArr[state.activeField.index].checker = false;
            cacheArr[action.payload.victimField].checker = false;
            cacheArr[action.payload.to].checker = true;
            cacheArr[action.payload.to].myCheckers = state.activeField.myCheckers;
            cacheArr[action.payload.to].queen = cacheArr[state.activeField.index].queen || checkToQueen(action.payload.to, state.activeField.myCheckers);
            
            socketService.sendBoard(cacheArr, state.room);

            return {
                ...state,
                fields: cacheArr,
                activeField: null,
                turn: +(!state.turn)
            };
            break;
        }
        case 'GET_BOARD': {
            return {
                ...state,
                fields: action.payload,
                activeField: null,
                turn: +(!state.turn)
            };
            break;
        }
        case 'NEW_ROOM': {
            socketService.newRoom(action.payload);
            break;
        }
        case 'JOIN_ROOM': {
            socketService.joinRoom(action.payload, state.myId);
            break;
        }
        case 'JOINED_ROOM': {            
            return {
                ...state,
                ...action.payload,
                gameTitle: action.title,
                mySide: action.side,
                turn: +(!state.turn)
            };
            break;
        }
        case 'GETED_ROOM_LIST': {
            return {
                ...state,
                rooms: action.payload,
                myId: action.myId
            };
            break;
        }
        case 'FINISHED_GAME': {     
            return {
                ...state,
                finishedGame: action.payload
            };
            break;
        }
    }
    return state;
}