import { text } from "stream/consumers";

export const credentials = {
  username: 'Admin',
  password: 'admin123'
};

export const employee = {
  firstName: 'John'.concat((Math.random()).toString(36).substring(7)),
  lastName: 'Doe'.concat((Math.random()).toString(36).substring(15))
};

export function generateUserData() {
  const rand = Math.floor(Math.random() * 10000);
  return {
    username: `autoUser_${rand}`,
    password: `Pass${rand}!`
  };
}