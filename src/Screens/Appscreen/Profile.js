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
import {useDeleteUserMutation, useGetusersQuery} from '../../Store/Main';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../Store/Slice';
import MsgModal from '../../Common/Loader';
const Profile = () => {
  const id = useSelector(state => state.Slice.id);
  const dispatch = useDispatch();
  const {data, isLoading} = useGetusersQuery(id);
  const [handledlt, {data: Data}] = useDeleteUserMutation();

  const handlelogout = async () => {
    dispatch(logoutUser());
  };

  const handleD = async () => {
    const res=await handledlt(id)
    dispatch(logoutUser());

  };



  console.log(data);
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: '#F6F5F0'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      {isLoading ? <MsgModal loader={true} /> : null}
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
          <Text numberOfLines={1} style={styles.name}>
            {data?.data?.firstname} {data?.data?.lastname}
          </Text>
          <Text numberOfLines={2} style={styles.welcome}>
            {data?.data?.email}
          </Text>
        </View>

        <TouchableOpacity onPress={handlelogout}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#FFB424', '#D86E06']}
            style={styles.linearGradient}>
            <Text style={[styles.btnText]}>Log Out</Text>
          </LinearGradient>
        </TouchableOpacity>


        <TouchableOpacity onPress={handleD}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#FFB424', '#D86E06']}
            style={styles.linearGradient}>
            <Text style={[styles.btnText]}>Delete Account</Text>
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
    fontSize: responsiveFontSize(4),
    textAlign: 'center',
    bottom: responsiveHeight(5),
    width: responsiveWidth(90),

    alignSelf: 'center',
  },
  welcome: {
    fontFamily: 'Taviraj-Regular',
    color: '#000',
    fontSize: responsiveFontSize(2.1),
    textAlign: 'center',
    bottom: responsiveHeight(6),
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
  linearGradient: {
    height: responsiveHeight(7),
    width: responsiveWidth(85),
    borderRadius: responsiveWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    bottom: responsiveHeight(2),
  },
  btnText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    color: '#fff',
  },
});
