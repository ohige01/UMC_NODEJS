import { FoodCategory, Member, MemberPrefer } from "@prisma/client";

//signUp Request Dto
export const bodyToUser = (body: any) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      password: body.password,
      name: body.name,
      gender: body.gender,
      birth: birth,
      address: body.address || "",
      specAddress: body.specAddress || "",
      phoneNum: body.phoneNum,
      preferences: body.preferences
    };
  };
//signUp Response Dto
export const responseFromUser = ({ user, preferences }: {
  user: Member;
  preferences: (MemberPrefer & { foodCategory: FoodCategory })[];
}) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};
//addUserMis Request Dto
export const requestUserMisAdd = (body: any) => {
  return {
    userId: body.userId,
    missionId: body.missionId
  };
};
//editUser Request Dto
export const requestUserEdit = (body: any) => {
  const birth = new Date(body.birth);

  return {
    password: body.password,
    name: body.name,
    gender: body.gender,
    birth: birth,
    address: body.address,
    specAddress: body.specAddress,
    phoneNum: body.phoneNum,
    preferences: body.preferences
  };
};