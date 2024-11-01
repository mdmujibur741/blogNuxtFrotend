import { defineStore } from "pinia";
import { useCookie } from "#app";
import { useApiFetch } from "~/composable/useApiFetch";

export const useAuthStore = defineStore("auth", () => {
 
 
    //auth info
    const userCookie = useCookie("user").value;
    let user = null;
    if (typeof userCookie === "string") {
        try {
            user = JSON.parse(userCookie);
        } catch (e) {
            console.error("Error parsing user cookie:", e);
        }
    } else if (typeof userCookie === "object") {
        user = userCookie;
    }
    const userRoles = useCookie("roles", { default: () => null });
    const userPermissions = useCookie("permissions", { default: () => null });
    const auth_token = useCookie("auth_token");

    //isLogin
    const isLoggedIn = computed(() => !!auth_token.value);


    ///logout
    async function logout() {
        const { data, status, error, refresh, clear } = await useApiFetch(
            "api/logout",  {   method: "post", }
        );

        if (status.value === "error") {
            console.log(error.value.data.errors);
        } else {
            auth_token.value = null;
            userPermissions.value = null;
            userRoles.value = null;
            userCookie = null;
        }
        navigateTo("/login");
    }



    return {
        user: user,
        userRoles: userRoles.value,
        userPermissions: userPermissions.value,
        auth_token: auth_token,
        isLoggedIn,
        logout,
    };
});
