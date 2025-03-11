import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from './components';

const PaymentPolicyScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header navigation={navigation}/>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.introText}>
          Chúng tôi, Nội Thất Nhà Xinh, cam kết cung cấp các 
          phương thức thanh toán linh hoạt và an toàn để đáp 
          ứng nhu cầu của khách hàng. Khi thực hiện giao dịch 
          trên ứng dụng, bạn đồng ý tuân thủ các điều khoản 
          trong chính sách thanh toán sau đây.
        </Text>

        <Text style={styles.sectionTitle}>1. Phương thức thanh toán</Text>
        <Text style={styles.paragraphText}>Chúng tôi hỗ trợ các phương thức thanh toán sau:</Text>
        
        <Text style={styles.subSection}>1.1 Thanh toán khi nhận hàng (COD):</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Bạn có thể thanh toán bằng tiền mặt trực tiếp cho nhân viên giao hàng khi nhận được sản phẩm.</Text>
          <Text style={styles.bulletItem}>• Thanh toán COD áp dụng cho các đơn hàng có giá trị không vượt quá [Số tiền tối đa, nếu có].</Text>
        </View>

        <Text style={styles.subSection}>1.2 Chuyển khoản ngân hàng:</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Thông tin tài khoản ngân hàng sẽ được cung cấp khi bạn chọn phương thức này.</Text>
          <Text style={styles.bulletItem}>• Vui lòng ghi rõ mã đơn hàng trong nội dung chuyển khoản để chúng tôi xử lý nhanh chóng.</Text>
          <Text style={styles.bulletItem}>• Các giao dịch chuyển khoản cần được thực hiện trong vòng [Số giờ/ngày] kể từ khi đặt hàng, nếu không đơn hàng sẽ bị hủy.</Text>
        </View>

        <Text style={styles.subSection}>1.3 Thanh toán qua ví điện tử:</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Chúng tôi chấp nhận thanh toán qua các ví điện tử phổ biến như [Tên các ví điện tử được hỗ trợ: Momo, ZaloPay, vv].</Text>
          <Text style={styles.bulletItem}>• Giao dịch sẽ được xử lý tự động và xác nhận ngay khi thanh toán thành công.</Text>
        </View>

        <Text style={styles.subSection}>1.4 Thẻ tín dụng/Thẻ ghi nợ:</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Chúng tôi hỗ trợ thanh toán qua thẻ Visa, Mastercard, hoặc các loại thẻ ngân hàng khác.</Text>
          <Text style={styles.bulletItem}>• Tất cả giao dịch qua thẻ được mã hóa và bảo mật theo tiêu chuẩn quốc tế.</Text>
        </View>

        <Text style={styles.sectionTitle}>2. Quy trình thanh toán</Text>
        <Text style={styles.subSection}>2.1 Sau khi đặt hàng trên ứng dụng, bạn sẽ nhận được:</Text>
        <Text style={styles.bulletItem}>• Xác nhận đặt hàng qua email hoặc tin nhắn.</Text>
        <Text style={styles.subSection}>2.2 Nếu chọn thanh toán trực tuyến, bạn cần hoàn tất thanh toán trước khi đơn hàng được xử lý.</Text>
        <Text style={styles.subSection}>2.3 Đối với thanh toán khi nhận hàng (COD), bạn chỉ cần thanh toán sau khi đã kiểm tra sản phẩm.</Text>

        <Text style={styles.sectionTitle}>3. Chính sách hủy đơn hàng</Text>
        <Text style={styles.subSection}>3.1 Hủy trước khi thanh toán:</Text>
        <Text style={styles.paragraphText}>Bạn có thể hủy đơn hàng miễn phí trước khi thực hiện thanh toán.</Text>
        <Text style={styles.subSection}>3.2 Hủy sau khi thanh toán:</Text>
        <Text style={styles.paragraphText}>
          Nếu bạn đã thanh toán trực tuyến và muốn hủy đơn hàng, vui lòng liên hệ ngay với bộ phận hỗ trợ qua [Hotline/Email]. 
          Hoàn tiền sẽ được xử lý theo quy định trong Chính sách hoàn tiền.
        </Text>
        <Text style={styles.subSection}>3.3 Hủy khi đang giao hàng:</Text>
        <Text style={styles.paragraphText}>
          Đối với đơn hàng COD, nếu bạn từ chối nhận hàng mà không có lý do chính đáng, chúng tôi có quyền tạm ngừng cung cấp dịch vụ trong tương lai.
        </Text>

        <Text style={styles.sectionTitle}>4. Chính sách hoàn tiền</Text>
        <Text style={styles.subSection}>4.1 Trường hợp áp dụng hoàn tiền:</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Sản phẩm bị lỗi, hư hỏng hoặc giao sai mẫu mã.</Text>
          <Text style={styles.bulletItem}>• Hủy đơn hàng thành công sau khi đã thanh toán trực tuyến.</Text>
        </View>

        <Text style={styles.subSection}>4.2 Hình thức hoàn tiền:</Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Hoàn tiền qua tài khoản ngân hàng, ví điện tử hoặc theo phương thức bạn đã thanh toán.</Text>
          <Text style={styles.bulletItem}>• Thời gian xử lý hoàn tiền: từ [X ngày] đến [Y ngày làm việc], tùy thuộc vào phương thức thanh toán ban đầu.</Text>
        </View>

        <Text style={styles.sectionTitle}>5. Lưu ý quan trọng</Text>
        <Text style={styles.bulletItem}>• Bạn cần kiểm tra kỹ thông tin đơn hàng trước khi thanh toán để tránh các sai sót.</Text>
        <Text style={styles.bulletItem}>• Tất cả các giao dịch thanh toán trên ứng dụng được mã hóa và bảo mật để bảo vệ thông tin tài chính của bạn.</Text>
        <Text style={styles.bulletItem}>• Nếu phát hiện bất kỳ giao dịch trái phép nào trên tài khoản thanh toán, vui lòng liên hệ với chúng tôi ngay lập tức qua [Hotline/Email].</Text>

        <Text style={styles.sectionTitle}>6. Liên hệ hỗ trợ</Text>
        <Text style={styles.paragraphText}>
          Nếu bạn gặp khó khăn trong quá trình thanh toán hoặc có thắc mắc, vui lòng liên hệ:
        </Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>Email: [email@example.com]</Text>
          <Text style={styles.bulletItem}>Hotline: [Số điện thoại liên hệ]</Text>
          <Text style={styles.bulletItem}>Thời gian hỗ trợ: [Giờ làm việc, ví dụ: từ 8:00 đến 20:00 hàng ngày]</Text>
        </View>

        {/* Add padding at the bottom to ensure scrolling works well */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  introText: {
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 15,
    marginBottom: 8,
  },
  paragraphText: {
    marginBottom: 8,
    lineHeight: 20,
  },
  subSection: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  bulletList: {
    marginLeft: 5,
    marginBottom: 15,
  },
  bulletItem: {
    marginBottom: 8,
    lineHeight: 20,
  },
  bottomPadding: {
    height: 40,
  },
});

export default PaymentPolicyScreen;
