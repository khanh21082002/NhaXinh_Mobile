import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppColors } from '../../../styles';

const SearchBar = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    if (selectedCategory?.categoryId !== category.categoryId) {
      setSelectedCategory(category);
      onSelectCategory(category);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.categoryId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryItem,
              selectedCategory?.categoryId === item.categoryId && styles.selectedCategory
            ]}
            onPress={() => handleSelectCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory?.categoryId === item.categoryId && styles.selectedCategoryText
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  categoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: AppColors.primaryLight,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCategory: {
    backgroundColor: AppColors.primary,
  },
  categoryText: {
    color: AppColors.black,
    fontSize: 16,
  },
  selectedCategoryText: {
    color: AppColors.white,
  },
});

export default SearchBar;
