export class PublicScopeError extends Error {
  constructor() {
    super(`비공개 유저입니다`);
    this.name = 'PublicScopeError';
  }
}
