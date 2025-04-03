import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';

// Color
import Colors from '../../../utils/Colors';
import HorizontalItem from './HorizontalItem';
import CustomText from '../../../components/UI/CustomText';
import {Header} from './Header';
import {AppColors} from '../../../styles';
import ModalComp from './ModalComp';

// PropTypes check
import PropTypes from 'prop-types';

export const ProductBody = ({
  user,
  navigation,
  productsFilter,
  searchFilterFunction,
  setMessage,
  setShowSnackbar,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [color, setColor] = useState(AppColors.primary);
  // Current active filters
  const [activeFilters, setActiveFilters] = useState({
    price: "Tất cả",
    material: "Tất cả"
  });
  // Flatten productsFilter for FlatList usage
  const DATA = productsFilter || [];

  useEffect(() => {
    const checkColor = async () => {
      if (selectedItem && selectedItem.color) {
        const getColor = await colorCheck(selectedItem.color);
        setColor(getColor);
      }
    };
    checkColor();
  }, [selectedItem]);

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

  // Apply both text search and filters
  const applyFilters = (filterValues) => {
    setActiveFilters(filterValues);
    
    // First apply text search
    let filteredProducts = searchQuery 
      ? productsFilter.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : productsFilter;
    
    // Then apply material filter if not "All"
    if (filterValues.material !== "Tất cả") {
      filteredProducts = filteredProducts.filter(product => 
        product.material === filterValues.material
      );
    }
    
    // Apply price sorting
    if (filterValues.price === "Theo giá: Thấp đến cao") {
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (filterValues.price === "Theo giá: Cao đến thấp") {
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }
    
    // Update products through the parent function
    searchFilterFunction(searchQuery, filteredProducts);
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      price: "Tất cả",
      material: "Tất cả"
    });
    
    // Reset to just the text search
    searchFilterFunction(searchQuery);
  };

  // Handle search text changes
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    
    // Apply search with current filters
    searchFilterFunction(text, null, activeFilters);
  };

  return (
    <View style={styles.container}>
      <Header 
        navigation={navigation} 
        applyFilters={applyFilters}
        clearFilters={clearFilters}
        currentFilters={activeFilters}
      />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>

      {DATA.length === 0 ? (
        <CustomText style={{textAlign: 'center', marginTop: 110}}>
          Không tìm thấy sản phẩm
        </CustomText>
      ) : (
        <FlatList
          data={DATA}
          keyExtractor={(item, index) =>
            item?._id ? item._id.toString() : `item-${index}`
          }
          renderItem={({item}) => (
            <View style={styles.itemWrapper}>
              <HorizontalItem
                item={item}
                user={user}
                navigation={navigation}
                setModalVisible={() => handleOpenModal(item)}
                setMessage={setMessage}
                setShowSnackbar={setShowSnackbar}
              />
            </View>
          )}
          numColumns={2} // This will make the list display in two columns
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      )}

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

ProductBody.propTypes = {
  navigation: PropTypes.object.isRequired,
  productsFilter: PropTypes.array.isRequired,
  searchFilterFunction: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.black,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  searchInput: {
    height: 50,
    backgroundColor: Colors.light_grey,
    borderRadius: 20,
    paddingLeft: 15,
    fontSize: 16,
  },
  itemWrapper: {
    flex: 1,
    marginHorizontal: 5, // Adjusts spacing between items
  },
  itemSeparator: {
    height: 10, // Adds spacing between rows
  },
});

export default ProductBody;