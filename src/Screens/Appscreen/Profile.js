import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import back from '../../Assets/back.png';
import profile from '../../Assets/profile.png';
import LinearGradient from 'react-native-linear-gradient';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const Profile = () => {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: '#F6F5F0'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      <View
        style={{
          flex: 0.3,
          paddingTop: responsiveHeight(2),
        }}>
        <View style={styles.header}>
          <Text style={styles.buttonText}>Profile</Text>
        </View>
      </View>
      <View>
        <View style={{marginTop: responsiveHeight(4)}}>
          <Image
            source={profile}
            resizeMode="contain"
            style={{
              width: responsiveWidth(80),
              height: responsiveWidth(70),
              alignSelf: 'center',
            }}
          />

          <Text style={styles.welcome}>Welcome Back</Text>
          <Text style={styles.name}>John Smith</Text>
        </View>

        <TouchableOpacity>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#FFB424', '#D86E06']}
            style={styles.linearGradient}>
            <Text style={[styles.btnText]}>Log Out</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(3),
  },
  buttonText: {
    fontSize: responsiveFontSize(2.8),
    fontFamily: 'Taviraj-Bold',
    color: '#000',
  },
  back: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
  },
  name: {
    fontFamily: 'Taviraj-Regular',
    color: '#000',
    fontSize: responsiveFontSize(5),
    textAlign: 'center',
    bottom: responsiveHeight(5),
  },
  welcome: {
    fontFamily: 'Taviraj-Regular',
    color: '#000',
    fontSize: responsiveFontSize(2.3),
    textAlign: 'center',
    bottom: responsiveHeight(5),
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
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: '#fff',
  },
});
