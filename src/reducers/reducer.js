


export function game(state = {}, action) {
    switch (action.type) {
        case 'CLICK_FIELD': {
            state.activeFieldIndex = action.payload
        }
    }
    return state;
}