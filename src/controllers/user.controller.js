import { StatusCodes } from "http-status-codes";
import { bodyToUser, requestUserEdit, requestUserMisAdd } from "../dtos/user.dto.js";
import { listUserMissions, userEdit, userMisAdd, userSignUp } from "../services/user.service.js";
import { listUserReviews } from "../services/review.service.js";
import { responseFromReviews } from "../dtos/review.dto.js";
import { responseFromMissions } from "../dtos/mission.dto.js";

//회원 가입
export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.tags = ['Users'];
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              password: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              specAddress: { type: "string" },
              phoneNum: { type: "string" },
              preferences: { type: "array", items: { type: "string" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "4001_DATA_NOT_FOUND" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success({ result: user });
  } catch (error) {
    next(error);
  }
};

//유저 미션 추가
export const handleUserMisAdd = async (req, res, next) => { 
  /*
    #swagger.tags = ['Users'];
    #swagger.summary = '유저 미션 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "number" },
              missionId: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "유저 미션 추가 성공 응답",
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
                  missionId: { type: "number" },
                  memberId: { type: "number" },
                  status: { type: "string", default: "Challenge" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "유저 미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "4001_DATA_NOT_FOUND" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const userMis = await userMisAdd(requestUserMisAdd(req.body));
    res.status(StatusCodes.OK).success({ result: userMis });
  } catch (error) {
    next(error);
  }
};

//유저 리뷰 조회
export const handleListUserReviews = async (req, res, next) => {
  /*
    #swagger.tags = ['Users'];
    #swagger.summary = '유저 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "유저 리뷰 목록 조회 성공 응답",
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
                        body: { type: "string" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        score: { type: "number", format: "float" }
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
    #swagger.responses[400] = {
      description: "유저 리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "4001_DATA_NOT_FOUND" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const reviews = await listUserReviews(
      parseInt(req.params.userId),
      //cursor 미설정시 0 전달
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
  
    res.status(StatusCodes.OK).success({ result: responseFromReviews(reviews) });
  } catch (error) {
    next(error);
  }
};

//유저 미션 조회
export const handleListUserMissions = async (req, res, next) => {
  /*
    #swagger.tags = ['Users'];
    #swagger.summary = '유저 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "유저 미션 목록 조회 성공 응답",
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
                        mission: { type: "object", properties: { 
                          id: { type: "number" }, missionSpec: { type: "string" },
                          store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" }}} 
                        } },
                        status: { type: "string" }
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
    #swagger.responses[400] = {
      description: "유저 미션 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "4001_DATA_NOT_FOUND" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const missions = await listUserMissions(
      parseInt(req.params.userId),
      //cursor 미설정시 0 전달
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
  
    res.status(StatusCodes.OK).success({ result: responseFromMissions(missions) });
  } catch (error) {
    next(error);
  }
};

//회원 정보 수정
export const handleUserEdit = async (req, res, next) => {
  /*
    #swagger.tags = ['Users'];
    #swagger.summary = '회원 정보 수정 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              password: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              specAddress: { type: "string" },
              phoneNum: { type: "string" },
              preferences: { type: "array", items: { type: "string" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 정보 수정 성공 응답",
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
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 정보 수정 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "4001_DATA_NOT_FOUND" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  try {
    const user = await userEdit(parseInt(req.params.userId), requestUserEdit(req.body));
    res.status(StatusCodes.OK).success({ result: user });
  } catch (error) {
    next(error);
  }
};