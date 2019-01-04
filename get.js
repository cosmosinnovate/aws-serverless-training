import { success, failure } from "./libs/response-lib";
import * as dynamoDbLib from './libs/dynamodb-lib';


export async function main(event, context) {

  const params = { //#endregion
    TableName: 'notes',
    /**
     * 'Key' define the partition key and the sort key of the item to be retrieved
     * - 'userId': Identity pool id of the authenticated user
     * - 'noteId': parth parameter
     */
    Key: { 
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  }

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      return success(result.Item);
    } else {
      return failure({ status: false, error: 'Item not found' });
    }
  } catch (error) {
    return failure({ status: false });
  }


}