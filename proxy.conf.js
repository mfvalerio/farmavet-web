const PROXY_CONFIG = [
{
  context: ['/farmavet'],
  target: 'http://farmavet-api.herokuapp.com/',
  secure: false,
  loglevel: 'debug',
  changeOrigin: true
}
];

module.exports = PROXY_CONFIG;
