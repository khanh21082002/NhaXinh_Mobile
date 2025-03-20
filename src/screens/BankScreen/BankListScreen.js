import React, {useState , useEffect} from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchBanks } from '../../reducers';
import { Header } from "./components";
import { AppColors } from '../../styles';

const BankListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [banks, setBanks] = useState([]);

  useEffect(() => {
      const fetching = async () => {
        try {
          const data = await dispatch(fetchBanks());
          setBanks(data);
        } catch (err) {
          alert(err);
        }
      };
      fetching();
    }, []);
  ;
  const filteredBanks = banks.filter(
    bank =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      bank.shortName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectBank = bank => {
    navigation.navigate('BankAccount', {
      bankName: bank.name,
      bankId: bank.id,
      bankIcon: bank.logo,
    });
  };

  const renderBankItem = ({item}) => (
    <TouchableOpacity
      style={styles.bankItem}
      onPress={() => handleSelectBank(item)}>
      <Image source={{uri: item.logo}} style={styles.bankIcon} />
      <View style={styles.bankInfo}>
        <Text style={styles.bankName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title="Danh sách ngân hàng" />

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <View style={styles.searchIcon}>
            <Icon name="magnify" size={32} color={AppColors.gray} />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Ngân hàng phổ biến"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearText}>Xem tất cả</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredBanks}
        renderItem={renderBankItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.bankList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8e8e8',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 50,
  },
  searchIcon: {
    width: 32,
    height: 32,
    marginRight: 10,
    tintColor: '#888',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearText: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  bankList: {
    paddingHorizontal: 16,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  bankIcon: {
    width: 60,
    height: 60,
    marginRight: 16,
    resizeMode: 'contain',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  bankFullName: {
    fontSize: 14,
    color: '#888',
  },
});

export default BankListScreen;
