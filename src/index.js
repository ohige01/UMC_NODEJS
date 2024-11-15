import dotenv from "dotenv";    //.env 관리 모듈
import cors from "cors"   //cors 관리 모듈
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { handleListUserMissions, handleListUserReviews, handleUserMisAdd, handleUserSignUp } from "./controllers/user.controller.js";
import { handleListStoreMissions, handleListStoreReviews, handleReviewWrite, handleStoreAdd, handleStoreMisAdd } from "./controllers/store.controller.js";

dotenv.config();    //config()를 호출해 env에 있는 내용 접근

const app = express();
const port = process.env.PORT;

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

/**
 * 공통 응답을 사용할 수 있는 헬퍼 함수 등록
 */
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석(일반 form태그로 보낸 응답 해석)

//url route
//user
app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/users/missions", handleUserMisAdd);
app.get("/api/v1/users/:userId/reviews", handleListUserReviews);
app.get("/api/v1/users/:userId/missions", handleListUserMissions);

//store
app.post("/api/v1/stores", handleStoreAdd);
app.post("/api/v1/stores/reviews", handleReviewWrite);
app.post("/api/v1/stores/missions", handleStoreMisAdd);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});