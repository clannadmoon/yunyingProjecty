/*
 * @Description: 这里输入文件功能
 * @Author: zhoupeng
 * @Date: 2020-11-20 10:59:18
 */

export const routeDATA = [
    {
        "id": "1",
        "icon": "dashboard",
        "name": "Dashboard",
        "zh": {
            "name": "仪表盘"
        },
        "pt-br": {
            "name": "Dashboard"
        },
        "route": "/dashboard"
    },
    {
        "id": "2",
        "breadcrumbParentId": "1",
        "name": "Users",
        "zh": {
            "name": "运营商管理"
        },
        "pt-br": {
            "name": "Usuário"
        },
        "icon": "user",
        "route": "/user"
    },
     {
        "id": "21",
        "menuParentId": "-1",
        "breadcrumbParentId": "2",
        "name": "User Detail",
        "zh": {
            "name": "企业工商信息"
        },
        "pt-br": {
            "name": "Detalhes do usuário"
        },
        "route": "/user/:id"
    },
    {
        "id": "7",
        "menuParentId": "-1",
        "breadcrumbParentId": "2",
        "name": "User Detail",
        "zh": {
            "name": "运营商新增"
        },
        "pt-br": {
            "name": "Detalhes do usuário"
        },
        "route": "/userAdd"
    },
];
 

export const userDATA = {
    "success": true,
    "user":
    {
        "id": 1,
        "username": "guest",
        "permissions":
        {
            "visit": ["1", "2", "21", "7", "5", "51", "52", "53"], "role": "guest"
        },
        "avatar": "//image.zuiidea.com/photo-1489779162738-f81aed9b0a25.jpeg?imageView2/1/w/200/h/200/format/webp/q/75|imageslim"
    }
}

export const loginDATA =  {
    accessToken: "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ0ZW5hbnRfaWQiOiIwMDAwMDAiLCJyb2xlX25hbWUiOiJhZG1pbmlzdHJhdG9yIiwidXNlcl9pZCI6IjExMjM1OTg4MjE3Mzg2NzUyMDEiLCJyb2xlX2lkIjoiMTEyMzU5ODgxNjczODY3NTIwMSIsInVzZXJfbmFtZSI6ImFkbWluIiwidG9rZW5fdHlwZSI6ImFjY2Vzc190b2tlbiIsImFjY291bnQiOiJhZG1pbiIsImNsaWVudF9pZCI6InN3b3JkIiwiZXhwIjoxNjA1NzkwMzg2LCJuYmYiOjE2MDU3ODY3ODZ9.pQTOYzUAm35189A2CCvrtk7P__2dXYD9MyK4PcsS8vQ",
    account: "admin",
    authority: "administrator",
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    expiresIn: 3600,
    license: "powered by blade",
    refreshToken: "eyJ0eXAiOiJKc29uV2ViVG9rZW4iLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpc3N1c2VyIiwiYXVkIjoiYXVkaWVuY2UiLCJ1c2VyX2lkIjoiMTEyMzU5ODgyMTczODY3NTIwMSIsInRva2VuX3R5cGUiOiJyZWZyZXNoX3Rva2VuIiwiY2xpZW50X2lkIjoic3dvcmQiLCJleHAiOjE2MDYzOTE1ODYsIm5iZiI6MTYwNTc4Njc4Nn0.RbcqrkFog3DYw_gTOnKinGKkZQ4SaMDimdZU_hHjXHc",
    tokenType: "bearer",
    userName: "管理员",     
  }