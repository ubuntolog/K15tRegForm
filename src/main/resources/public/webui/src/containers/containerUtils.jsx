import {connect} from 'react-redux';



export function getItemsInTotal(state) {
	if (state.isSearchingMode) {
        const q = state.queryMap[state.currentQueryId];
        return q && q.status && (q.status.matchesFound | 0) || 0;
	}
    return state.treebankInfo.size | 0;
}
