import { NotFoundError } from "../error.js";
import { getReview, getReviewToStoreId, getReviewToUserId, writeReview, writeReviewImg } from "../repositories/review.repsitory.js";
import { calStoreScore, getStore } from "../repositories/store.repository.js";
import { getUser } from "../repositories/user.repository.js";

//리뷰 작성
export const reviewWrite = async (data: any) => {
    //입력값이 유효한지 검사
    const store = await getStore(data.storeId);
    const user = await getUser(data.userId);

    if(user == null)
        throw new NotFoundError("존재하지 않은 유저입니다. req:" + data.userId, null);
    if(store == null)
        throw new NotFoundError("존재하지 않은 가게입니다. req:" + data.storeId, null);
        
    const reviewId = await writeReview({
        storeId: store.id,
        userId: user.id,
        rate: data.rate,
        text: data.text
    });

    await calStoreScore(store.id);
    
    //이미지가 없을 때는 미실행
    if(data.reviewImg != null)
        for (const reviewImg of data.reviewImg) {
            await writeReviewImg({
                storeId: store.id,
                reviewId: reviewId,
                reviewImg: reviewImg
            });
        }

    const review = await getReview(reviewId);

    return review;
};

//가게 리뷰 조회 
export const listStoreReviews = async (storeId: number, cursor: number) => {
    //유효한 가게 아이디인지 판별
    const store = await getStore(storeId);
    if(store == null)
        throw new NotFoundError("존재하지 않은 가게입니다. req:" + storeId, null);

    const reviews = await getReviewToStoreId(storeId, cursor);
    return reviews;
};

//유저 리뷰 조회 
export const listUserReviews = async (userId: number, cursor: number) => {
    //유효한 유저 아이디인지 판별
    const user = await getUser(userId);
    if(user == null)
        throw new NotFoundError("존재하지 않은 유저입니다. req:" + userId, null);

    const reviews = await getReviewToUserId(userId, cursor);
    return reviews;
};