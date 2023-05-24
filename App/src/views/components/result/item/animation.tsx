import React, { useCallback, useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { resultsChanged } from 'util/hasChanged';
import { OlResult } from 'lib/graphql/generated/types';

interface Props {
  result: OlResult;
  children: React.ReactNode;
  style?: ViewStyle;
  followed?: boolean;
}

export const OLResultAnimation: React.FC<Props> = props => {
  const [animation] = React.useState(new Animated.Value(0));
  const [result, setResult] = React.useState(props.result);

  const stopAnimation = useCallback(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [animation]);

  const startAnimation = useCallback(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => stopAnimation(), 5000);
    });
  }, [animation, stopAnimation]);

  useEffect(() => {
    if (resultsChanged(props.result, result)) {
      startAnimation();
    }

    setResult(props.result);
  }, [animation, props.result, result, startAnimation]);

  useEffect(() => {
    if (props.followed) {
      startAnimation();
    }
  }, [props.followed, startAnimation]);

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', 'rgba(255,0,0,.25)'],
  });

  return (
    <Animated.View style={{ backgroundColor, ...props.style }}>
      {props.children}
    </Animated.View>
  );
};
