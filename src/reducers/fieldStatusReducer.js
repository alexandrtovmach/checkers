// i - field Index, 'm' - My checkers, 'o'- Opponent checkers
export function getStepsFields(i, side, queen) {
    if (!queen) {
        if ((i >= 0 && i < 4) || (i > 7 && i < 12) || (i > 15 && i < 20) || (i > 23 && i < 28)) {
            if (i!==3) {
                if (!((i+1)%4)) {
                    return side? [i-4+'m', i+4+'o']: [i-4+'o', i+4+'m'];
                }
                return side? [i-4+'m', i-3+'m', i+4+'o', i+5+'o']: [i-4+'o', i-3+'o', i+4+'m', i+5+'m'];
            } else {
                return side? [7+'o']: [7+'m'];
            }
        } else {
            if (i!==28) {
                if (!(i%4)) {
                    return side? [i-4+'m', i+4+'o']: [i-4+'o', i+4+'m'];
                }
                return side? [i-5+'m', i-4+'m', i+3+'o', i+4+'o']: [i-5+'o', i-4+'o', i+3+'m', i+4+'m'];
            } else {
                return side? [24+'m']: [24+'o'];
            }
        }
    } else {
        const diagonalsA = [
            [4,0],
            [12,8,5,1],
            [20,16,13,9,6,2],
            [28,24,21,17,14,10,7,3],
            [29,25,22,18,15,11],
            [30,26,23,19],
            [31,27]
        ],
        diagonalsB = [
            [3],
            [11,7,2],
            [19,15,10,6,1],
            [27,23,18,14,9,5,0],
            [31,26,22,17,13,8,4],
            [30,25,21,16,12],
            [29,24,20],
            [28]
        ];

        return [...getArrays(diagonalsA, i), ...getArrays(diagonalsB, i)]

        function getArrays(arr, index) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].indexOf(index) >= 0) {
                    return arr[i];
                };
            }
        }
    }
};

export function clearBoardStatus(arr) {
    return [...arr].map(elem => {
        if (elem.status) {
            elem.status = 0;
        }
        if (elem.victimField) {
            elem.victimField = null;
        }
        return elem;
    });
}

export function checkToQueen(i, myField) {
    return (myField? [0,1,2,3]: [28,29,30,31]).indexOf(i) !== -1
}
