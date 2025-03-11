import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from './components';
import { AppColors } from '../../styles';

export const TermsOfUseScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header */}
     <Header  navigation={navigation}/>
      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.welcomeText}>
          Chào mừng bạn đến với Nội Thất Nhà Xinh! Ứng dụng 
          này được phát triển nhằm giúp bạn tiếp cận dễ dàng 
          với các sản phẩm nội thất đa dạng, chất lượng cao. 
          Việc sử dụng ứng dụng đồng nghĩa với việc bạn đồng ý 
          tuân thủ các điều khoản dưới đây:
        </Text>

        <Text style={styles.sectionTitle}>1. Chấp nhận điều khoản</Text>
        <Text style={styles.subItem}>
          1.1 Khi sử dụng ứng dụng, bạn xác nhận rằng mình đã 
          đọc, hiểu và đồng ý với các điều khoản sử dụng.
        </Text>
        <Text style={styles.subItem}>
          1.2 Nếu bạn không đồng ý với bất kỳ điều khoản nào, 
          vui lòng ngừng sử dụng ứng dụng ngay lập tức.
        </Text>
        <Text style={styles.subItem}>
          1.3 Các điều khoản này áp dụng cho mọi người dùng, 
          bao gồm cả khách hàng và nhà cung cấp có liên kết với 
          ứng dụng.
        </Text>

        <Text style={styles.sectionTitle}>2. Tài khoản sử dụng</Text>
        <Text style={styles.subSection}>2.1 Thông tin đăng ký:</Text>
        <Text style={styles.bulletItem}>
          • Người dùng cần cung cấp thông tin chính xác, đầy 
          đủ khi đăng ký tài khoản (bao gồm họ tên, số điện 
          thoại, địa chỉ email, và các thông tin cần thiết khác).
        </Text>
        <Text style={styles.bulletItem}>
          • Việc cung cấp thông tin không chính xác hoặc 
          không đầy đủ có thể dẫn đến việc hạn chế hoặc từ 
          chối dịch vụ.
        </Text>

        <Text style={styles.subSection}>2.2 Bảo mật tài khoản:</Text>
        <Text style={styles.bulletItem}>
          • Bạn chịu trách nhiệm bảo mật thông tin đăng nhập 
          (tên đăng nhập và mật khẩu).
        </Text>
        <Text style={styles.bulletItem}>
          • Mọi hoạt động từ tài khoản của bạn sẽ được coi là 
          do bạn thực hiện.
        </Text>

        <Text style={styles.subSection}>2.3 Hủy tài khoản:</Text>
        <Text style={styles.bulletItem}>
          • Chúng tôi có quyền tạm khóa hoặc xóa tài khoản 
          nếu phát hiện hành vi gian lận, vi phạm pháp luật, 
          hoặc điều khoản sử dụng này.
        </Text>

        <Text style={styles.sectionTitle}>3. Sử dụng ứng dụng</Text>
        <Text style={styles.subItem}>
          3.1 Ứng dụng được cung cấp để bạn mua sắm các sản 
          phẩm nội thất cho mục đích cá nhân, không dành cho 
          việc phân phối thương mại hoặc sử dụng không đúng 
          mục đích.
        </Text>
        <Text style={styles.subItem}>
          3.2 Người dùng không được:
        </Text>
        <Text style={styles.bulletItem}>
          • Sử dụng ứng dụng để thực hiện các hành vi vi phạm 
          pháp luật, bao gồm nhưng không giới hạn ở hành vi lừa 
          đảo, tấn công hệ thống, hoặc sử dụng thông tin trái phép.
        </Text>
        <Text style={styles.bulletItem}>
          • Sử dụng phần mềm, công cụ hoặc kỹ thuật để can thiệp 
          hoặc làm gián đoạn hoạt động của ứng dụng.
        </Text>

        <Text style={styles.sectionTitle}>4. Thông tin sản phẩm và giá cả</Text> 
        <Text style={styles.subItem}>
        4.1 Thông tin sản phẩm:
        </Text>
        <Text style={styles.bulletItem}>
          • Chúng tôi cố gắng đảm bảo rằng mọi thông tin về sản phẩm, bao gồm hình ảnh, 
          mô tả, kích thước, và màu sắc, là chính xác. Tuy nhiên, các sai sót nhỏ có thể xảy ra.
        </Text>
        <Text style={styles.bulletItem}>
          • Hình ảnh sản phẩm chỉ mang tính minh họa, có thể khác biệt 
          nhỏ so với sản phẩm thực tế do ánh sáng hoặc màn hình hiển thị.
        </Text>
        <Text style={styles.subItem}>
        4.2 Giá cả:
        </Text>
        <Text style={styles.bulletItem}>
          • Giá niêm yết trên ứng dụng có thể thay đổi mà không cần thông báo trước, 
          tùy thuộc vào chương trình khuyến mãi hoặc biến động thị trường.
        </Text>
        <Text style={styles.bulletItem}>
          • Chúng tôi cam kết không thu thêm bất kỳ chi phí nào ngoài 
          các khoản đã được hiển thị rõ ràng khi bạn đặt hàng.
        </Text>
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  welcomeText: {
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  subSection: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  subItem: {
    marginBottom: 10,
    lineHeight: 20,
  },
  bulletItem: {
    marginBottom: 10,
    lineHeight: 20,
    paddingLeft: 5,
  },
  bottomPadding: {
    height: 40,
  },
});

export default TermsOfUseScreen;