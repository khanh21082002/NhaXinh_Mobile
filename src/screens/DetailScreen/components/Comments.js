import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from 'react-redux';
import CustomText from '../../../components/UI/CustomText';
import Colors from '../../../utils/Colors';
import UserComment from './UserComment';
import { addToReview, checkUserToReview, fetchReview } from '../../../reducers';

const { width } = Dimensions.get('window');

export const Comments = item => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const comments = useSelector(state => state.review.reviews);
  const isLoading = useSelector(state => state.review.isLoading); // Trạng thái loading
  const canReview = useSelector(state => state.review.canReview); // Trạng thái người dùng có thể bình luận
  const [textComment, setTextComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  useEffect(() => {
    dispatch(fetchReview(item.item.productId));
    dispatch(checkUserToReview(item.item.productId));
  }, [dispatch, item.item.productId]);

  const handleCommentSubmit = () => {
    if (textComment.trim().length > 0) {
      dispatch(addToReview(item.item.productId, textComment, 5));
      setTextComment('');
    }
  };

  // Toggle hiển thị tất cả bình luận
  const handleShowMore = () => setShowAllComments(!showAllComments);

  const sortedComments = Array.isArray(comments)
    ? comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  // Chỉ hiển thị 4 comment đầu nếu chưa bấm "Xem thêm"
  const displayedComments = showAllComments
    ? sortedComments
    : sortedComments.slice(0, 4);

  return (
    <View style={styles.commentContainer}>
      <CustomText style={styles.title}>Bình luận</CustomText>
      <CustomText style={styles.commentCount}>{comments.length}</CustomText>

      {/* Kiểm tra nếu người dùng có quyền bình luận */}
      {canReview && Object.keys(user).length !== 0 && (
        <View style={styles.inputContainer}>
          <Image
            style={styles.profilePic}
            source={
              user.avatarUrl?.length === 0
                ? require('../../../assets/images/imgprofile.jpg')
                : { uri: user.avatarUrl }
            }
          />
          <TextInput
            placeholder="Thêm bình luận công khai..."
            style={styles.input}
            onChangeText={text => setTextComment(text)}
            value={textComment}
          />
          <Entypo
            name="paper-plane"
            size={25}
            color={textComment.length === 0 ? Colors.grey : Colors.blue}
            onPress={handleCommentSubmit}
          />
        </View>
      )}

      {/* Hiển thị loading khi đang thêm bình luận */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <CustomText>Đang gửi bình luận...</CustomText>
        </View>
      ) : null}

      {/* Danh sách bình luận */}
      <FlatList
        data={displayedComments}
        keyExtractor={item => item.reviewId.toString()}
        renderItem={({ item }) => <UserComment comment={item} />}
        nestedScrollEnabled={true}
      />

      {/* Nút xem thêm */}
      {comments.length > 4 && (
        <TouchableOpacity
          onPress={handleShowMore}
          style={styles.showMoreButton}>
          <CustomText style={styles.showMoreText}>
            {showAllComments ? 'Ẩn bớt' : 'Xem thêm'}
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.light_grey,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  commentCount: {
    fontSize: 15,
    marginLeft: 10,
    color: Colors.grey,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_grey,
    paddingVertical: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    backgroundColor: Colors.light_grey,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  showMoreButton: {
    alignSelf: 'center',
    paddingVertical: 10,
  },
  showMoreText: {
    fontSize: 14,
    color: Colors.blue,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
});
