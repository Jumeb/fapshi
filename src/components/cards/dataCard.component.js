import React from 'react';
import {View, TextInput} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';

import styles from './cards.styles';
import {Text} from '..';
import theme from '../../utils/theme';

const DataCard = props => {
  const {value, setValue, type, capitalize, secureText, holder, edit} = props;
  return (
    <View style={styles.dataCardContainer}>
      <Text style={styles.fieldText}>{holder}</Text>
      <View style={[styles.fieldContainer, edit && styles.editFieldValue]}>
        <TextInput
          showSoftInputOnFocus={edit}
          placeholder={holder}
          keyboardType={type}
          autoCapitalize={capitalize}
          secureTextEntry={secureText}
          style={[styles.fieldValue]}
          value={value}
          onChangeText={text => setValue(text)}
          placeholderTextColor={theme.DARK_GREY}
        />
        {/* {edit && (
          <Icons name="ios-brush" size={14} color={theme.PRIMARY_COLOR} />
        )} */}
      </View>
    </View>
  );
};

export default DataCard;
