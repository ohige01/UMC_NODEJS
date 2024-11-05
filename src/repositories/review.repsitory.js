import { prisma } from "../db.config.js"

// 리뷰 조회(reviewId)
export const getReview = async (reviewId) => {
  const review = await prisma.review.findFirstOrThrow({ where: { id: reviewId } });
  return review;
  };

//리뷰 작성
export const writeReview = async (data) =>{
  const review = await prisma.review.create({ data: {
    memberId: data.userId,
    storeId: data.storeId,
    body: data.text,
    score: data.rate
  } });

  return review.id;
};

//리뷰 이미지 작성
export const writeReviewImg = async (data) => {
  const review_image = await prisma.reviewImage.create({ data: {
    reviewId: data.reviewId,
    storeId: data.storeId,
    imageUrl: data.reviewImg
  } });

  return review_image.id;
};