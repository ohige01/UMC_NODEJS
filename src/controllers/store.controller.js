import { StatusCodes } from "http-status-codes";
import { listStoreReviews, reviewWrite } from "../services/review.service.js";
import { listStoreMissions, storeAdd, storeMisAdd } from "../services/store.service.js";
import { bodyToStore, requestReviewWrite, requestStoreMisAdd } from "../dtos/store.dto.js";
import { responseFromReviews } from "../dtos/review.dto.js";
import { responseFromMissions } from "../dtos/mission.dto.js";

//가게 추가
export const handleStoreAdd = async (req, res, next) => {
  /*
    #swagger.tags = ['Stores'];
    #swagger.summary = '가게 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              location: { type: "string" },
              infoImg: { type: "string" },
              category: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  regionId: { type: "number" },
                  categoryId: { type: "number" },
                  name: { type: "string" },
                  address: { type: "string" },
                  score: { type: "number", format: "float", default: 0.1 },
                  imageUrl: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
  */
  try {
    const store = await storeAdd(bodyToStore(req.body));
    res.status(StatusCodes.OK).success({ result: store });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//가게 리뷰 작성
export const handleReviewWrite = async (req, res) =>{
  /*
    #swagger.tags = ['Stores'];
    #swagger.summary = '가게 리뷰 작성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "number" },
              userId: { type: "number" },
              rate: { type: "number", format: "float", default: 4.5 },
              text: { type: "string" },
              reviewImg: { type: "string" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게 리뷰 작성 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  memberId: { type: "number" },
                  storeId: { type: "number" },
                  body: { type: "string" },
                  score: { type: "number"}
                }
              }
            }
          }
        }
      }
    };
  */
  try {
    const review = await reviewWrite(requestReviewWrite(req.body));
    res.status(StatusCodes.OK).success({ result: review });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//가게 미션 추가
export const handleStoreMisAdd = async (req, res) =>{
  /*
    #swagger.tags = ['Stores'];
    #swagger.summary = '가게 미션 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "number" },
              missionSpec: { type: "string" },
              reward: { type: "number" },
              deadline: { type: "string", format: "date" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  storeId: { type: "number" },
                  reward: { type: "number" },
                  deadline: { type: "string", format: "date" },
                  missionSpec: { type: "string" }
                }
              }
            }
          }
        }
      }
    };
  */
  try {
    const mission = await storeMisAdd(requestStoreMisAdd(req.body));
    res.status(StatusCodes.OK).success({ mission: mission });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).error(error);
  }
};

//가게 리뷰 조회
export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.tags = ['Stores'];
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
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
  /*
    #swagger.tags = ['Stores'];
    #swagger.summary = '상점 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        missionSpec: { type: "string" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        reward: { type: "number" },
                        deadline: { type: "string", format: "date" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
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