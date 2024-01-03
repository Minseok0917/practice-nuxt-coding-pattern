import { Expose, plainToInstance } from "class-transformer";

class IUserFactory {}

class User {
  @Expose({ name: "user_name" }) name!: string;
  @Expose({ name: "age" }) age!: number;
}

const users = [
  {
    user_name: "정민석",
    age: 21,
  },
  {
    user_name: "권규량",
    age: 21,
  },
  {
    user_name: "윤장혁",
    age: 21,
  },
];

export function init() {
  const a: User[] = plainToInstance(User, users);
  console.log(a);
}
