import {sentenceInContextWindowSize, privateTreebankSentenceWindow} from '../constants';

export function keys(o) {
    const a = [];
    for (const x in o) {
        if (o.hasOwnProperty(x)) {
            a.push(x);
        }
    }
    return a;
}

export function toPairs(o) {
    var a = []
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            a.push([k, o[k]]);
        }
    }
    return a;
}

export function heightOf(elementId) {
    const element = document.getElementById(elementId);
    return element ? element.clientHeight : 0;
}

/// returns a [begin, end] array such that:
/// 1 <= begin <= id <= end <= max
/// end - begin = 2 * sentenceInContextWindowSize  (if possible)
export function getRange(id, max, isPrivateTreebank) {
    let size = isPrivateTreebank ? privateTreebankSentenceWindow : sentenceInContextWindowSize;
    let begin = id - size;
    let end = id + size;


    if (begin < 1) {
        const delta = 1 - begin;
        begin += delta;
        end += delta;
    }

    if (end > max) {
        const delta = end - max;
        begin -= delta;
        end -= delta;
    }

    if (begin < 1) {
        begin = 1;
    }

    return [begin, end];
}