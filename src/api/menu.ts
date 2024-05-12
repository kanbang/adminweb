import { CrudApi } from "./crud-api";

export class MenuApi extends CrudApi {
  constructor() {
    super("menu");
  }

  // export_csv(id?: string) {
  //   return request({
  //     url: `/${this.prefix}/export_csv/${id}`,
  //     method: 'GET',
  //     responseType: "blob"
  //   });
  // }
}
