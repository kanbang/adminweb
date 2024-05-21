import { http } from "@/utils/http";
import { CrudApi } from "./crud-api";

export class MenuApi extends CrudApi {
  constructor() {
    super("menu");
  }

  // Query Many By Filter Value
  routes() {
    return http.request("post", `/${this.prefix}/routes`);
  }
}
