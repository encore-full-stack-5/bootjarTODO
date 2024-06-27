export class NotFriendError extends Error {
  constructor() {
    super(`해당 유저와는 친구가 아닙니다`);
    this.name = 'NotFriendError';
  }
}
