import { pool } from "../db.config.js";

// 리뷰 조회
export const getReview = async (reviewId) => {
    const conn = await pool.getConnection();
  
    try {
      const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);
  
      console.log(review);
  
      if (review.length == 0) {
        return null;
      }
  
      return review;
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
  };

//리뷰 작성
export const writeReview = async (data) =>{
    const conn = await pool.getConnection();

    try{
        const [review_id] = await pool.query(
        'INSERT INTO review (member_id, store_id, body, score) VALUES (?, ?, ?, ?);',
        [
            data.userId,
            data.storeId,
            data.text,
            data.rate
        ]   
        );
        return review_id.insertId;
    } catch (err) {
        throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

//리뷰 이미지 작성
export const writeReviewImg = async (data) => {
    const conn = await pool.getConnection();

    try{
        const [result_id] = await pool.query(
        'INSERT INTO review_image (review_id, store_id, image_url) VALUES (?, ?, ?);',
        [
            data.reviewId,
            data.storeId,
            data.reviewImg
        ]
        );
        
        return result_id.insertId;
    } catch (err) {
        throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}