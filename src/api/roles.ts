import { CrudApi } from "./crud-api";

export class RolesApi extends CrudApi {
  constructor() {
    super("roles");
  }

  // export_csv(id?: string) {
  //   return request({
  //     url: `/${this.prefix}/export_csv/${id}`,
  //     method: 'GET',
  //     responseType: "blob"
  //   });
  // }
}
