import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

export const QueryRequired = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const value = request.query[key];

    if (value === undefined || !isDateFormat(value)) {
      throw new BadRequestException(`Missing required query param: '${key}'`);
    }

    return value;
  },
);
function isDateFormat(val) {
  const regex_date = /^\d{4}-\d{1,2}-\d{1,2}$/;
  console.log(val);
  // Check the pattern
  if (!regex_date.test(val)) {
    return false;
  }
  const year = val[0] + val[1] + val[2] + val[3];
  const month = val[5] + val[6];
  const day = val[8] + val[9];
  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) {
    return false;
  }
  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
    monthLength[1] = 29;
  }
  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}
