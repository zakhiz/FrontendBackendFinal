import  Jwt  from "jsonwebtoken";
const st = import.meta.env.VITE_PALABRA_ST
 export default function code (){
   let codes;
   let cookiejwt = document.cookie.split(";").find(cookie => cookie.startsWith("itZ2zXYh6X="));
   let cookieNew = cookiejwt.split('=')[1];
   codes = Jwt.verify(cookieNew,st);
   return codes
}