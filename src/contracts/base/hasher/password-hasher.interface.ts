export interface IPasswordHasher {
  hash(passwordText: string): Promise<string>;
}
