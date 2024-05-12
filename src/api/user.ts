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
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "/login", { data });
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
}
