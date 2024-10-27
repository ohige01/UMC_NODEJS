import { getReview, writeReview, writeReviewImg } from "../repositories/review.repsitory.js";
import { addStore, calStoreScore, getStore } from "../repositories/store.repository.js";
import { getUser } from "../repositories/user.repository.js";

export const storeAdd = async (data) => {
    const storeId = await addStore({
        name: data.name,
        category: data.category,
        location: data.location,
        infoImg: data.infoImg    
    });

    if(storeId == null)
        throw new Error("중복된 가게입니다.");
        
    const store = getStore(storeId);

    return store;
};

export const reviewWrite = async (data) => {
    const store = await getStore(data.storeId);
    const user = await getUser(data.userId);

    if(user == null)
        throw new Error("존재하지 않은 유저입니다. req:" + data.userId);
    if(store == null)
        throw new Error("존재하지 않은 가게입니다. req:" + data.storeId);
        
    const reviewId = await writeReview({
        storeId: store[0].id,
        userId: user[0].id,
        rate: data.rate,
        text: data.text
    });

    await calStoreScore(store[0].id);
    
    for (const reviewImg of data.image) {
        await writeReviewImg({
            storeId: store.id,
            reviewId: reviewId,
            reviewImg: reviewImg
        });
    }

    const review = await getReview(reviewId);

    return review;
}