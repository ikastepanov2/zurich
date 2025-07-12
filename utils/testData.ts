import { text } from "stream/consumers";

export const credentials = {
  username: 'Admin',
  password: 'admin123'
};


export function generateUserData() {
  const rand = Math.floor(Math.random() * 10000);
  return {
    username: `autoUser_${rand}`,
    password: `Pass${rand}!`,
    firstName: `firstName_${rand}`,
    lastName: `lastName${rand}`,
    middleName: `middleName${rand}`,
    employeeId: `employeeId${rand}`,

  };
}