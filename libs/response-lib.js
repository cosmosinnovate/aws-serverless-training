
//#region 
export function success(body) {
  return buildResponse(200, body);

}
//#endregion

//#region 
export function failure(body) {
  return buildResponse(500, body);

}
//#endregion

//#region 
function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  }
}
//#endregion