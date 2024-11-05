import { prisma } from "../db.config.js"

//가게 미션 개별 조회
export const getStoreMission = async (missionId) => {
  const mission = await prisma.mission.findFirstOrThrow({ where: { id: missionId } });
  return mission;
};

//가게 미션 전체 조회
export const getStoreMissionAll = async (storeId, cursor) => {
  //missionId를 index로 설정
  const missions = await prisma.mission.findMany({
    select: { id: true, missionSpec: true, store: true, reward: true, deadline: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};

//가게 미션 추가
export const addStoreMis = async (data) => {
  const mission = await prisma.mission.create({ data: {
    storeId: data.storeId,
    reward: data.reward,
    deadline: data.deadline,
    missionSpec: data.missionSpec
  } });

  return mission.id;
};

//유저 미션 개별 조회
export const getUserMission_MissionID = async (missionId) => {
  const mission = await prisma.memberMission.findFirstOrThrow({ where: { id: missionId } });
  return mission;
};

//유저 미션 전체 조회(도전중인 미션)
export const getUserMissionAll = async (userId, cursor) => {
  //missionId를 index로 설정
  const missions = await prisma.memberMission.findMany({
    select: { 
      id: true, 
      mission: true,
      //미션 테이블 내 store 출력 
      mission:{
        select:{ id: true, missionSpec: true, store: true, reward: true, deadline: true } 
      }, 
      status: true},
    where: { memberId: userId, status: "Challenge", id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return missions;
};

//유저 미션 추가
export const addUserMis = async (data) => {
  //도전중인 미션 확인
  const confirm = await prisma.memberMission.findFirst({
    where: {
      missionId: data.missionId,
      status: "Challenge"
    }
  });
  if(confirm!=null)
    throw new Error("도전 중인 미션입니다.");

  //미션 추가
  const mission = await prisma.memberMission.create({
    data: {
      memberId: data.userId,
      missionId: data.missionId,
      status: "Challenge"
    }
  });

  return mission.id;
};