import { prisma } from "../db.config.js"

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.member.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }
  const created = await prisma.member.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.member.findFirst({ where: { id: userId } });
  return user;
};

//음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategory) => {
  const foodCategoryDB = await prisma.foodCategory.findFirstOrThrow({where: {name: foodCategory}});

  //매핑하기 전 기존에 존재한 정보 삭제
  await prisma.memberPrefer.deleteMany({ where: { memberId: userId } });
  await prisma.memberPrefer.create({
    data: {
      memberId: userId,
      foodCategoryId: foodCategoryDB.id,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.memberPrefer.findMany({
    select: {
      id: true,
      memberId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { memberId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

// User 데이터 수정
export const editUser = async (userId, data) => {
  //속성 값이 주어지지 않는 경우 해당 속성 삭제
  Object.keys(data).map((key) => {
    if(!data[key] && data[key] != false)
      delete data[key];
  });

  const updated = await prisma.member.update({ 
    where: { id: userId },
    data: data });
  return updated.id;
};