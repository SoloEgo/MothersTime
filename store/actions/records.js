import { ADD_CHILD, ADD_SCHEDULE, ADD_RECORD, LOAD_CHILDREN, LOAD_CHILD, LOAD_SCHEDULE, LOAD_RECORDS, REMOVE_CHILD, REMOVE_SCHEDULE, REMOVE_RECORD, ADD_ACTIVE_CHILD, SET_BSH_VISIBLE, EDIT_SCHEDULE } from '../types';
import { DB } from '../../components/db';

export const loadChildren = (userId) => {
    return async (dispatch) => {
        const children = await DB.getChild({ userId });
        dispatch({
            type: LOAD_CHILDREN,
            payload: children,
        });
    };
};

export const loadChild = (userId, childrenId) => {
    return async (dispatch) => {
        const child = await DB.getChild({ userId, childrenId });
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

export const loadRecords = (userId, childId) => {
    return async (dispatch) => {
        const records = await DB.getRecords({ userId, childId });

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
    await DB.removePost({ userId, recordId });
    dispatch({
        type: REMOVE_RECORD,
        payload: id,
    });
};

export const addChild = ({ userId, name, dob, gender, photo }) => async (dispatch) => {
    await DB.createChild({ userId, name, dob, gender, photo });
    let payload = { userId, name, dob, gender, photo }
    dispatch({
        type: ADD_CHILD,
        payload,
    });
};

export const setActiveChild = ({ userId, childId }) => async (dispatch) => {
    const child = await DB.getChild({ userId });
    let payload = { userId, name: child[0].name, dob: child[0].dob, gender: child[0].gender, photo: child[0].photo }
    dispatch({
        type: ADD_ACTIVE_CHILD,
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

export const editSchedule = ({ userId, childId, scheduleId, name, time }) => async (dispatch) => {
    const result = await DB.editSchedule({ userId, childId, scheduleId, name, time });
    console.log('result')
    console.log(result)
    dispatch({
        type: EDIT_SCHEDULE,
        payload: result,
    });
};

export const setBottomSheetVisible = (visible) => {
    return async (dispatch) => {
        dispatch({
            type: SET_BSH_VISIBLE,
            payload: visible,
        });
    };
};