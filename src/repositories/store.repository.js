import { pool } from "../db.config.js";
import { prisma } from "../db.config.js"

// 가게 조회
export const getStore = async (storeId) => {
  const store = await prisma.store.findFirstOrThrow({ where: { id: storeId } });
  return store;
};

//가게 추가
export const addStore = async (data) => {
  //주소 문자열 파싱
  const location = String(data.location).split(' ');

  //지역 아이디 검색
  const region = await prisma.region.findFirstOrThrow({ where: {name: location[0]}});
  //카테고리 아이디 검색
  const category = await prisma.foodCategory.findFirstOrThrow({ where: {name: data.category}});

  //중복된 가게인지 탐색(같은 지역 내 같은 이름)
  const confirm = await prisma.store.findFirst({ where: { name: data.name, regionId:region.id } });
  if(confirm != null)
    return null;

  //가게 추가
  const store = await prisma.store.create({ data: {
    name: data.name,
    regionId: region.id,
    address: data.location,
    imageUrl: data.infoImg,
    categoryId: category.id,
    score: 0
  } });

  return store.id;
}

//가게 평점 계산
export const calStoreScore = async (storeId) => {
  const conn = await pool.getConnection();

  try {
    //점수 계산
    const [score] = await pool.query(`SELECT AVG(score) AS score_avg FROM review WHERE store_id=?;`, storeId);

    //계산한 점수 입력
    await pool.query(`UPDATE store SET score = ? WHERE id = ?;`, [score[0].score_avg, storeId]);
    
    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }  
};