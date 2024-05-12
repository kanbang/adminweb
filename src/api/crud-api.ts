import { http } from "@/utils/http";

/**
 * 用户接口
 * @method getUserList 获取用户列表
 * @method allMenu 获取菜单接口，平铺
 * @method upsertMenu 更新保存菜单
 */

// /** 获取系统管理-用户管理列表 */
// export const getUserList = (data?: object) => {
//     return http.request<ResultTable>("post", "/user", { data });
// };

// /** 系统管理-用户管理-获取所有角色列表 */
// export const getAllRoleList = () => {
//     return http.request<Result>("get", "/list-all-role");
// };

// TODO 单例

export class CrudApi<T = object> {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = "api/" + prefix;
  }

  // Create One
  create(data?: T) {
    return http.request<T>("post", `/${this.prefix}/create`, { data });
  }

  // Delete By Key
  delete(key?: number) {
    let params = { item_id: key };
    return http.request("post", `/${this.prefix}/delete`, { params });

    //     let params = new URLSearchParams();
    //     params.append('item_id', key);
    //     let str_params = params.toString();
    //     if (str_params.length > 0) {
    //         str_params = '?' + str_params;
    //     }

    //     return request({
    //         url: `/${this.prefix}/delete/${str_params}`,
    //         method: 'POST'
    //     });
  }

  // Delete All
  delete_all(data?: T) {
    return http.request("post", `/${this.prefix}/delete_all`);
    // return request({
    //     url: `/${this.prefix}/delete_all`,
    //     method: 'POST',
    //     data,
    // });
  }

  // Update One By Key
  update(data?: T) {
    return http.request<T>("post", `/${this.prefix}/update`, { data });
    // return request({
    //     url: `/${this.prefix}/update`,
    //     method: 'POST',
    //     data,
    // });
  }

  // Get One By Filter Value
  get_by_id(data?: T) {
    return http.request<T>("post", `/${this.prefix}/get_by_id`, { data });
    // return request({
    //     url: `/${this.prefix}/get_by_id`,
    //     method: 'POST',
    //     data,
    // });
  }

  // Get One By Filter Value
  get_one_by_filter(
    data?: T,
    relationships: boolean | null = null,
    user_data_filter: boolean | null = null
  ) {
    let params = new URLSearchParams();
    if (relationships !== null)
      params.append("relationships", relationships.toString());
    if (user_data_filter !== null) {
      if (user_data_filter) params.append("user_data_filter", "SELF_DATA");
      else params.append("user_data_filter", "ALL_DATA");
    }

    let str_params = params.toString();

    if (str_params.length > 0) {
      str_params = "?" + str_params;
    }
    return http.request<T>(
      "post",
      `/${this.prefix}/get_one_by_filter${str_params}`,
      { data }
    );

    // return request({
    //     url: `/${this.prefix}/get_one_by_filter${str_params}`,
    //     method: 'POST',
    //     data,
    // });
  }

  // List All
  list(
    sort_by: string | null = null,
    relationships: boolean | null = null,
    skip: number | null = null,
    limit: number | null = null,
    user_data_filter: boolean | null = null
  ) {
    // 'http://localhost:8000/api/form_schema/list?sort_by=id&relationships=false&skip=0&limit=0' \

    // const params = new URLSearchParams({
    //   foo: 'bar',
    //   baz: 'boom',
    //   cow: 'milk',
    //   php: 'hypertext processor'
    // });

    let params = new URLSearchParams();
    if (sort_by !== null) params.append("sort_by", sort_by);
    if (relationships !== null)
      params.append("relationships", relationships.toString());
    if (skip !== null) params.append("skip", skip.toString());
    if (limit !== null) params.append("limit", limit.toString());
    if (user_data_filter !== null) {
      if (user_data_filter) params.append("user_data_filter", "SELF_DATA");
      else params.append("user_data_filter", "ALL_DATA");
    }

    let str = params.toString();

    if (str.length > 0) {
      str = "?" + str;
    }

    return http.request<T>("post", `/${this.prefix}/list${str}`);

    // return request({
    //     url: `/${this.prefix}/list${str}`,
    //     method: 'POST',
    // });
  }

  // Query Many By Filter Value
  query(data?: T) {
    return http.request<T>("post", `/${this.prefix}/query`, data);
    // return request({
    //     url: `/${this.prefix}/query`,
    //     method: 'POST',
    //     data,
    // });
  }

  // Query Many By Filter Condition, [=, !=, >, <, >=, <=, like, in]
  query_ex(data?: T) {
    return http.request<T>("post", `/${this.prefix}/query_ex`, data);
    // return request({
    //     url: `/${this.prefix}/query_ex`,
    //     method: 'POST',
    //     data,
    // });
  }

  // Insert Or Update
  upsert(data?: T) {
    return http.request<T>("post", `/${this.prefix}/upsert`, data);
    // return request({
    //     url: `/${this.prefix}/upsert`,
    //     method: 'POST',
    //     data,
    // });
  }
}

// https://stackoverflow.com/questions/41089854/typescript-access-static-attribute-of-generic-type

// class GenericClass<STR> {
//   s: string = STR.str;
// }

// class SS {
//   static str: string = "test";
// }

// class ChildClass extends GenericClass<SS> {
//   logstr() {
//     console.log(this.s);
//   }
// }

// export class FormSchemaApi extends CrudApi<FormSchemaApi> {
//   static __prefix: string = "form_schema";
// }

// new ChildClass().logstr()
