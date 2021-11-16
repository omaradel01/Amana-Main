import React, {
    useContext,
    useState,
    useCallback,
    useLayoutEffect,
    useEffect
} from 'react'
import { StyleSheet } from 'react-native';
import AuthGlobal from '../../Context/Store/AuthGlobal'
import {
    Badge,
    Text
} from 'native-base';
import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../assets/common/baseURL";


export const NotificationCount = (props) => {
    const context = useContext(AuthGlobal)
    const [Notifications, getNotifications] = useState([])
    useFocusEffect((
        useCallback(
            () => {
                fetch(`${baseURL}notifications/user/${context.stateUser.user.userID}`, {
                    method: 'GET'
                })
                    .then(response => response.json())
                    .then(json => {
                        getNotifications(json)
                    }).catch((error) => {
                        console.log('API ERROR', error)
                    })

            },
            [Notifications]
        )

    ))


    return (
        <>
            {Notifications.length ?
                (
                    <Badge style={styles.Badge}>
                        <Text style={styles.text}>
                            {Notifications.length}
                        </Text>
                    </Badge>
                ) : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    badge: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: 5
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold'
    }
})