import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import CustomText from '../../../components/UI/CustomText';
import PropTypes from 'prop-types';
import {AppColors} from '../../../styles';
import ModalComp from './ModalComp';
import ProductItem from './ProductItem';

const CategorySection = ({data, name, navigation , setShowSnackbar , setMessage , user}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // To track the selected item for the modal
  const [color, setColor] = useState(AppColors.primary);

  const categorizedData = data.reduce((acc, item) => {
    if (!acc[item.categoryName]) {
      acc[item.categoryName] = [];
    }
    acc[item.categoryName].push(item);
    return acc;
  }, {});

  // Get items for the specific category
  const getItems = () => {
    return categorizedData[name] || [];
  };

  useEffect(() => {
    const checkColor = async () => {
      const getColor = await colorCheck(item.color);
      setColor(getColor);
    };
    checkColor();
  }, [data]);
  // Handle opening the modal
  const handleOpenModal = item => {
    setSelectedItem(item); // Set the selected item
    setModalVisible(true); // Open the modal
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setModalVisible(false); // Close the modal
    setSelectedItem(null); // Reset selected item
  };

  return (
    <View style={styles.category}>
      <View style={styles.header}>
        <CustomText style={styles.title}>{name}</CustomText>
        <TouchableOpacity onPress={() => navigation.navigate('Product')}>
          <CustomText style={styles.viewAll}>Xem thêm {'>>'}</CustomText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={getItems()}
        keyExtractor={(item, index) =>
          item._id ? item._id.toString() : index.toString()
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <View>
            <ProductItem
              user={user}
              item={item}
              navigation={navigation}
              setModalVisible={() => handleOpenModal(item)}
              setMessage={setMessage}
              setShowSnackbar={setShowSnackbar}
            />
          </View>
        )}
      />

      {/* Modal is rendered only once, and is conditionally visible */}
      {selectedItem && (
        <ModalComp
          item={selectedItem}
          color={color}
          modalVisible={modalVisible}
          setModalVisible={handleCloseModal}
          navigation={navigation}
        />
      )}
    </View>
  );
};

CategorySection.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  category: {
    paddingVertical: 15,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: AppColors.primary,
    fontWeight: 'bold',
  },
  viewAll: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: '500',
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default CategorySection;
