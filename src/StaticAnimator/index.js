import React from 'react';
import { Animated, Easing } from 'react-native';

import utils from '../utils';

export default class StaticAnimator extends React.Component {
  constructor(props) {
    super(props);

    this.reset = this.reset.bind(this);
    this.animateIn = this.animateIn.bind(this);
    this.animateOut = this.animateOut.bind(this);

    this.state = {
      animatedValue: new Animated.Value(0),
    };
  }

  componentDidMount() {
    const shouldAnimateOnMount =
      (this.props.initialValue || this.props.initialValue === 0) &&
      (this.props.finalValue || this.props.finalValue === 0);

    if (this.props.shouldAnimateIn && shouldAnimateOnMount) {
      this.animateIn();
    }
  }

  componentDidUpdate(prevProps) {
    const shouldReset = this.props.type && this.props.type !== prevProps.type;

    const shouldAnimateOnUpdate =
      (this.props.initialValue && this.props.initialValue !== prevProps.initialValue) ||
      (this.props.finalValue && this.props.finalValue !== prevProps.finalValue) ||
      shouldReset;

    if (shouldReset) {
      this.reset(shouldAnimateOnUpdate);
    } else if (this.props.shouldAnimateIn && shouldAnimateOnUpdate) {
      this.animateIn();
    } else if (this.props.shouldAnimateIn && !prevProps.shouldAnimateIn) {
      this.animateIn();
    } else if (this.props.shouldAnimateOut && !prevProps.shouldAnimateOut) {
      this.animateOut();
    }
  }

  reset(shouldAnimateIn) {
    this.setState(
      {
        animatedValue: new Animated.Value(0),
      },
      () => {
        if (shouldAnimateIn) {
          this.animateIn();
        }
      },
    );
  }

  animateIn() {
    const useNativeDriver = utils.isTransform(this.props.type) || this.props.type === 'opacity';

    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: this.props.duration,
      easing: this.props.easing,
      useNativeDriver,
      delay: this.props.delay,
    }).start(() => {
      if (this.props.animateInCallBack) {
        this.props.animateInCallBack();
      } else if (this.props.animateInCallback) {
        this.props.animateInCallback();
      }

      if (this.props.shouldRepeat) {
        if (this.props.shouldLoop) {
          this.state.animatedValue.setValue(0);
          this.animateIn();
        } else {
          this.animateOut();
        }
      }
    });
  }

  animateOut() {
    const useNativeDriver = utils.isTransform(this.props.type) || this.props.type === 'opacity';

    Animated.timing(this.state.animatedValue, {
      toValue: 0,
      duration: this.props.duration,
      easing: this.props.easing,
      useNativeDriver,
      delay: this.props.delay,
    }).start(() => {
      if (this.props.animateOutCallBack) {
        this.props.animateOutCallBack();
      } else if (this.props.animateOutCallback) {
        this.props.animateOutCallback();
      }

      if (this.props.shouldRepeat) {
        this.animateIn();
      }
    });
  }

  render() {
    // Append deg to rotate animations
    const initialValue =
      this.props.type === 'rotate' ? `${this.props.initialValue}deg` : this.props.initialValue;
    const finalValue =
      this.props.type === 'rotate' ? `${this.props.finalValue}deg` : this.props.finalValue;

    const animatedTypeStyle = {};
    animatedTypeStyle[this.props.type] = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [initialValue, finalValue],
    });

    let animatedStyles;

    // If the type of animation is a transform, push the animatedTypeStyle to an array of 'transform'
    if (utils.isTransform(this.props.type)) {
      animatedStyles = {
        transform: [animatedTypeStyle],
      };
    } else {
      animatedStyles = animatedTypeStyle;
    }

    return (
      <Animated.View style={[this.props.style, animatedStyles]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
