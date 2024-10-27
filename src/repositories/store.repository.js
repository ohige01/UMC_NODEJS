import { pool } from "../db.config.js";

// 가게 조회
export const getStore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(`SELECT * FROM store WHERE id = ?;`, storeId);

    console.log(store);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

//가게 추가
export const addStore = async (data) => {
    const conn = await pool.getConnection();

    //주소 문자열 파싱
    const region = String(data.location).split(' ');

    try {
        //지역 아이디 탐색
        const [region_id] = await pool.query('SELECT * FROM region WHERE name = ?;', region[0]);
        if(region_id.length == 0){
            throw new Error(`Not Found Category (${region[0]})`);
        }
        console.log(region_id)
        //카테고리 아이디 탐색
        const [foodCategorySearch] = await pool.query('SELECT * FROM food_category WHERE name = ?;', data.category)
        if(foodCategorySearch.length == 0){
          throw new Error(`Not Found Category (${data.category})`);
        }
        console.log(foodCategorySearch)
        
        //중복 가게 검사(같은 지역, 같은 이름)
        const [confirm] = await pool.query('SELECT distinct id FROM store WHERE name=? AND region_id = ?;',
            [data.name, region_id[0].id]
        );
        if(confirm.length != 0)
            return null;
        
        //가게 추가
        const [result_id] = await pool.query(
            'INSERT INTO store (name, region_id, address, score, image_url, category_id) VALUES (?, ?, ?, 0, ?, ?);',
            [
                data.name,
                region_id[0].id,
                data.location,
                data.infoImg,
                foodCategorySearch[0].id
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

//가게 평점 계산
export const calStoreScore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    //점수 계산
    const [score] = await pool.query(`SELECT AVG(score) AS score_avg FROM review WHERE store_id=?;`, storeId);

    //계산한 점수 입력
    await pool.query(`UPDATE store SET score = ? WHERE id = ?;`, [score[0].score_avg, storeId]);
    
    console.log(score[0].score_avg);
    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }  
};