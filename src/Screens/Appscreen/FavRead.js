import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,Platform 
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import back from '../../Assets/back.png';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {data} from '../../Data/images';
import Pinchable from 'react-native-pinchable';
import FastImage from 'react-native-fast-image';
import logo from '../../Assets/story.jpg';

const FavRead = ({navigation, route}) => {
  const {item} = route.params;
  const imagesForChapter = data[0][item];
  console.log(item);
  return (
    <ImageBackground style={{flex: 1}} source={logo}>
      <SafeAreaView
        edges={['bottom']}
        style={{
          flex: 1,
          // backgroundColor: '#D86E06',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <StatusBar
          translucent={true}
          barStyle={'light-content'}
          backgroundColor={'transparent'}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{bottom: responsiveHeight(1), right: responsiveWidth(40),marginTop:Platform.OS =='ios'?responsiveHeight(2):0}}>
          <Image
            source={back}
            resizeMode={'contain'}
            style={{height: responsiveWidth(8)}}
          />
        </TouchableOpacity>

        <Text style={{color: 'gray', fontFamily: 'Taviraj-Regular'}}>
          Zoom with the help of Fingers
        </Text>
        <View
          style={{
            height: responsiveHeight(80),
            width: responsiveWidth(90),
            borderRadius: responsiveWidth(3),
            backgroundColor: '#fff',
          }}>
          <FlatList
            data={imagesForChapter}
            renderItem={({item, index}) => {
              return (
                <View style={{flex: 1}}>
                  <Pinchable>
                    <FastImage
                      source={item.Image}
                      resizeMode="contain"
                      style={{
                        height: responsiveHeight(50),
                        width: responsiveWidth(90),
                        borderTopLeftRadius: responsiveWidth(10),
                        borderTopRightRadius: responsiveWidth(10),
                        alignSelf: 'center',
                      }}
                    />
                  </Pinchable>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default FavRead;

const styles = StyleSheet.create({});
