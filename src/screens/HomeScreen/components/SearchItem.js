import React, {useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet , ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import Colors from '../../../utils/Colors';
import CustomText from '../../../components/UI/CustomText';

const SearchItem = ({item, navigation}) => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {item})}
        style={styles.row}>
        <Ionicons
          name="search-outline"
          size={22}
          color={Colors.grey}
          style={styles.icon}
        />
        <Image
          style={styles.image}
          source={
            item.images && item.images.length > 0
              ? {uri: item.images.find(image => image.isPrimary)?.imageUrl}
              : require('../../../assets/images/default-error-image.png')
          }
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color={Colors.grey} />
          </View>
        )}
        <CustomText style={styles.name}>{item.name}</CustomText>
      </TouchableOpacity>
    </View>
  );
};

SearchItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 20,
    marginLeft: 10,
  },
  image: {
    height: 50,
    width: 70,
    resizeMode: 'stretch',
    borderRadius: 10,
    marginRight: 30,
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    flex: 1, // Để text không bị tràn
  },
});

export default SearchItem;
