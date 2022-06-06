const PROXY_CONFIG = [
{
  context: ['/farmavet'],
  target: 'https://farmavet.herokuapp.com/',
  secure: false,
  loglevel: 'debug',
  changeOrigin: true
}
];

module.exports = PROXY_CONFIG;
