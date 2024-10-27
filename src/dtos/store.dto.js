//AddStore Request Dto
export const bodyToStore = (body) => {

    return {
        name: body.name,
        category: body.category,
        location: body.location,
        infoImg: body.infoImg
    };
};

//ReviewWrite Request Dto
export const requestReviewWrite = (body) => {
    return{
        storeId: body.storeId,
        userId: body.userId,
        rate: body.rate,
        text: body.text,
        reviewImg: body.reviewImg
    }
};