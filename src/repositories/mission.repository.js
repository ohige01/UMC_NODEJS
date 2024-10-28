import { pool } from "../db.config.js";

//가게 미션 조회
export const getStoreMission = async (missionId) => {
    const conn = await pool.getConnection();
  
    try {
      const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, missionId);
  
      console.log(mission);
  
      if (mission.length == 0) {
        return null;
      }
  
      return mission;
    } catch (err) {
      throw new Error(
        `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
      );
    } finally {
      conn.release();
    }
};

//가게 미션 추가
export const addStoreMis = async (data) => {
    const conn = await pool.getConnection();
  
    try {
        const [result_id] = await pool.query(
            'INSERT INTO mission (store_id, reward, deadline, mission_spec) VALUES (?, ?, ?, ?);',
            [
                data.storeId,
                data.reward,
                data.deadline,
                data.missionSpec
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
};