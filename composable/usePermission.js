
export function usePermission(permission) {
    const userPermissions = useCookie('permissions') ;

    if (userPermissions.value && Array.isArray(userPermissions.value)) {
        return userPermissions.value.includes(permission);
      }
      
      // Return false if there's no data
      return false;
    // return userPermissions.value.includes(permission);
}
