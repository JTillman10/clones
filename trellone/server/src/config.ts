export const Config = {
  preUrl: 'api',
  mongoUrl: 'mongodb://osubucks:jerome09@ds247449.mlab.com:47449/trellone',
  jwtOptions: {
    secretOrPrivateKey: 'secretKey',
    signOptions: { expiresIn: 7200 },
  },
};
