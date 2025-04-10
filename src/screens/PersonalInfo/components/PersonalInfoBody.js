import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, ActivityIndicator , Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EditInfo as EditInfoAction } from '../../../reducers';
import { FormInput } from './FormInput';
import { AppColors } from '../../../styles';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';

export const PersonalInfoBody = ({ user }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        phone: user.phone,
        address: user.address,
    });

    const handleChange = (key, value) => {
        setFormData(prevState => ({ ...prevState, [key]: value }));
    };

    const handleSave = async (formData) => {
        try {
            setLoading(true);
            await dispatch(EditInfoAction(formData.firstname, formData.lastname, formData.phone, formData.address));
            setIsEditing(false);
            setFormData({ ...formData });
            // Show success alert
            Alert.alert(
                "Thông báo",
                "Bạn đã cập nhật thành công thông tin cá nhân.",
                [{ text: "OK" ,  onPress: () => navigation.navigate('HomeTab') }],
                { cancelable: false }
            );
        } catch (err) {
            setIsEditing(false);
            alert(err);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/images/icons/arrow_back.png')}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Thông tin cá nhân</Text>
                    <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                        <Icon name={isEditing ? "save" : "edit"} size={24} color={AppColors.primary} />
                    </TouchableOpacity>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <FormInput label="Email" value={formData.email} editable={false} />

                    <View style={styles.rowContainer}>
                        <View style={styles.flex1}>
                            <FormInput label="Họ" value={formData.firstname} editable={isEditing} onChangeValue={(text) => handleChange("firstname", text)} />
                        </View>
                        <View style={styles.flex1}>
                            <FormInput label="Tên" value={formData.lastname} editable={isEditing} onChangeValue={(text) => handleChange("lastname", text)} />
                        </View>
                    </View>

                    <FormInput label="Số điện thoại" value={formData.phone} editable={isEditing} onChangeValue={(number) => handleChange("phone", number)} keyboardType="numeric"/>
                    <FormInput label="Tỉnh/Thành phố" value={formData.address} iconName="arrow-drop-down" isCity editable={isEditing} onChangeValue={(text) => handleChange("address", text)} />
                </View>
                {isEditing && (
                    <TouchableOpacity style={styles.saveButton} onPress={() => handleSave(formData)} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Lưu</Text>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '500',
    },
    backIcon: {
        width: 35,
        height: 35,
        borderRadius: 8,
        backgroundColor: AppColors.primaryLight,
    },
    form: {
        gap: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    flex1: {
        flex: 1,
    },
    saveButton: {
        backgroundColor: AppColors.primary,
        borderRadius: 25,
        padding: 14,
        alignItems: 'center',
        marginTop: 'auto',
    },
    saveButtonText: {
        color: AppColors.white,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default PersonalInfoBody;
