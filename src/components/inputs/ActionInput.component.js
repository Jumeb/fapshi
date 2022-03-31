import React, {useEffect, useState} from 'react';
import {Animated, TextInput, View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './ActionInput.style';
import theme from '../../utils/theme';

const SquareInput = props => {
  const {
    title,
    holder,
    type,
    capitalize,
    secure,
    value,
    toggleError,
    setValue,
    error,
    errorMessage,
    autoFocus,
    icon,
    maxLength,
  } = props;

  const [animateTitle] = useState(new Animated.Value(0));
  const [animateError] = useState(new Animated.Value(0));
  const [secureText, setSecureText] = useState(false);

  useEffect(() => {
    if (value.length >= 1) {
      Animated.timing(animateTitle, {
        toValue: -21,
        duration: 270,
        useNativeDriver: true,
      }).start();
    }
    if (value.length < 1) {
      Animated.timing(animateTitle, {
        toValue: 25,
        duration: 270,
        useNativeDriver: true,
      }).start();
    }
    if (!error) {
      Animated.timing(animateError, {
        toValue: 21,
        duration: 270,
        useNativeDriver: true,
      }).start();
    }
  }, [value, error]);

  useEffect(() => {
    setSecureText(secure);
  }, []);

  const animatedTitle = {
    transform: [{translateY: animateTitle}],
  };

  const animatedError = {
    transform: [{translateY: animateError}],
    marginBottom: 10,
  };

  return (
    <View style={styles.mainContainer}>
      <Animated.Text style={[styles.titleText, animatedTitle]}>
        {title}
      </Animated.Text>
      <View style={[styles.inputContainer, error && styles.borderError]}>
        <Icons name={icon} size={16} color={theme.DARK_GREY} />
        <TextInput
          placeholder={holder}
          keyboardType={type}
          autoFocus={autoFocus}
          maxLength={maxLength}
          autoCapitalize={capitalize}
          secureTextEntry={secureText}
          style={styles.inputText}
          value={value}
          onFocus={() => toggleError()}
          onChangeText={text => setValue(text)}
          placeholderTextColor={theme.LIGHT_GREY}
        />
        {secure && (
          <TouchableOpacity
            onPress={() => setSecureText(!secureText)}
            style={styles.secureText}>
            <Icons
              name={secureText ? 'ios-eye-off' : 'ios-eye'}
              color={theme.DARK_GREY}
              size={16}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* <Animated.Text style={[styles.errorText, animatedError]}>
        {errorMessage}
      </Animated.Text> */}
    </View>
  );
};

export default SquareInput;
