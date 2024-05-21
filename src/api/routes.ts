/*
 * @Descripttion:
 * @version: 0.x
 * @Author: zhai
 * @Date: 2024-05-09 08:31:31
 * @LastEditors: zhai
 * @LastEditTime: 2024-05-10 14:08:40
 */
import { http } from "@/utils/http";
import { MenuApi } from "./menu";

type Result = {
  success: boolean;
  data: Array<any>;
};

// Omit<T, "id" | "name" | "path" | "parentId">

export const getAsyncRoutes = async () => {
  // return http.request<Result>("get", "/get-async-routes");

  // let ret = await new MenuApi().list();
  let ret = await new MenuApi().routes();

  const routes = ret.data.map(item => {
    const { id, name, path, parentId, ...rest } = item;
    return {
      id,
      name,
      path,
      parentId,
      meta: { ...rest, roles: null }
    };
  });

  let map = {};
  let data = [];

  routes.forEach(item => {
    map[item.id] = item;
  });

  routes.forEach(item => {
    if (item.parentId !== undefined && item.parentId !== 0) {
      if (!map[item.parentId].children) {
        map[item.parentId].children = [];
      }
      map[item.parentId].children.push(map[item.id]);
    } else {
      data.push(map[item.id]);
    }
  });

  return { data };
};
