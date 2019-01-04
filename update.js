import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from './libs/dynamodb-lib';


export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {}
  params.TableName = 'notes';
  params.Key = {
    userId: event.requestContext.identity.cognitoIdentityId,
    noteId: event.pathParameters.id
  }
  // 'UpdateExpression' defines the attributes to be updated
  // 'ExpressionAttributeValues' defines the value in the update expression
  params.UpdateExpression = "SET content = :content, attachment = :attachment";
  params.ExpressionAttributeValues = {
    ":attachment": data.attachment || null,
    ":content": data.content || null
  };
  // 'ReturnValues' specifies if and how to return the item's attributes,
  // where ALL_NEW returns all attributes of the item after the update; you
  // can inspect 'result' below to see how it works with different settings
  params.ReturnValues = "ALL_NEW";

  try {
    const result = await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (error) {
    return failure({ status: false });
  }
}