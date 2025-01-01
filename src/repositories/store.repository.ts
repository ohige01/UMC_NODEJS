import { prisma } from "../db.config.js"

// 가게 조회
export const getStore = async (storeId: number) => {
  const store = await prisma.store.findFirst({ where: { id: storeId } });
  return store;
};

//가게 추가
export const addStore = async (data: any) => {
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
export const calStoreScore = async (storeId: number) => {
  //점수 계산
  const cal = await prisma.review.groupBy({
    by: ['storeId'],
    where: { storeId: storeId },
    _avg: { score: true }
  });
  let score_avg = (cal[0]._avg.score ? cal[0]._avg.score : 0);

  //계산한 점수 입력
  await prisma.store.update({
    where: {
      id: storeId,
    },
    data: {
      score: score_avg,
    },
  }) 
};