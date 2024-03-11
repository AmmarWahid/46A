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
  RefreshControl,
  ActivityIndicator,Platform
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import note from '../../Assets/notification.png';
import PushNotification from 'react-native-push-notification';
import Pinchable from 'react-native-pinchable';
import {SafeAreaView} from 'react-native-safe-area-context';
import favrt from '../../Assets/heart1.png';
import zoom from '../../Assets/zooom.png';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {data} from '../../Data/images';
import {
  useGetfavdataQuery,
  useGetimageidQuery,
  useUpdatefavdataMutation,
} from '../../Store/Main';
import {useSelector} from 'react-redux';
import useToast from '../../Hooks';
import FastImage from 'react-native-fast-image';
import MsgModal from '../../Common/Loader';

const Home = ({navigation, currentImageIndex}) => {
  const [select, setselect] = useState({});
  const [selected, setselected] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [num, setnum] = useState(0);
  const {showToast} = useToast();
  // const icons = [
  //   {
  //     img: require('./../../Assets/p1.jpg'),
  //     img1: require('./../../Assets/p2.jpg'),
  //   },
  // ];
  // console.log(
  //   currentImageIndex,
  //   '==================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
  // );
  // console.log;
  const id = useSelector(state => state.Slice.id);
  console.log(id, 'id');
  const {
    data: daata,
    status,
    isStale,
    isLoading: loader,
    refetch,
  } = useGetimageidQuery(id, {refetchOnMountOrArgChange: true});
  useEffect(() => {
    console.log(daata, status, 'daata');
    setnum(daata);
  }, [daata, status]);
  const onClick = () => {
    refetch();
  };
  useEffect(() => {
    data;
    onClick();
  }, [id, data]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);

  const [handlefav, {data: Data, isLoading}] = useUpdatefavdataMutation();
  const {data: imagedata} = useGetfavdataQuery();

  // console.log('imagedata', imagedata.favourites);
  let cleanedData = imagedata?.favourites?.map(item =>
    item.substring(0, item.length - 1),
  );

  console.log(cleanedData);
  const handlefavrt = async () => {
    try {
      const res = await handlefav(num);
      console.log(res, 'res');
    } catch (error) {
      // console.log('error==>>>>>>>>', error);
    }
  };
  console.log('Data', Data, daata);

  const imagesForChapter = data[0][daata];

  const favouritesImage = cleanedData?.find(item => item.includes(daata));

  // console.log('favouritesimage', favouritesImage, imagesForChapter);
  // console.log(num);
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: '#Ffff'}}>
      <StatusBar
        translucent={true}
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      {loader ? <MsgModal loader={true} /> : null}
      <View style={{flex: 0.18}}>
        <View style={[styles.header]}>
          <Text 
          
          numberOfLines={2}
          style={styles.heading}>Discover Today's Literary Gem!</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Notifications');
            }}>
            <Image source={note} resizeMode="contain" style={styles.icons} />
          </Pressable>
        </View>
      </View>

      <Text
        style={{
          color: 'gray',
          fontFamily: 'Taviraj-Regular',
          textAlign: 'center',
        }}>
        Zoom with the help of Fingers
      </Text>

      <View
        style={{
          flex: 0.6,
          paddingBottom: responsiveHeight(1),
        }}>
        <FlatList
          data={imagesForChapter}
          indicatorStyle="black"
          // initialScrollIndex={true}
          horizontal
          contentContainerStyle={{}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => {
            console.log(
              item,
              'item=====================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
            );
            return (
              <View
                style={{
                  flex: 1,
                  // margin: 0,
                  // padding: 0,
                }}>
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

                  {/* <Image
                    // resizeMode="contain"
                    source={item.img1}
                    style={{
                      height: responsiveHeight(80),
                      width: responsiveWidth(100),
                    }}
                  /> */}
                </Pinchable>
              </View>
            );
          }}
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'orange', fontSize: responsiveFontSize(1.6)}}>
          Add to Favourite
        </Text>
        <TouchableOpacity onPress={handlefavrt}>
          {isLoading ? (
            <ActivityIndicator size={'large'} color={'orange'} />
          ) : (
            <Image
              resizeMode="contain"
              source={favrt}
              style={{
                height: responsiveWidth(10),
                width: responsiveWidth(10),
                tintColor: favouritesImage == undefined ? 'gray' : null,
              }}
            />
          )}
        </TouchableOpacity>
      </View>

      {refreshing == false ? (
        <View
          style={{
            position: 'absolute',
            bottom: responsiveHeight(9),
            alignSelf: 'center',
          }}>
          <Text
            style={{
              color: 'orange',
              fontSize: responsiveFontSize(1),
              top:Platform.OS ==='ios'?0: responsiveHeight(1),
            }}>
            Pull to Refresh
          </Text>
          <Text
            style={{
              color: 'orange',
              fontSize: responsiveFontSize(2),
              textAlign: 'center',
            }}>
            ↻
          </Text>
        </View>
      ) : (
        <></>
      )}
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
    paddingTop:Platform.OS ==='ios'?responsiveHeight(4): responsiveHeight(2),
    backgroundColor: '#F6F5F0',
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
    fontSize: responsiveFontSize(2),
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
