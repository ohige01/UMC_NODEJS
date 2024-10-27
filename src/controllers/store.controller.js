import { StatusCodes } from "http-status-codes";
import { reviewWrite, storeAdd } from "../services/store.service.js";
import { bodyToStore } from "../dtos/store.dto.js";

export const handleStoreAdd = async (req, res, next) => {
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const store = await storeAdd(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};

export const handleReviewWrite = async (req, res) =>{
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const review = await reviewWrite(req.body);
  res.status(StatusCodes.OK).json({ result: review });
};