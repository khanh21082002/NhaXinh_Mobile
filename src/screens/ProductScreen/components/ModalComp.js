import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
//import CustomText
import CustomText from '../../../components/UI/CustomText';
//icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//Color
import Colors from '../../../utils/Colors';
//number format
import NumberFormat from '../../../components/UI/NumberFormat';
//PropTypes check
import PropTypes from 'prop-types';

//Redux
import {useDispatch, useSelector} from 'react-redux';
//Action
import {addToCart} from '../../../reducers';

const {width, height} = Dimensions.get('window');

const ModalComp = ({
  item,
  color,
  modalVisible,
  setModalVisible,
  navigation,
}) => {
  const [selectedVariation, setSelectedVariation] = useState(null);
  const dispatch = useDispatch();
  const cartLoading = useSelector(state => state.cart.isLoading);

  const handleVariationSelect = variation => {
    setSelectedVariation(variation);
  };
  
  const moveToCart = async () => {
    const variationId = selectedVariation?.variationId || item.variations?.[0]?.variationId;
  
    if (!variationId) {
      console.warn("Không tìm thấy variationId!");
      return;
    }
  
    await dispatch(addToCart(item.productId, variationId));
    setModalVisible(false);
    navigation.navigate('Cart');
  };

  // Chọn variation mặc định nếu chưa chọn
  const currentVariation = selectedVariation || item.variations?.[0];

  return (
    <Modal
      style={{
        flex: 1,
      }}
      animationType="slide"
      transparent={true}
      visible={modalVisible}>
      <View style={styles.modalContainer}></View>
      <View style={styles.modal}>
        <TouchableOpacity
          animation="zoomIn"
          style={styles.close}
          onPress={() => setModalVisible(false)}>
          <MaterialCommunityIcons name="window-close" size={24} color={color} />
        </TouchableOpacity>

        <View
          style={{width: '90%', flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="check-circle-outline"
            color={color}
            size={20}
          />
          <CustomText style={{...styles.success, color}}>
            Vui lòng lựa chọn loại phù hợp với sản phẩm
          </CustomText>
        </View>
        <View style={styles.modelInfo}>
          <View style={{borderRadius: 20, width: '45%', overflow: 'hidden'}}>
            <Image
              source={
                currentVariation?.imageUrl
                  ? {uri: currentVariation.imageUrl}
                  : require('../../../assets/images/default-error-image.png')
              }
              style={{
                height: 100,
                resizeMode: 'stretch',
              }}
            />
          </View>
          <View style={styles.quantity}>
            <View>
              <CustomText style={{...styles.title, fontSize: 15}}>
                {item.filename}
              </CustomText>
              <CustomText style={{fontSize: 12, color: Colors.grey}}>
                Cung cấp bởi Nhà Xinh
              </CustomText>
            </View>
            <CustomText
              style={{marginTop: 5, fontSize: 14, color: Colors.text}}>
              Thành tiền:
            </CustomText>
            <NumberFormat price={item.price} />
          </View>
        </View>

        {/* Hiển thị các variations */}
        <View style={styles.variationsContainer}>
          {item.variations?.map((variation, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleVariationSelect(variation)}
              style={[
                styles.variationButton,
                selectedVariation === variation && styles.selectedVariation,
              ]}>
              <Image
                source={{uri: variation.imageUrl}}
                style={styles.variationImage}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{height: 55, justifyContent: 'center'}}>
          <TouchableOpacity
            style={[styles.addCart, {backgroundColor: color}]}
            onPress={moveToCart}>
            {cartLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <CustomText style={styles.actionText}>
                Thêm Vào Giỏ Hàng
              </CustomText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

ModalComp.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  actionText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },

  modalContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.7,
    top: 0,
    width: width,
    height: height,
  },
  modal: {
    backgroundColor: '#fff',
    width: '100%',
    bottom: 0,
    position: 'absolute',
    zIndex: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  addCart: {
    width: '75%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    height: 50,
    width: '100%',
  },
  success: {
    marginLeft: 10,
    fontSize: 15,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 20,
  },
  modelInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  quantity: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 15,
  },
  variationsContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'start',
    alignItems: 'center',
  },
  variationButton: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.grey,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  variationImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  selectedVariation: {
    borderColor: Colors.primary, // Highlight the selected variation
  },
});

export default ModalComp;
