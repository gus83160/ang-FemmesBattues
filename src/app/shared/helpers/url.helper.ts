export function getQueryParam(prop: any) {
  var params = {};
  var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  var definitions = search.split('&');
  definitions.forEach(function (val, key) {
    var parts = val.split('=', 2);
    // @ts-ignore
    params[parts[0]] = parts[1];
  });
  // @ts-ignore
  return (prop != null && prop in params) ? params[prop] : params;
}
