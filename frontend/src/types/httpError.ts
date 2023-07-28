import * as t from 'io-ts';

export const httpErrorTypeObject = {
  statusCode: t.number,
  message: t.string,
};

export const unknownFormatError = {
  statusCode: 500,
  message: 'Unknown error',
};

export const httpErrorIo = t.type(httpErrorTypeObject);

export type HttpError = t.TypeOf<typeof httpErrorIo>;
