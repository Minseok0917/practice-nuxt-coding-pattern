class IUserFactory {}

export class User {
  private name!: string;
  private age!: number;

  get getUser() {
    return {
      name: this.name,
      age: this.age,
    };
  }

  setName(name: string) {
    this.name = name;
  }
}
