import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { verify, JwtHeader, JwtPayload, SigningKeyCallback } from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CognitoUser } from '@/domain/entity/cognito/cognito-user.entity';

export const Guard = createParamDecorator(async (_, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context).getContext();
  const token: string = ctx.req?.headers?.authorization;

  try {
    const docoded = await verifyToken(token);
    return new CognitoUser(docoded);
  } catch (error) {
    throw new Error('Unauthorized');
  }
});

const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
  if (!header.kid) throw new Error('kid does not exist.');

  const client = jwksClient({
    jwksUri: `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
  });

  client.getSigningKey(header.kid, (err, key) => {
    if (err) throw err;
    callback(null, key.getPublicKey());
  });
};

const verifyToken = (token: string) => {
  return new Promise<JwtPayload>((resolve, reject) => {
    verify(token, getKey, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as JwtPayload);
    });
  });
};
