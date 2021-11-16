import React from 'react'
import { View, Dimensions, StyleSheet, Image } from 'react-native'
import { Content, Left, Body, ListItem, Thumbnail, Text } from 'native-base'

var { width, height } = Dimensions.get("window")

export const SearchedPosts = (props) => {
    const { filteredPosts } = props
    return (
        <Content style={{ width: width, height: height }}>
            {filteredPosts.length > 0 ?
                (filteredPosts.map((item) =>
                (
                    <ListItem
                        style={{ zIndex: 999999 }}
                        onPress={() => {
                            props.navigation.navigate('Post Details', { item: item })
                        }}
                        key={item._id}
                        //     props.navigation.navigate('Product Detail', { item: item })
                        // }}
                        avatar>
                        <Left>
                            <Thumbnail
                                source={{ uri: item.postImage ? item.postImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                            />
                        </Left>
                        <Body>
                            <Text style={{ fontFamily: 'Poppins-Med' }}>{item.postTitle}</Text>
                            <Text note style={{ fontFamily: 'Poppins-Med' }}>
                                {item.postDescription.substring(0, 50) + '....'}
                            </Text>
                        </Body>
                    </ListItem>
                ))
                ) :
                (
                    <View style={styles.searchWrap}>
                        <View >
                            <Image source={require('../../assets/searchImg.jpg')}
                                style={{ width: width / 2 + 90, height: height / 2 }}
                                resizeMode='cover'
                            />
                            <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 20 }}>No Posts Found ..</Text>
                        </View>
                    </View>
                )}
        </Content>
    )
}

const styles = StyleSheet.create({
    searchWrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        height: height
    }
})