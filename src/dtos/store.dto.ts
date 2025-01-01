//AddStore Request Dto
export const bodyToStore = (body: any) => {

    return {
        name: body.name,
        category: body.category,
        location: body.location,
        infoImg: body.infoImg
    };
};

//ReviewWrite Request Dto
export const requestReviewWrite = (body: any) => {
    return{
        storeId: body.storeId,
        userId: body.userId,
        rate: body.rate,
        text: body.text,
        reviewImg: body.reviewImg
    }
};

//StoreMissionAdd Request Dto
export const requestStoreMisAdd = (body: any) => {
    const deadline = new Date(body.deadline);
    return{
        storeId: body.storeId,
        missionSpec: body.missionSpec,
        reward: body.reward,
        deadline: deadline
    }
}