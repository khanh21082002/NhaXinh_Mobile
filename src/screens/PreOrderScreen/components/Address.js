import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import CustomText from '../../../components/UI/CustomText';
import Colors from '../../../utils/Colors';

const {width} = Dimensions.get('window');

const Address = ({getInfo}) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const [loading, setLoading] = useState(true);

  // Gọi API lấy danh sách tỉnh/thành phố khi component được mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          'https://provinces.open-api.vn/api/?depth=3',
        );
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Lỗi khi tải danh sách tỉnh/thành phố:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  // Khi chọn tỉnh/thành phố -> Lọc danh sách quận/huyện
  const handleSelectProvince = provinceCode => {
    const province = provinces.find(p => p.code === provinceCode);
    if (province) {
      setDistricts(province.districts);
      setWards([]); // Reset danh sách xã/phường
      setSelectedProvince(province.name);
      setSelectedDistrict('');
      setSelectedWard('');
    }
  };

  // Khi chọn quận/huyện -> Lọc danh sách xã/phường
  const handleSelectDistrict = districtCode => {
    const district = districts.find(d => d.code === districtCode);
    if (district) {
      setWards(district.wards);
      setSelectedDistrict(district.name);
      setSelectedWard('');
    }
  };

  // Khi chọn xã/phường
  const handleSelectWard = wardCode => {
    const ward = wards.find(w => w.code === wardCode);
    if (ward) {
      setSelectedWard(ward.name);
    }
  };

  

  // Cập nhật địa chỉ lên `getInfo`
  useEffect(() => {
    getInfo(selectedProvince, selectedDistrict, selectedWard);
  }, [selectedProvince, selectedDistrict, selectedWard]);

  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Địa chỉ nhận hàng</CustomText>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : null}

      {/* Chọn tỉnh/thành phố */}
      <View style={[styles.boxSelect]}>
        <RNPickerSelect
          onValueChange={value => handleSelectProvince(value)}
          placeholder={{label: 'Chọn Tỉnh/Thành phố', value: null}}
          items={provinces.map(p => ({label: p.name, value: p.code}))}
          value={
            selectedProvince
              ? provinces.find(p => p.name === selectedProvince)?.code
              : null
          }
          style={pickerSelectStyles}
        />
        {Platform.OS === 'ios' && (
          <Icon style={styles.icon} name="keyboard-arrow-down" size={25} />
        )}
      </View>

      {/* Chọn quận/huyện */}
      <View style={styles.boxSelect}>
        <RNPickerSelect
          onValueChange={value => handleSelectDistrict(value)}
          placeholder={{label: 'Chọn Quận/Huyện', value: null}}
          items={districts.map(d => ({label: d.name, value: d.code}))}
          value={
            selectedDistrict
              ? districts.find(d => d.name === selectedDistrict)?.code
              : null
          }
          style={pickerSelectStyles}
        />
        {Platform.OS === 'ios' && (
          <Icon style={styles.icon} name="keyboard-arrow-down" size={25} />
        )}
      </View>

      {/* Chọn xã/phường */}
      <View style={styles.boxSelect}>
        <RNPickerSelect
          onValueChange={value => handleSelectWard(value)}
          placeholder={{label: 'Chọn Xã/Phường', value: null}}
          items={wards.map(w => ({label: w.name, value: w.code}))}
          value={
            selectedWard ? wards.find(w => w.name === selectedWard)?.code : null
          }
          style={pickerSelectStyles}
        />
        {Platform.OS === 'ios' && (
          <Icon style={styles.icon} name="keyboard-arrow-down" size={25} />
        )}
      </View>
    </View>
  );
};

Address.propTypes = {
  getInfo: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  boxSelect: {
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 60,
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    right: 10,
  },
  title: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    color: 'black',   
    width: width - 30,
  },
  inputAndroid: {
    fontSize: 15,
    color: 'black',
    
  },
});

export default Address;
