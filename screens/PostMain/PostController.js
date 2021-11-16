import React, { useContext } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import AuthGlobal from '../../Context/Store/AuthGlobal'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Button, Icon } from 'native-base'
var { width, height } = Dimensions.get('window')

export const PostController = (props) => {
    const context = useContext(AuthGlobal)
    let [fontsLoaded] = useFonts({
        'Poppins-Bold': require('../../assets/fonts/Poppins-ExtraBold.ttf'),
        'Poppins-Med': require('../../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {
        if (context.stateUser.isAuthenticated === false || context.stateUser.isAuthenticated === null) {
            return (
                <View style={{ margin: 'auto', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../assets/rejected.png')}
                        style={{ width: width / 2, height: height / 2 }}
                        resizeMode='contain'
                    />
                    <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Med', fontSize: 20 }}>You don't have an access to view this page</Text>
                    <View>
                        <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')} style={{ backgroundColor: '#fff', ...styles.btn }}>
                            <Text style={{ fontFamily: 'Poppins-Bold', ...styles.btnTxt }}>Go To Registeration</ Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.postControllerContainer}>
                    <Button block iconLeft style={styles.PostButtons} onPress={() => { props.navigation.navigate('Add') }} >
                        <Icon style={styles.PostButtonsIcons} name='add-circle-outline' />
                        <Text style={{ fontFamily: 'Poppins-Med', fontSize: 25, color: '#fff', top: 3 }}>Add New Post</Text>
                    </Button>
                    <Button block iconLeft style={styles.PostButtons} onPress={() => { props.navigation.navigate('Delete') }}  >
                        <Icon style={styles.PostButtonsIcons} name='trash-outline' />
                        <Text style={{ fontFamily: 'Poppins-Med', fontSize: 25, color: '#fff', top: 3 }}>Delete Post</Text>
                    </Button>
                    <Button block iconLeft style={styles.PostButtons} onPress={() => { props.navigation.navigate('View') }} >
                        <Icon style={styles.PostButtonsIcons} name='eye-outline' />
                        <Text style={{ fontFamily: 'Poppins-Med', fontSize: 25, color: '#fff', top: 3 }}>View All Posts</Text>
                    </Button>
                </View>
            )
        }
    }
}
const styles = StyleSheet.create({
    btn: {
        height: 50,
        width: 280,
        borderRadius: 80,
        borderWidth: 1,
        borderColor: '#52b788',
        marginTop: 30,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    btnTxt: {
        color: 'white',
        fontSize: 20,
        color: "#000",
        textAlign: 'center'
    },
    postControllerContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    PostButtons: {
        backgroundColor: '#52b788',
        padding: 20,
        margin: 12,
        height: 100
    },
    PostButtonsIcons: {
        marginRight: 20,
        fontSize: 30,
        fontWeight: 'bold'
    }

})