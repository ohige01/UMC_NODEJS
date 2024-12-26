import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { prisma } from "./db.config.js";
import { NotFoundError } from "./error.js";

dotenv.config();

//google login
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://43.201.160.91:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new NotFoundError(`profile.email was not found: ${profile}`);
    }
  
    const user = await prisma.member.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    const created = await prisma.member.create({
      data: {
        email,
        name: profile.displayName,
        password: "Google OAuth",
        gender: "추후 수정",
        birth: new Date(1970, 0, 1),
        address: "추후 수정",
        specAddress: "추후 수정",
        phoneNum: "추후 수정",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };

//kakao login
export const kakaoStrategy = new KakaoStrategy(
    {
      clientID: process.env.PASSPORT_KAKAO_RESTAPI_KEY,
      callbackURL: "http://43.201.160.91:3000/oauth2/callback/kakao"
    },
    (accessToken, refreshToken, profile, cb) => {
      return kakaoVerify(profile)
        .then((user) => cb(null, user))
        .catch((err) => cb(err));
    }
);

const kakaoVerify = async (profile) => {
    //profile 객체에서 email 추출
    const email = profile._json.kakao_account.email;
    if (!email) {
      throw new NotFoundError(`profile.email was not found: ${profile}`);
    }
    
    //중복된 사용자인지 검사
    const user = await prisma.member.findFirst({ where: { email: email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    const created = await prisma.member.create({
      data: {
        email: email,
        name: profile.displayName,
        password: "Kakao OAuth",
        gender: "추후 수정",
        birth: new Date(1970, 0, 1),
        address: "추후 수정",
        specAddress: "추후 수정",
        phoneNum: "추후 수정",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };