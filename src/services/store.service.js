import { addStoreMis, getStoreMission } from "../repositories/mission.repository.js";
import { getReview, writeReview, writeReviewImg } from "../repositories/review.repsitory.js";
import { addStore, calStoreScore, getStore } from "../repositories/store.repository.js";
import { getUser } from "../repositories/user.repository.js";

//가게 추가
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

//리뷰 작성
export const reviewWrite = async (data) => {
    const store = await getStore(data.storeId);
    const user = await getUser(data.userId);

    if(user == null)
        throw new Error("존재하지 않은 유저입니다. req:" + data.userId);
    if(store == null)
        throw new Error("존재하지 않은 가게입니다. req:" + data.storeId);
        
    const reviewId = await writeReview({
        storeId: store[0].id,
        userId: user.id,
        rate: data.rate,
        text: data.text
    });

    await calStoreScore(store[0].id);
    
    for (const reviewImg of data.reviewImg) {
        await writeReviewImg({
            storeId: store[0].id,
            reviewId: reviewId,
            reviewImg: reviewImg
        });
    }

    const review = await getReview(reviewId);

    return review;
};

//가게 미션 추가
export const storeMisAdd = async (data) => {
    //유효한 날짜인지 판별
    const today = new Date();
    if(today >= data.deadline){
        throw new Error("유효하지 않은 날짜입니다. req:" + data.deadline);
    }
    
    //유효한 가게 아이디인지 판별
    const store = await getStore(data.storeId);
    if(store == null)
        throw new Error("존재하지 않은 가게입니다. req:" + data.storeId);

    const missionId = await addStoreMis({
        storeId: store[0].id,
        missionSpec: data.missionSpec,
        reward: data.reward,
        deadline: data.deadline
    });

    const mission = await getStoreMission(missionId);

    return mission;
};