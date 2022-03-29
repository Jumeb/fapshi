import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import styles from './Language.styles';
import {languages, search} from '../../utils';
import {setLanguage} from '../../redux/actions/TranslationAction';
import {LanguageCard, NavBar, Text} from '../../components';
import {Storage} from '../../utils';

const Language = props => {
  const {i18n, navigation} = props;
  const [_language, _setLanguage] = useState('');
  const [_languages, setLanguages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    setLanguages(languages);
    Storage.load({key: 'LOCALE'})
      .then(res => {
        _setLanguage(res);
      })
      .catch(err => console.log(err));
  }, []);

  const changeLanguage = _lang => {
    _setLanguage(_lang);
    props.setLanguage(_lang);
  };

  useEffect(() => {
    search(text, languages, setLanguages, 'name');
  }, [text]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <NavBar
        show={true}
        pop={true}
        search={true}
        navigation={navigation}
        screen={'Languages'}
        setText={setText}
      />
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        <Text style={styles.selectTitle}>
          {i18n.t('phrases.selectLanguage')}
        </Text>
        {_languages.map((language, index) => (
          <LanguageCard
            language={language}
            _active={_language}
            key={index}
            onPress={() => changeLanguage(language.key)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = ({i18n}) => {
  return {
    i18n: i18n.i18n,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({setLanguage}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
