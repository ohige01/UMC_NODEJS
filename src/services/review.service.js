import { getReview, getReviewToStoreId, writeReview, writeReviewImg } from "../repositories/review.repsitory.js";
import { calStoreScore, getStore } from "../repositories/store.repository.js";
import { getUser } from "../repositories/user.repository.js";

//리뷰 작성
export const reviewWrite = async (data) => {
    const store = await getStore(data.storeId);
    const user = await getUser(data.userId);

    if(user == null)
        throw new Error("존재하지 않은 유저입니다. req:" + data.userId);
    if(store == null)
        throw new Error("존재하지 않은 가게입니다. req:" + data.storeId);
        
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
export const listStoreReviews = async (storeId, cursor) => {
    const reviews = await getReviewToStoreId(storeId, cursor);
    return reviews;
};