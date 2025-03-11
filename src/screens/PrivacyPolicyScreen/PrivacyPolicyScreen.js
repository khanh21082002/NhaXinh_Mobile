import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from './components';

export const PrivacyPolicyScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <Header navigation={navigation} />

            {/* Content */}
            <ScrollView style={styles.content}>
                <Text style={styles.introText}>
                    Chúng tôi, Nội Thất Nhà Xinh, cam kết bảo vệ thông
                    tin cá nhân của người dùng và đảm bảo rằng thông tin
                    này được sử dụng một cách an toàn và minh bạch.
                    Chính sách bảo mật này giải thích cách chúng tôi thu
                    thập, sử dụng, lưu trữ và bảo vệ thông tin cá nhân của
                    bạn khi sử dụng ứng dụng.
                </Text>

                <Text style={styles.sectionTitle}>1. Phạm vi áp dụng</Text>
                <Text style={styles.sectionText}>
                    Chính sách này áp dụng cho tất cả người dùng truy cập
                    và sử dụng ứng dụng, bao gồm những người mua bán
                    ở khách hàng mua hàng, nhà cung cấp, và các bên liên
                    quan khác.
                </Text>

                <Text style={styles.sectionTitle}>2. Thông tin chúng tôi thu thập</Text>

                <Text style={styles.subSection}>2.1 Thông tin cá nhân</Text>
                <Text style={styles.paragraphText}>
                    Khi bạn sử dụng ứng dụng, chúng tôi có thể thu thập
                    các thông tin cá nhân sau:
                </Text>
                <View style={styles.bulletList}>
                    <Text style={styles.bulletItem}>• Họ và tên</Text>
                    <Text style={styles.bulletItem}>• Số điện thoại</Text>
                    <Text style={styles.bulletItem}>• Địa chỉ email</Text>
                    <Text style={styles.bulletItem}>• Địa chỉ giao hàng</Text>
                    <Text style={styles.bulletItem}>• Thông tin thanh toán (ví dụ: số tài khoản ngân hàng
                        hoặc thông tin thẻ tín dụng).</Text>
                </View>

                <Text style={styles.subSection}>2.2 Thông tin không định danh cá nhân</Text>
                <Text style={styles.paragraphText}>
                    Chúng tôi cũng có thể thu thập các thông tin không
                    định danh để cải thiện trải nghiệm người dùng, bao
                    gồm:
                </Text>
                <View style={styles.bulletList}>
                    <Text style={styles.bulletItem}>• Lịch sử mua hàng</Text>
                    <Text style={styles.bulletItem}>• Dữ liệu hành vi sử dụng ứng dụng (ví dụ: các sản
                        phẩm bạn đã xem, lượt truy cập).</Text>
                    <Text style={styles.bulletItem}>• Thông tin thiết bị, hệ điều hành và địa chỉ IP.</Text>
                </View>

                <Text style={styles.subSection}>2.3 Cookie và công nghệ theo dõi</Text>
                <Text style={styles.paragraphText}>
                    Ứng dụng sử dụng cookie và công nghệ tương tự để:
                </Text>
                <View style={styles.bulletList}>
                    <Text style={styles.bulletItem}>• Cá nhân hóa trải nghiệm của bạn.</Text>
                    <Text style={styles.bulletItem}>• Phân tích và cải thiện hiệu suất của ứng dụng.</Text>
                </View>

                <Text style={styles.sectionTitle}>3. Mục đích sử dụng thông tin</Text>
                <Text style={styles.paragraphText}>
                    Chúng tôi sử dụng thông tin của bạn cho các mục đích sau:
                </Text>
                <View style={styles.bulletList}>
                    <Text style={styles.bulletItem}>• Xử lý đơn hàng: Để xác nhận, giao hàng và xử lý thanh toán.</Text>
                    <Text style={styles.bulletItem}>• Cải thiện dịch vụ: Phân tích dữ liệu để nâng cao trải nghiệm người dùng và cung cấp các sản phẩm phù hợp hơn.</Text>
                    <Text style={styles.bulletItem}>• Liên lạc: Gửi thông báo về trạng thái đơn hàng, khuyến mãi, hoặc các thay đổi trong dịch vụ.</Text>
                    <Text style={styles.bulletItem}>• Tuân thủ pháp luật: Đảm bảo hoạt động của chúng tôi tuân thủ các quy định pháp luật hiện hành.</Text>
                </View>

                <Text style={styles.sectionTitle}>4. Chia sẻ thông tin với bên thứ ba</Text>
                <Text style={styles.subSection}>4.1 Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba.</Text>
                <Text style={styles.subSection}>4.2 Tuy nhiên, chúng tôi có thể chia sẻ thông tin với:</Text>
                <View style={styles.bulletList}>
                    <Text style={styles.bulletItem}>• Nhà cung cấp dịch vụ giao hàng: Để đảm bảo đơn hàng được giao đúng địa chỉ và đúng thời gian.</Text>
                    <Text style={styles.bulletItem}>• Đối tác thanh toán: Để xử lý giao dịch mua bán của bạn.</Text>
                    <Text style={styles.bulletItem}>• Cơ quan pháp luật: Trong trường hợp cần thiết theo yêu cầu của pháp luật.</Text>
                </View>

                <Text style={styles.sectionTitle}>5. Bảo mật thông tin</Text>
                <Text style={styles.subSection}>5.1 Chúng tôi áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn khỏi mất mát, truy cập trái phép, hoặc sử dụng sai mục đích, bao gồm:</Text>
                <View style={styles.bulletList}>
                    <Text style={styles.bulletItem}>• Mã hóa dữ liệu thanh toán.</Text>
                    <Text style={styles.bulletItem}>• Hệ thống tường lửa và phần mềm bảo mật tiên tiến.</Text>
                    <Text style={styles.bulletItem}>• Quản lý truy cập nội bộ chặt chẽ.</Text>
                </View>
                <Text style={styles.subSection}>5.2 Mặc dù chúng tôi cố gắng bảo vệ thông tin, nhưng không có hệ thống nào hoàn toàn miễn nhiễm với các rủi ro bảo mật. Bạn cũng nên tự bảo vệ thông tin đăng nhập và không chia sẻ mật khẩu với bất kỳ ai.</Text>

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
    sectionText: {
        marginBottom: 15,
        lineHeight: 20,
    },
    subSection: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    paragraphText: {
        marginBottom: 8,
        lineHeight: 20,
    },
    bulletList: {
        marginLeft: 5,
        marginBottom: 15,
    },
    bulletItem: {
        marginBottom: 6,
        lineHeight: 20,
    },
    bottomPadding: {
        height: 40,
    },
});

export default PrivacyPolicyScreen;
