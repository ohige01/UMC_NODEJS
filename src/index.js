import dotenv from "dotenv";    //.env 관리 모듈
import cors from "cors"   //cors 관리 모듈
import express from "express";
import { handleListUserMissions, handleListUserReviews, handleUserMisAdd, handleUserSignUp } from "./controllers/user.controller.js";
import { handleListStoreMissions, handleListStoreReviews, handleReviewWrite, handleStoreAdd, handleStoreMisAdd } from "./controllers/store.controller.js";

dotenv.config();    //config()를 호출해 env에 있는 내용 접근

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석(일반 form태그로 보낸 응답 해석)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});