export class UserNotFoundError extends Error {
  constructor() {
    super(`존재하지 않는 유저입니다`);
    this.name = 'UserNotFoundError';
  }
}
