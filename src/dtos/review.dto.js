//StoreReviewGet Response Dto
export const responseFromReviews = (reviews) => {
    return {
        data: reviews,
        pagination: {
        //마지막으로 읽은 reviewId 반환
        cursor: reviews.length ? reviews[reviews.length - 1].id : null,
        },
    };
};