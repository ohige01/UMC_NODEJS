import { responseFromUser } from "../dtos/user.dto.js";
import { addUserMis, getStoreMission, getUserMission_MissionID } from "../repositories/mission.repository.js";
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
    throw new Error("이미 존재하는 이메일입니다.");
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
    throw new Error("존재하지 않은 유저입니다. req:" + data.userId);
  if(storeMis == null)
      throw new Error("존재하지 않은 미션입니다. req:" + data.missionId);

  const userMisId = await addUserMis({
    userId: user.id,
    missionId: storeMis[0].id
  });

  const userMis = await getUserMission_MissionID(userMisId);

  return userMis;
};