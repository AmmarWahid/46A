import React, {useRef} from 'react';
import {View, Image, StyleSheet, Dimensions, FlatList} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  multiply,
  Value,
  cond,
  set,
  eq,
  add,
} from 'react-native-reanimated';

const ZoomableImage = ({source}) => {
  const scale = new Value(1);
  const focalX = new Value(0);
  const focalY = new Value(0);
  const state = new Value(-1);

  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: {
          scale,
          focalX,
          focalY,
          state,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const onZoomStateChange = cond(
    eq(state, State.END),
    set(scale, cond(eq(scale, 1), 1, [scale])),
  );

  return (
    <PinchGestureHandler
      onGestureEvent={onZoomEvent}
      onHandlerStateChange={onZoomStateChange}>
      <Animated.View style={styles.container}>
        <Animated.Image
          source={source}
          style={[
            styles.image,
            {
              transform: [
                {translateX: multiply(focalX, -1)},
                {translateY: multiply(focalY, -1)},
                {scale},
                {translateX: focalX},
                {translateY: focalY},
              ],
            },
          ]}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
};
export default ZoomableImage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
});
