import React from 'react';
import { TouchableOpacity, View, Dimensions } from 'react-native';
import { PostCard } from './PostCard'
export const PostList = (props) => {
    const { item } = props;
    return (
        <TouchableOpacity
            onPress={() =>
                props.navigation.navigate("Post Details", { item: item })
            }
        >
            <View >
                <PostCard {...item} />
            </View>
        </TouchableOpacity >
    )
}