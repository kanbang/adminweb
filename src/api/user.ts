/*
 * @Descripttion:
 * @version: 0.x
 * @Author: zhai
 * @Date: 2024-05-09 08:31:31
 * @LastEditors: zhai
 * @LastEditTime: 2024-05-11 18:18:01
 */
import { http } from "@/utils/http";
import { CrudApi } from "./crud-api";

export type UserResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    access_token: string;
    /** 用于调用刷新`access_token`的接口时所需的`token` */
    refreshToken: string;
    /** `access_token`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    access_token: string;
    /** 用于调用刷新`access_token`的接口时所需的`token` */
    refreshToken: string;
    /** `access_token`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  // return http.request<UserResult>("post", "/login", { data });

  return http.request(
    "post",
    `/api/auth/jwt/login`,
    { data },
    {
      headers: {
        "Content-Type": "application/x-www-urlencoded"
      }
    }
  );
};

export const getUserInfo = () => {
  return http.request("get", `/api/users/me`);

  // return new Promise<UserInfoResult>((resolve, reject) => {
  //   userInfoApi
  //     .self()
  //     .then(res => {
  //       if (res.code === 1000) {
  //         setUserInfo(res.data);
  //         resolve(res);
  //       } else {
  //         reject(res);
  //       }
  //     })
  //     .catch(error => {
  //       reject(error);
  //     });
  // });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};

export class UserApi extends CrudApi {
  constructor() {
    super("users");
  }

  register(data?: T) {
    return http.request<T>("post", `/${this.prefix}/register`, { data });
  }

  resetpwd(data?: T) {
    return http.request<T>("post", `/${this.prefix}/resetpwd`, { data });
  }
}
