import { responseFromUser } from "../dtos/user.dto.js";
import { NotFoundError } from "../error.js";
import { addUserMis, getStoreMission, getUserMission_MissionID, getUserMissionAll } from "../repositories/mission.repository.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

//회원 가입
export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    password: data.password,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    specAddress: data.detailAddress,
    phoneNum: data.phoneNumber
  });

  if (joinUserId === null) {
    throw new NotFoundError("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

//유저 미션 추가
export const userMisAdd = async (data) => {
  //유효성 검사
  const user = await getUser(data.userId);
  const storeMis = await getStoreMission(data.missionId);

  if(user == null)
    throw new NotFoundError("존재하지 않은 유저입니다. req:" + data.userId);
  if(storeMis == null)
    throw new NotFoundError("존재하지 않은 미션입니다. req:" + data.missionId);

  const userMisId = await addUserMis({
    userId: user.id,
    missionId: storeMis.id
  });

  const userMis = await getUserMission_MissionID(userMisId);

  return userMis;
};

//유저 미션 조회 
export const listUserMissions = async (userId, cursor) => {
  //유효한 가게 아이디인지 판별
  const user = await getUser(userId);
  if(user == null)
      throw new NotFoundError("존재하지 않은 가게입니다. req:" + userId);

  //미션 조회
  const missions = await getUserMissionAll(userId, cursor);
  return missions;
};