import { Injectable } from "@angular/core";

/**
 * Сервис для аутентификации
 */
@Injectable({
  providedIn: "root",
})
export class AppService {
  public count = 15;
  public current = 1;
  constructor() {}
}
