import { SET_APP_IS_READY, ADD_CHILD, ADD_SCHEDULE, ADD_RECORD, LOAD_CHILDREN, LOAD_CHILD, LOAD_SCHEDULE, LOAD_RECORDS, REMOVE_CHILD, REMOVE_SCHEDULE, REMOVE_RECORD, SET_ACTIVE_CHILD, SET_BSH_VISIBLE, SET_BSH_RCRD_VISIBLE, EDIT_SCHEDULE, EDIT_CHILD, EDIT_RECORD, SET_LOCALE, SET_USER_ID } from '../types';
import { Platform, NativeModules } from 'react-native'

const deviceLanguage =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier;
const locale = deviceLanguage.substring(0, 2);

const initialState = {
    allRecords: [],
    allChildren: [],
    allSchedules: [],
    activeChild: [],
    bottomSheetVisible: false,
    bottomRecordSheetVisible: false,
    locale: locale,
    userId: '',
    appIsReady: false
};

export const recordsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_APP_IS_READY: 
        return {
            ...state,
            appIsReady: action.payload
        }
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
                allRecords: state.allRecords.filter((p) => p.recordId !== action.payload.recordId)
            };
        case ADD_CHILD:
            console.log('payload', action.payload)
            return {
                ...state,
                allChild: [{ ...action.payload }]
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
        case SET_BSH_RCRD_VISIBLE:
            return {
                ...state,
                bottomRecordSheetVisible: action.payload
            }
        case SET_LOCALE:
            return {
                ...state,
                locale: action.payload
            }
        case EDIT_SCHEDULE:
            return {
                ...state,
                allSchedules: action.payload
            }
        case EDIT_RECORD:
            return {
                ...state,
                allRecords: action.payload
            }
        case EDIT_CHILD:
            return {
                ...state,
                activeChild: [{...action.payload}]
            }
        case SET_USER_ID:
            return {
                ...state,
                userId: action.payload
            }
        default:
            return state;
    }
};