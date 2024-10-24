import { pool } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM member WHERE email = ?) as isExistEmail;`,
      data.email
    );

    //이미 존재하는 이메일일 때
    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO member (email, password, name, gender, birth, address, spec_address, phone_num) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.password,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.detailAddress,
        data.phoneNumber
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM member WHERE id = ?;`, userId);

    console.log(user);

    if (user.length == 0) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategory) => {
  const conn = await pool.getConnection();

  try {
    const [foodCategorySearch] = await pool.query('SELECT * FROM food_category WHERE name = ?;', foodCategory)
    if(foodCategorySearch == null){
      throw new Error(`Not Found Category (${foodCategory})`);
    }
    await pool.query(
      `INSERT INTO member_prefer (category_id, member_id) VALUES (?, ?);`,
      [foodCategorySearch[0].id, userId]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      "SELECT ufc.id, ufc.category_id, ufc.member_id, fcl.name " +
        "FROM member_prefer ufc JOIN food_category fcl on ufc.category_id = fcl.id " +
        "WHERE ufc.member_id = ? ORDER BY ufc.category_id ASC;",
      userId
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
