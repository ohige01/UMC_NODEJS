import { StatusCodes } from "http-status-codes";
import { listStoreReviews, reviewWrite } from "../services/review.service.js";
import { storeAdd, storeMisAdd } from "../services/store.service.js";
import { bodyToStore, requestReviewWrite, requestStoreMisAdd } from "../dtos/store.dto.js";
import { responseFromReviews } from "../dtos/review.dto.js";

//가게 추가
export const handleStoreAdd = async (req, res, next) => {
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const store = await storeAdd(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};

//가게 리뷰 작성
export const handleReviewWrite = async (req, res) =>{
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const review = await reviewWrite(requestReviewWrite(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};

//가게 미션 추가
export const handleStoreMisAdd = async (req, res) =>{
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const mission = await storeMisAdd(requestStoreMisAdd(req.body));
  res.status(StatusCodes.OK).json({ mission: mission });
};

//가게 리뷰 조회
export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    //cursor 미설정시 0 전달
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );

  res.status(StatusCodes.OK).json({ result: responseFromReviews(reviews) });
};