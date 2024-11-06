import { StatusCodes } from "http-status-codes";
import { bodyToUser, requestUserMisAdd } from "../dtos/user.dto.js";
import { listUserMissions, userMisAdd, userSignUp } from "../services/user.service.js";
import { listUserReviews } from "../services/review.service.js";
import { responseFromReviews } from "../dtos/review.dto.js";
import { responseFromMissions } from "../dtos/mission.dto.js";

//회원 가입
export const handleUserSignUp = async (req, res, next) => {
  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success({ result: user });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//유저 미션 추가
export const handleUserMisAdd = async (req, res) => { 
  try {
    const userMis = await userMisAdd(requestUserMisAdd(req.body));
    res.status(StatusCodes.OK).success({ result: userMis });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//유저 리뷰 조회
export const handleListUserReviews = async (req, res, next) => {
  try {
    const reviews = await listUserReviews(
      parseInt(req.params.userId),
      //cursor 미설정시 0 전달
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
  
    res.status(StatusCodes.OK).success({ result: responseFromReviews(reviews) });
  } catch (error) {
    console.log(error.message)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//유저 미션 조회
export const handleListUserMissions = async (req, res, next) => {
  try {
    const missions = await listUserMissions(
      parseInt(req.params.userId),
      //cursor 미설정시 0 전달
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
  
    res.status(StatusCodes.OK).success({ result: responseFromMissions(missions) });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};