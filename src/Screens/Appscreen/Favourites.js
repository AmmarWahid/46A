import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  FlatList,Platform 
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import back from '../../Assets/back.png';
import Search from '../../Assets/Search.png';
import like from '../../Assets/like.png';
import {SafeAreaView} from 'react-native-safe-area-context';
import favrt from '../../Assets/heart1.png';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';
import {useGetfavdataQuery, useUpdatefavdataMutation} from '../../Store/Main';
import {dataName} from '../../Data/name';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import MsgModal from '../../Common/Loader';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
const Favourites = ({navigation}) => {
  const id = useSelector(state => state.Slice.id);
  const [search, setSearch] = React.useState('');
  const {data: imagedata} = useGetfavdataQuery();

  const cleanedData = imagedata?.favourites.map(i =>
    i.substring(0, i.length - 1),
  );

  // console.log(
  //   cleanedData,
  //   '================.................////////////////imagedata',
  // );
  const matchedItems = cleanedData.reduce((acc, item) => {
    // Find the matching name in dataName
    const key = parseInt(item);
    const matchingName = dataName[0][key];

    // If a matching name is found, add it to the accumulator with the key
    if (matchingName) {
      acc.push({key, name: matchingName[0].name});
    }

    return acc;
  }, []);

  console.log(matchedItems);
  const filter = matchedItems.filter(i =>
    i.name?.toLowerCase().includes(search?.toLowerCase()),
  );
  console.log('filter', filter);
  const [handlefav, {data: Data, isLoading}] = useUpdatefavdataMutation();
  const handlefavrt = async item => {
    console.log('first', item);
    try {
      const res = await handlefav(item);
      console.log(res, '=....................................res');
    } catch (error) {
      console.log('error==>>>>>>>>', error);
    }
  };

  // useEffect(() => {
  //   AvoidSoftInput.setShouldMimicIOSBehavior(true);
  //   AvoidSoftInput.setEnabled(true);
  // }, []);
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{flex: 1, backgroundColor: '#F6F5F0'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} />
      {isLoading ? (
        <MsgModal color={'#000'} msg={'Aww you are removing'} />
      ) : null}
      <View
        style={{
          height: responsiveHeight(10),
          marginTop: Platform.OS ==="ios"? responsiveHeight(2):0,
          zIndex: 9999,
        }}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Favourites</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{height: responsiveHeight(10)}}>
        <View style={styles.Search_contain}>
          <TextInput
            placeholder="Search for favourites"
            placeholderTextColor={'#000'}
            value={search}
            onChangeText={txt => setSearch(txt)}
          />
          <TouchableOpacity style={styles.search_icon}>
            <Image resizeMode="contain" source={Search} style={styles.icons} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 1, marginBottom: responsiveHeight(6)}}>
        <FlatList
          data={filter}
          style={{top: responsiveHeight(1)}}
          renderItem={({item, index}) => {
            return (
              <View style={{flex: 1}}>
                <View style={styles.data_content}>
                  <View style={{gap: responsiveHeight(2)}}>
                    <Text style={styles.heading}>{item.name}</Text>
                    <Text style={styles.txt}>By Catullus</Text>
                  </View>
                  <View style={styles.fav}>
                    <TouchableOpacity
                      onPress={() => {
                        handlefavrt(item.key);
                      }}>
                      <Image
                        source={favrt}
                        resizeMode="contain"
                        style={styles.icons}
                      />
                    </TouchableOpacity>
                    <Text
                      onPress={() =>
                        navigation.dispatch({
                          ...CommonActions.navigate({
                            name: 'FavRead',
                            params: {
                              item: item.key,
                            },
                          }),
                        })
                      }
                      style={{
                        color: '#D86E06',
                        fontSize: responsiveFontSize(2),
                        textDecorationLine: 'underline',
                        fontWeight: 'bold',
                        top: responsiveHeight(2),
                      }}>
                      Read...
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favourites;

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
  Search_contain: {
    height: responsiveWidth(18),
    width: Dimensions.get('window').width - 60,
    borderRadius: responsiveWidth(4),
    borderWidth: responsiveWidth(0.3),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(2),
  },
  search_icon: {
    backgroundColor: '#FFB424',
    height: responsiveWidth(16),
    width: responsiveWidth(16),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  data_content: {
    height: responsiveHeight(15),
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#ffff',
    marginVertical: responsiveWidth(2),
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(4),
  },
  heading: {
    fontSize: responsiveFontSize(1.6),
    fontFamily: 'Taviraj-Bold',
    color: '#000',
    width: responsiveWidth(60),
  },
  txt: {fontFamily: 'Taviraj-Regular', color: 'gray'},
  fav: {gap: 10, alignItems: 'center'},
  icons: {
    height: responsiveWidth(6),
    width: responsiveWidth(6),
  },
});
