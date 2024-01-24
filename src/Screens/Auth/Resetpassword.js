import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import logo from '../../Assets/loginlogo.png';
import back from '../../Assets/back.png';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const ResetPassword = () => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState({
    password: '',
    resetPasswordVerificationCode: '',
  });
  return (
    <ImageBackground
      source={logo}
      style={{
        flex: 1,
      }}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Image resizeMode="contain" source={back} style={styles.back} />
        </TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={{flex: 0.6}}>
        <View>
          <Text style={styles.txt_intro}>Reset Password</Text>
        </View>

        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            width: responsiveWidth(80),
            fontSize: responsiveFontSize(1.7),
            alignSelf: 'center',
            fontFamily: 'Taviraj-Light',
          }}>
          Please Check Your email and enter the valid OTP Code
        </Text>

        <View
          style={{
            gap: 20,
            alignSelf: 'center',
            marginTop: responsiveHeight(5),
          }}>
          <View style={styles.txt_input}>
            <TextInput
              placeholder="OTP"
              style={{color: '#000'}}
              placeholderTextColor={'#000'}
              value={value.resetPasswordVerificationCode}
              onChangeText={pre =>
                setValue(txt => ({...txt, resetPasswordVerificationCode: pre}))
              }
            />
          </View>
          <View style={styles.txt_input}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor={'#000'}
              style={{color: '#000'}}
              value={value.password}
              onChangeText={pre => setValue(txt => ({...txt, password: pre}))}
            />
          </View>
        </View>

        <TouchableOpacity>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FFB424', '#D86E06']}
            style={styles.linearGradient}>
            <Text style={[styles.btnText]}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  txt_intro: {
    color: '#000',
    fontFamily: 'Taviraj-Regular',
    textAlign: 'center',
    fontSize: responsiveFontSize(4.5),
  },

  linearGradient: {
    height: responsiveHeight(7),
    width: responsiveWidth(85),
    borderRadius: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(4),
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(4),
    flex: 0.4,
  },
  txt_input: {
    height: responsiveHeight(8),
    width: responsiveWidth(85),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#000',
    borderRadius: responsiveWidth(30),
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  back: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
    top: responsiveHeight(4),
  },
});
