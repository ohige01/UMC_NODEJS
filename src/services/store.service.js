import { addStore, getStore } from "../repositories/store.repository.js";

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