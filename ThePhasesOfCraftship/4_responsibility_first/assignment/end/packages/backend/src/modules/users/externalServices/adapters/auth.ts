import { Config } from "../../../../shared/config";
import ExpressJwt, { expressjwt } from 'express-jwt'
import jwksRsa from 'jwks-rsa'

export function createJwtCheck (config: Config) {
  const checkJwt = expressjwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.auth0.domain}/.well-known/jwks.json`
    }) as ExpressJwt.GetVerificationKey,
  
    // Validate the audience and the issuer.
    audience: config.auth0.audience,
    issuer: `https://${config.auth0.domain}/`,
    algorithms: ['RS256']
  });

  return checkJwt
}
