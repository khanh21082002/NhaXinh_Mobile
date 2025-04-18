import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../../utils/Colors";
import  FontAwesome5  from "react-native-vector-icons/FontAwesome5";
//PropTypes check
import PropTypes from "prop-types";
import { AppColors } from "../../../styles";

export const EditButton = ({ navigation, user }) => {
  return (
    <View style={styles.editButton}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ProfileEdit", { user })}
      >
        <FontAwesome5 name='user-edit' size={20} color={AppColors.primary} />
      </TouchableOpacity>
    </View>
  );
};

EditButton.propTypes = {
  user: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
