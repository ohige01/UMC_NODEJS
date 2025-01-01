import { responseFromUser } from "../dtos/user.dto.js";
import { NotFoundError } from "../error.js";
import { addUserMis, getStoreMission, getUserMission_MissionID, getUserMissionAll } from "../repositories/mission.repository.js";
import {
  addUser,
  editUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

//회원 가입
export const userSignUp = async (data: any) => {
  const joinUserId = await addUser({
    email: data.email,
    password: data.password,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    specAddress: data.specAddress,
    phoneNum: data.phoneNum
  });

  if (joinUserId === null) {
    throw new NotFoundError("이미 존재하는 이메일입니다.", null);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  if (user == null) {
    throw new NotFoundError("유저 정보를 가져올 수 없습니다. req:" + joinUserId, null);
  }
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

//유저 미션 추가
export const userMisAdd = async (data: any) => {
  //유효성 검사
  const user = await getUser(data.userId);
  const storeMis = await getStoreMission(data.missionId);

  if(user == null)
    throw new NotFoundError("존재하지 않은 유저입니다. req:" + data.userId, null);
  if(storeMis == null)
    throw new NotFoundError("존재하지 않은 미션입니다. req:" + data.missionId, null);

  const userMisId = await addUserMis({
    userId: user.id,
    missionId: storeMis.id
  });

  const userMis = await getUserMission_MissionID(userMisId);

  return userMis;
};

//유저 미션 조회 
export const listUserMissions = async (userId: number, cursor: number) => {
  //유효한 유저 아이디인지 판별
  const user = await getUser(userId);
  if(user == null)
      throw new NotFoundError("존재하지 않은 유저입니다. req:" + userId, null);

  //미션 조회
  const missions = await getUserMissionAll(userId, cursor);
  return missions;
};

//유저 정보 수정
export const userEdit = async (userId: number, data: any) => {
  //유효한 유저 아이디인지 판별
  const confirm = await getUser(userId);
  if(confirm == null)
      throw new NotFoundError("존재하지 않은 유저입니다. req:" + userId, null);

  const editUserId = await editUser(userId, {
    password: data.password,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    specAddress: data.specAddress,
    phoneNum: data.phoneNum
  });

  for (const preference of data.preferences) {
    await setPreference(editUserId, preference);
  }

  const user = await getUser(editUserId);
  if (user == null) {
    throw new NotFoundError("유저 정보를 가져올 수 없습니다. req:" + editUserId, null);
  }
  const preferences = await getUserPreferencesByUserId(editUserId);

  return responseFromUser({ user, preferences });
};