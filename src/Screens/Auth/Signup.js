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
import logo from '../../Assets/signup.png';
import back from '../../Assets/back.png';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('login');
          }}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.66}}>
        <View>
          <Text style={styles.txt_intro}>Sign Up</Text>
        </View>
        <View
          style={{
            gap: 10,
            alignSelf: 'center',
            marginTop: responsiveHeight(3),
          }}>
          <View style={styles.txt_input}>
            <TextInput placeholder="User Name" placeholderTextColor={'#000'} />
          </View>
          <View style={styles.txt_input}>
            <TextInput placeholder="Your Email" placeholderTextColor={'#000'} />
          </View>
          <View style={styles.txt_input}>
            <TextInput placeholder="Password" placeholderTextColor={'#000'} />
          </View>
          <View style={styles.txt_input}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={'#000'}
            />
          </View>
        </View>
        <TouchableOpacity>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={selected == 0 ? ['#FFB424', '#D86E06'] : ['#fff', '#ffff']}
            style={styles.linearGradient}>
            <Text style={[styles.btnText]}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  txt_intro: {
    color: '#000',
    fontFamily: 'Taviraj-Regular',

    textAlign: 'center',
    fontSize: responsiveFontSize(4),
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
    flex: 0.34,
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
