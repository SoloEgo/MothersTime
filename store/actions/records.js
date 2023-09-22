import { SET_APP_IS_READY, ADD_CHILD, ADD_SCHEDULE, ADD_RECORD, LOAD_CHILDREN, LOAD_CHILD, LOAD_SCHEDULE, LOAD_RECORDS, REMOVE_CHILD, REMOVE_SCHEDULE, REMOVE_RECORD, ADD_ACTIVE_CHILD, SET_BSH_VISIBLE, SET_BSH_RCRD_VISIBLE, EDIT_SCHEDULE, EDIT_CHILD, EDIT_RECORD, SET_LOCALE, SET_USER_ID } from '../types';
import { DB } from '../../components/db';

export const setAppIsReady = (state) => {
    return async (dispatch) => {
        dispatch({
            type: SET_APP_IS_READY,
            payload: state,
        });
    };
}

export const setActiveChild = ({ userId, childId }) => async (dispatch) => {
    const child = await DB.getChild({ userId });
    let payload = { userId, name: child[0].name, dob: child[0].dob, gender: child[0].gender, photo: child[0].photo, childrenID: child[0].childrenID }
    dispatch({
        type: ADD_ACTIVE_CHILD,
        payload,
    });
};

export const loadChildren = (userId) => {
    return async (dispatch) => {
        const children = await DB.getChild({ userId });
        dispatch({
            type: LOAD_CHILDREN,
            payload: children,
        });
    };
};

export const loadChild = (userId) => {
    return async (dispatch) => {
        const child = await DB.getChild({ userId });
        //console.log('child=>', [...new Set(child.map(item=> item.name + '-' + item.gender))])
        //console.log(child)
        dispatch({
            type: LOAD_CHILD,
            payload: child,
        });
    };
};

export const loadSchedules = (userId, childId) => {
    return async (dispatch) => {
        const schedule = await DB.getSchedule({ userId, childId });
        dispatch({
            type: LOAD_SCHEDULE,
            payload: schedule,
        });
    };
};

export const loadRecords = (userId) => {
    return async (dispatch) => {
        const records = await DB.getRecords({ userId });

        dispatch({
            type: LOAD_RECORDS,
            payload: records,
        });
    };
};

export const removeChild = (userId, childId) => async (dispatch) => {
    await DB.removePost({ userId, childId });
    dispatch({
        type: REMOVE_CHILD,
        payload: id,
    });
};

export const removeSchedule = (userIdVal, childId, scheduleId, type) => async (dispatch) => {
    await DB.removeSchedule({ userIdVal, childId, scheduleId, type });
    dispatch({
        type: REMOVE_SCHEDULE,
        payload: { scheduleId, childId, type },
    });
};

export const removeRecord = (userId, recordId) => async (dispatch) => {
    await DB.removeRecord({ userId, recordId });
    dispatch({
        type: REMOVE_RECORD,
        payload: { userId, recordId }
    });
};

export const addChild = ({ userId, name, dob, gender, photo, childrenID }) => async (dispatch) => {
    await DB.createChild({ userId, name, dob, gender, photo });
    let payload = { userId, name, dob, gender, photo, childrenID }
    dispatch({
        type: ADD_CHILD,
        payload,
    });
};

export const addSchedule = ({ userId, childId, type, name, time }) => async (dispatch) => {
    const id = await DB.createSchedule({ userId, childId, type, name, time });
    let payload = { userId, childId, type, name, time }
    payload.scheduleId = id[0].scheduleId;
    dispatch({
        type: ADD_SCHEDULE,
        payload,
    });
};

export const addRecord = ({ userId, childId, type, scheduleId, name, dateTime, dateTimeEnd, attr1 }) => async (dispatch) => {
    //console.log({ userId, childId, type, scheduleId, name, dateTime, attr1 })
    const recordId = await DB.createRecord({ userId, childId, type, scheduleId, name, dateTime, dateTimeEnd, attr1 });
    let payload = { userId, childId, type, scheduleId, name, dateTime, dateTimeEnd, attr1, recordId: recordId[0].recordId }
    dispatch({
        type: ADD_RECORD,
        payload,
    });
};

export const editSchedule = ({ userId, childId, scheduleId, name, time }) => async (dispatch) => {
    const result = await DB.editSchedule({ userId, childId, scheduleId, name, time });
    dispatch({
        type: EDIT_SCHEDULE,
        payload: result,
    });
};
export const editRecord = ({ userId, childId, type, scheduleId, name, dateTime, dateTimeEnd, attr1, recordId }) => async (dispatch) => {
    const result = await DB.editRecord({ userId, childId, type, scheduleId, name, dateTime, dateTimeEnd, attr1, recordId });
    dispatch({
        type: EDIT_RECORD,
        payload: result,
    });
};

export const editChild = ({ userId, childrenID, name, dob, gender, photo }) => async (dispatch) => {
    const result = await DB.editChild({ userId, childrenID, name, dob, gender, photo });
    dispatch({
        type: EDIT_CHILD,
        payload: { userId, childrenID, name, dob, gender, photo },
    });
}

export const setBottomSheetVisible = (visible) => {
    return async (dispatch) => {
        dispatch({
            type: SET_BSH_VISIBLE,
            payload: visible,
        });
    };
};

export const setBottomRecordSheetVisible = (visible) => {
    return async (dispatch) => {
        dispatch({
            type: SET_BSH_RCRD_VISIBLE,
            payload: visible,
        });
    };
};

export const setLocale = (locale) => {
    return async (dispatch) => {
        dispatch({
            type: SET_LOCALE,
            payload: locale,
        });
    };
};

export const setUserId = (userId) => {
    return async (dispatch) => {
        dispatch({
            type: SET_USER_ID,
            payload: userId,
        });
    };
};

export const wipeData = () => async () => {
    const result = await DB.wipeDB()
}