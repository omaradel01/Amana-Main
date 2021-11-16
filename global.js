import {
    setCustomText
} from 'react-native-global-props';

import { useFonts } from 'expo-font'
let [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Med': require('./assets/fonts/Poppins-Medium.ttf'),
});
if (!fontsLoaded) {
    return <AppLoading />;
}
else {
    export const customTextProps = {
        style: {
            fontSize: 16,
            fontFamily: 'Poppins-Med',
            color: 'black'
        }
    };
    setCustomText(customTextProps);

}


// Setting default styles for all Text components.
