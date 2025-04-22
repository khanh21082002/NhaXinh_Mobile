import React, { useState, useRef } from "react";
import {
  View,
  Animated,
  Platform,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList
} from "react-native";
//Animatable
import * as Animatable from "react-native-animatable";
import ShareItem from "../../../components/UI/ShareItem";
//import CustomText
import CustomText from "../../../components/UI/CustomText";
//Color
import Colors from "../../../utils/Colors";
import { AppColors } from "../../../styles";

const { height, width } = Dimensions.get("window");

const HEADER_MAX_HEIGHT = 320;
const HEADER_MIN_HEIGHT =
  Platform.OS === "android" ? 70 : height > 667 ? 80 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export const Header = ({ navigation, scrollY, item }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  
  // Use all images from the item
  const images = React.useMemo(() => {
    if (!item.images || item.images.length === 0) {
      return [{ imageUrl: null, isPrimary: true }]; // Default image will be shown
    }
    return item.images;
  }, [item.images]);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: "clamp",
  });
  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });
  
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  // Function to manually navigate to specific image
  const goToImage = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index: index });
    }
  };

  const renderImage = ({ item: imageItem, index }) => {
    return (
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={() => {
          // On press, move to next image or back to first if at end
          const nextIndex = (index + 1) % images.length;
          goToImage(nextIndex);
        }}
        style={[styles.imageContainer, { width }]}
      >
        <Image
          source={
            imageItem.imageUrl
              ? { uri: imageItem.imageUrl }
              : require('../../../assets/images/default-error-image.png')
          }
          style={styles.image}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      </TouchableOpacity>
    );
  };

  // Function to render pagination dots that are clickable
  const renderPaginationDots = () => {
    return (
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity 
            key={`dot-${index}`}
            onPress={() => goToImage(index)}
          >
            <View
              style={[
                styles.paginationDot,
                activeIndex === index ? styles.paginationDotActive : {}
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Animatable.View delay={500} animation="fadeInDown">
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.goBackIcon}
        >
          <Image
            source={require('../../../assets/images/icons/arrow_back.png')}
            style={{ width: 35, height: 35 }}
            borderRadius={8}
            backgroundColor={AppColors.primaryLight}
          />
        </TouchableOpacity>
        <Animated.View style={{ opacity: headerOpacity }}>
          <CustomText
            style={{ fontSize: 16, color: "#fff", fontWeight: "500" }}
          >
            {item.name}
          </CustomText>
        </Animated.View>
        <View style={styles.shareIcon}>
          <ShareItem
            imageURL={images[0]?.imageUrl || ''}
            title={item.title || item.name} // Use name as fallback if title is missing
            message={item.title || item.name}
          />
        </View>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: AppColors.primary,
          overflow: "hidden",
          opacity: headerOpacity,
          height: HEADER_MAX_HEIGHT,
          transform: [{ translateY: headerTranslate }],
        }}
      ></Animated.View>
      
      {/* Swipeable Image Carousel */}
      <Animated.View
        style={[
          styles.carouselContainer,
          {
            opacity: imageOpacity,
            transform: [{ translateY: headerTranslate }],
          },
        ]}
        pointerEvents="box-none"
      >
        <FlatList
          ref={flatListRef}
          data={images}
          renderItem={renderImage}
          keyExtractor={(item, index) => `image-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          scrollEventThrottle={16}
          initialNumToRender={1}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          decelerationRate="fast"
          snapToInterval={width}
          snapToAlignment="center"
          directionalLockEnabled={true} // Only scroll horizontally
        />
        
        {/* Pagination Dots - only show if more than 1 image */}
        {images.length > 1 && renderPaginationDots()}
        
        {/* Add previous/next buttons for easier navigation */}
        {images.length > 1 && (
          <>
            <TouchableOpacity
              style={[styles.navButton, styles.prevButton]}
              onPress={() => {
                const prevIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
                goToImage(prevIndex);
              }}
            >
              <CustomText style={styles.navButtonText}>‹</CustomText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={() => {
                const nextIndex = (activeIndex + 1) % images.length;
                goToImage(nextIndex);
              }}
            >
              <CustomText style={styles.navButtonText}>›</CustomText>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
      
      {isLoading && (
        <View style={[styles.loaderContainer, { height: HEADER_MAX_HEIGHT }]}>
          <ActivityIndicator size="large" color={Colors.grey} />
        </View>
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    paddingTop: Platform.OS === "android" ? 15 : 25,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    height: HEADER_MIN_HEIGHT,
    zIndex: 1000,
  },
  goBackIcon: {
    width: 40,
  },
  shareIcon: {
    width: 40,
    alignItems: "flex-end",
  },
  carouselContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    overflow: "hidden",
  },
  imageContainer: {
    height: HEADER_MAX_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  paginationDotActive: {
    backgroundColor: "#fff",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  model3DButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 100,
  },
  model3DButtonInner: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  model3DButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    zIndex: 10,
  },
  prevButton: {
    left: 10,    
  },
  nextButton: {
    right: 10,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -5,
  }
});