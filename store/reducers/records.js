import { ADD_CHILD, ADD_SCHEDULE, ADD_RECORD, LOAD_CHILDREN, LOAD_CHILD, LOAD_SCHEDULE, LOAD_RECORDS, REMOVE_CHILD, REMOVE_SCHEDULE, REMOVE_RECORD, SET_ACTIVE_CHILD, SET_BSH_VISIBLE, EDIT_SCHEDULE } from '../types';

const initialState = {
    allRecords: [],
    allChildren: [],
    allSchedules: [],
    activeChild: [{ name: '', photo: '', dob: '', id: '' }],
    bottomSheetVisible: false
};

export const recordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CHILD:
            return {
                ...state,
                activeChild: action.payload
            };
        case LOAD_CHILDREN: 
            return {
                ...state,
                allChildren: action.payload
            };
        case LOAD_SCHEDULE:
            return {
                ...state,
                allSchedules: action.payload
            };
        case LOAD_RECORDS:
            return {
                ...state,
                allRecords: action.payload,
            };
        case REMOVE_CHILD:
            return {
                ...state,
                allChild: state.allChild.filter((p) => p.id !== action.payload)
            };
        case REMOVE_SCHEDULE:
            return {
                ...state,
                allSchedules: state.allSchedules.filter((p) => p.scheduleId !== action.payload.scheduleId)
            };
        case REMOVE_RECORD:
            return {
                ...state,
                allRecords: state.allRecords.filter((p) => p.id !== action.payload)
            };
        case ADD_CHILD:
            return {
                ...state,
                allChild: [{ ...action.payload }, ...state.allChild],
            };
        case ADD_SCHEDULE:
            return {
                ...state,
                allSchedules: [...state.allSchedules, { ...action.payload }],
            };
        case ADD_RECORD:
            return {
                ...state,
                allRecords: [{ ...action.payload }, ...state.allRecords],
            };
        case SET_ACTIVE_CHILD:
            return {
                ...state,
                activeChild: [{ ...action.payload }],
            };
        case SET_BSH_VISIBLE:
            return {
                ...state,
                bottomSheetVisible: action.payload
            }
        case EDIT_SCHEDULE:
            return {
                ...state,
                allSchedules: action.payload
            }
        default:
            return state;
    }
};