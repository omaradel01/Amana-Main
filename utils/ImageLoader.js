import React, { Component } from 'react';
import { Animated } from 'react-native';

class ImageLoader extends Component {
    state = {
        opacity: new Animated.Value(0),
    }
    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }
    render() {
        return (
            <Animated.View>
                <Animated.Image
                    onLoad={this.onLoad}
                    {...this.props}
                    style={[
                        {
                            opacity: this.state.opacity,
                            transform: [
                                {
                                    scale: this.state.opacity.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.55, 1],
                                    })
                                },
                            ],
                        },
                        this.props.style,
                    ]}
                />
            </Animated.View>

        );
    }
}

export default ImageLoader