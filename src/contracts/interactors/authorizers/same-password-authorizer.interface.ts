export interface ISamePasswordAuthorizer {
  authorize(oldPassword, newPassword): Promise<boolean>;
}
