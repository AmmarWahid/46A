import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import logo from '../../Assets/splash.png';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
const Intro = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(0);
  const btn = useCallback(n => {
    setSelected(n);
  }, []);
  return (
    <ImageBackground
      source={logo}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />

      <View style={{marginTop: responsiveHeight(45)}}>
        <Text style={styles.txt_intro}>
          Discover the beauty of Catullus' poetry at your fingertips.
        </Text>
      </View>
      <View style={styles.btn_contain}>
        <TouchableOpacity
          onPress={() => {
            btn(0);
            navigation.navigate('login');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={selected == 0 ? ['#FFB424', '#D86E06'] : ['#fff', '#ffff']}
            style={styles.linearGradient}>
            <Text
              style={[
                styles.buttonText,
                {color: selected == 0 ? '#fff' : '#000'},
              ]}>
              Sign In
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            btn(1);
            navigation.navigate('signup');
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={selected == 1 ? ['#FFB424', '#D86E06'] : ['#fff', '#ffff']}
            style={styles.linearGradient}>
            <Text
              style={[
                styles.buttonText,
                {color: selected == 1 ? '#fff' : '#000'},
              ]}>
              Sign Up
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Intro;

const styles = StyleSheet.create({
  txt_intro: {
    color: '#000',
    fontFamily: 'Taviraj-Regular',
    width: responsiveWidth(80),
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
  },
  btn_contain: {
    flexDirection: 'row',
    marginTop: responsiveHeight(8),
    gap: responsiveWidth(6),
  },
  linearGradient: {
    height: responsiveHeight(7),
    width: responsiveWidth(38),
    borderRadius: responsiveHeight(3.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});
