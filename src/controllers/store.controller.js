import { StatusCodes } from "http-status-codes";
import { listStoreReviews, reviewWrite } from "../services/review.service.js";
import { listStoreMissions, storeAdd, storeMisAdd } from "../services/store.service.js";
import { bodyToStore, requestReviewWrite, requestStoreMisAdd } from "../dtos/store.dto.js";
import { responseFromReviews } from "../dtos/review.dto.js";
import { responseFromMissions } from "../dtos/mission.dto.js";

//가게 추가
export const handleStoreAdd = async (req, res, next) => {
  try {
    const store = await storeAdd(bodyToStore(req.body));
    res.status(StatusCodes.OK).success({ result: store });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//가게 리뷰 작성
export const handleReviewWrite = async (req, res) =>{
  try {
    const review = await reviewWrite(requestReviewWrite(req.body));
    res.status(StatusCodes.OK).success({ result: review });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//가게 미션 추가
export const handleStoreMisAdd = async (req, res) =>{
  try {
    const mission = await storeMisAdd(requestStoreMisAdd(req.body));
    res.status(StatusCodes.OK).success({ mission: mission });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//가게 리뷰 조회
export const handleListStoreReviews = async (req, res, next) => {
  try {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId),
      //cursor 미설정시 0 전달
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );

    res.status(StatusCodes.OK).success(responseFromReviews(reviews));
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//가게 미션 조회
export const handleListStoreMissions = async (req, res, next) => {
  try {
    const missions = await listStoreMissions(
      parseInt(req.params.storeId),
      //cursor 미설정시 0 전달
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
  
    res.status(StatusCodes.OK).json({ result: responseFromMissions(missions) });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};