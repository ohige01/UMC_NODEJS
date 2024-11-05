import { addStoreMis, getStoreMission } from "../repositories/mission.repository.js";
import { addStore, getStore } from "../repositories/store.repository.js";

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
        storeId: store.id,
        missionSpec: data.missionSpec,
        reward: data.reward,
        deadline: data.deadline
    });

    const mission = await getStoreMission(missionId);

    return mission;
};