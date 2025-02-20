import { Permissions } from "./schema";


export const checkUserPermissions = 
(permissions:Permissions[], code:string) => {
  // console.log(permissions)
  let pemission:Permissions[] = permissions
  .filter((data:Permissions) => data.key === code)
  // console.log(pemission[0])
  if(pemission.length > 0){
    return pemission[0].value;
  }else{
    return false;
  }
  
}
