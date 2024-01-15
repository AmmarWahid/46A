import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import note from '../../Assets/notification.png';

import {SafeAreaView} from 'react-native-safe-area-context';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Home = ({navigation}) => {
  const icons = [
    {
      img: require('./../../Assets/p1.jpg'),
      img1: require('./../../Assets/p2.jpg'),
    },
  ];

  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: '#F6F5F0'}}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={{flex: 0.17}}>
        <View style={styles.header}>
          <Text style={styles.heading}>Discover Today's Literary Gem!</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Notifications');
            }}>
            <Image source={note} resizeMode="contain" style={styles.icons} />
          </Pressable>
        </View>
      </View>
      <View style={{flex: 0.83, paddingBottom: responsiveHeight(6)}}>
        <FlatList
          data={icons}
          renderItem={({item, index}) => {
            return (
              <View style={{flex: 1}}>
                <View style={{elevation: 20}}>
                  <Image
                    resizeMode="cover"
                    source={item.img}
                    style={{
                      height: responsiveWidth(80),
                      width: responsiveWidth(100),
                      borderTopLeftRadius: responsiveWidth(10),
                      borderTopRightRadius: responsiveWidth(10),
                    }}
                  />
                  <Image
                    // resizeMode="contain"
                    source={item.img1}
                    style={{
                      height: responsiveHeight(80),
                      width: responsiveWidth(100),
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(6),
    flex: 1,
    alignItems: 'center',
    paddingTop: responsiveHeight(2),
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

  heading: {
    fontSize: responsiveFontSize(3),
    fontFamily: 'Taviraj-Bold',
    color: '#D86E06',
    width: responsiveWidth(70),
  },
  txt: {fontFamily: 'Taviraj-Regular', color: 'gray'},
  fav: {gap: 10, alignItems: 'center'},
  icons: {
    height: responsiveWidth(8),
    width: responsiveWidth(8),
    bottom: responsiveHeight(2),
  },
});
