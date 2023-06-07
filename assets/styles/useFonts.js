import * as Font from "expo-font";

export default useFonts = async () => {
    console.log('font')
    await Font.loadAsync({
        'Inter-Black': require('../fonts/Inter-Black.ttf'),
        'Inter-Bold': require('../fonts/Inter-Bold.ttf'),
        'Inter-ExtraBold': require('../fonts/Inter-ExtraBold.ttf'),
        'Inter-ExtraLight': require('../fonts/Inter-ExtraLight.ttf'),
        'Inter-Light': require('../fonts/Inter-Light.ttf'),
        'Inter-Medium': require('../fonts/Inter-Medium.ttf'),
        'Inter-Regular': require('../fonts/Inter-Regular.ttf'),
        'Inter-SemiBold': require('../fonts/Inter-SemiBold.ttf'),
        'Inter-Thin': require('../fonts/Inter-Thin.ttf'),
    });
}
