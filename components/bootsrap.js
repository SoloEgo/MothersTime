import {DB} from './db';
import * as Font from "expo-font";
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, loadChild, wipeData } from '../store/actions/records';

export async function bootstrap() {
    //const dispatch = useDispatch();

    try {
        await Font.loadAsync({
            'Inter-Black': require('../assets/fonts/Inter-Black.ttf'),
            'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
            'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.ttf'),
            'Inter-ExtraLight': require('../assets/fonts/Inter-ExtraLight.ttf'),
            'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),
            'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
            'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
            'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
            'Inter-Thin': require('../assets/fonts/Inter-Thin.ttf'),
        });

        console.log('starting db')
        await DB.initChildren();
        await DB.initSchedule();
        await DB.initTask();
        console.log('Database started...');
       // dispatch(setAppIsReady(true))
        return true
    } catch (e) {
        console.log('Error: ', e);
    }
}