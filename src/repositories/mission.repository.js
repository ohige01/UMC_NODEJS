import { prisma } from "../db.config.js"

//가게 미션 조회
export const getStoreMission = async (missionId) => {
  const mission = await prisma.mission.findFirstOrThrow({ where: { id: missionId } });
  return mission;
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

//유저 미션 전체 조회
export const getUserMission_UserID = async (userId) => {
  const mission = await prisma.review.findMany({    
    select: {
    id: true,
    memberId: true,
    missionId: true,
    mission: true,
  },
  where: { memberId: userId },
  orderBy: { missionId: "asc" }});

  return mission;
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