import { prisma } from "../db.config.js"

// 리뷰 조회(reviewId)
export const getReview = async (reviewId) => {
  const review = await prisma.review.findFirstOrThrow({ where: { id: reviewId } });
  return review;
};

//리뷰 조회(storeId)
export const getReviewToStoreId = async (storeId, cursor) => {
  //reviewId를 index로 설정
  const reviews = await prisma.review.findMany({
    select: { id: true, body: true, store: true, member: true, score: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};

//리뷰 조회(userId)
export const getReviewToUserId = async (userId, cursor) => {
  //reviewId를 index로 설정
  const reviews = await prisma.review.findMany({
    select: { id: true, body: true, store: true, member: true, score: true },
    where: { memberId: userId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
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