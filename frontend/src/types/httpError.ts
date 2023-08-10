import * as t from 'io-ts';

export const httpErrorTypeObject = {
  message: t.string,
  statusCode: t.number,
};

export const unknownFormatError = {
  message: 'Unknown error',
  statusCode: 500,
};

export const httpErrorIo = t.type(httpErrorTypeObject);

export type HttpError = t.TypeOf<typeof httpErrorIo>;
