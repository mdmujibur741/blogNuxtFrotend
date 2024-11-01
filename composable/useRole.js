
export function useRole(role) {
    const userRoles = useCookie('roles')
    return userRoles.value.includes(role);
}
