import { t } from "elysia";

export namespace AuthModel {
    export const githubCallbackQuery = t.Object({
        code : t.String()
    })
    
    
}