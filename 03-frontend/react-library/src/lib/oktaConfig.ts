export const oktaConfig = {
    clientId: '0oag00q7z3yIaV9Fi5d7',
    issuer: 'https://dev-09593720.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}