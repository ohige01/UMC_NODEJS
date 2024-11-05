import { StatusCodes } from "http-status-codes";
import { bodyToUser, requestUserMisAdd } from "../dtos/user.dto.js";
import { userMisAdd, userSignUp } from "../services/user.service.js";
import { listUserReviews } from "../services/review.service.js";
import { responseFromReviews } from "../dtos/review.dto.js";

//회원 가입
export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};

//유저 미션 추가
export const handleUserMisAdd = async (req, res) => {
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const userMis = await userMisAdd(requestUserMisAdd(req.body));
  res.status(StatusCodes.OK).json({ result: userMis }); 
};

//유저 리뷰 조회
export const handleListUserReviews = async (req, res, next) => {
  const reviews = await listUserReviews(
    parseInt(req.params.userId),
    //cursor 미설정시 0 전달
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );

  res.status(StatusCodes.OK).json({ result: responseFromReviews(reviews) });
};