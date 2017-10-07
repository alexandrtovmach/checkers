import { getStepsFields, clearBoardStatus } from './fieldStatusReducer'


const fields = [];
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
    state.fields = fields;

    switch (action.type) {
        case 'CLICK_FIELD': {
            if (state.fields[action.payload].checker) {
                const fieldArr = clearBoardStatus(state.fields),
                fieldsStatus = getStepsFields(action.payload, state.fields[action.payload].myCheckers, state.fields[action.payload].queen );

                fieldsStatus.forEach(elem => {
                    if (elem >= 0 && elem <= 31) {
                        if (!fieldArr[elem].checker) {
                            fieldArr[elem].status = 2;
                        } else {
                            getStepsFields(fieldArr[elem].fieldIndex, state.fields[action.payload].myCheckers, state.fields[action.payload].queen).forEach(el => {
                                if ((el >= 0 && el <= 31) && 
                                    !fieldArr[el].checker && 
                                    (fieldArr[action.payload].myCheckers !== fieldArr[elem].myCheckers) &&
                                    (Math.abs(fieldArr[el].fieldIndex - fieldArr[action.payload].fieldIndex) !== 8) &&
                                    (Math.abs(fieldArr[el].fieldIndex - fieldArr[action.payload].fieldIndex) !== 1)
                                ) {
                                    fieldArr[el].victimField = elem;
                                    fieldArr[el].status = 3;
                                }
                            })
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
                }
            }
            break;
        }
        case 'ONE_STEP': {
            const cacheArr = clearBoardStatus(state.fields);

            cacheArr[state.activeField.index].checker = false;
            cacheArr[action.payload].checker = true;
            cacheArr[action.payload].myCheckers = state.activeField.myCheckers;

            return {
                ...state,
                fields: cacheArr,
                activeField: null
            }
            break;
        }
        case 'ONE_HIT': {
            const cacheArr = clearBoardStatus(state.fields);

            cacheArr[state.activeField.index].checker = false;
            cacheArr[action.payload.victimField].checker = false;
            cacheArr[action.payload.to].checker = true;
            cacheArr[action.payload.to].myCheckers = state.activeField.myCheckers;

            return {
                ...state,
                fields: cacheArr
            }
            break;
        }
    }
    return state;
}