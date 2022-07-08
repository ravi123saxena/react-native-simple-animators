import React from 'react';
import { Animated } from 'react-native';
import utils from '../utils';


const EventAnimator = ({ type, animatedValue, interpolation, children, style }) => {
  const animatedTypeStyle = {};
  animatedTypeStyle[type] = animatedValue.interpolate(interpolation);

  let animatedStyles;

  // If the type of animation is a transform, push the animatedTypeStyle to an array of 'transform'
  if (utils.isTransform(type)) {
    animatedStyles = {
      transform: [animatedTypeStyle],
    };
  } else {
    animatedStyles = animatedTypeStyle;
  }

  return <Animated.View style={[style, animatedStyles]}>{children}</Animated.View>;
};


export default EventAnimator;
