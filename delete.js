import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from './libs/dynamodb-lib';


export async function main(event, context) {
  const params = {}
  params.TableName = 'notes';
  params.Key = {
    userId: event.requestContext.identity.cognitoIdentityId,
    noteId: event.pathParameters.id
  }

  try {
    const result = await dynamoDbLib.call('delete', params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
}