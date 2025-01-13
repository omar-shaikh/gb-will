import { CognitoUserPool } from 'amazon-cognito-identity-js';

// AWS Cognito User Pool configuration
const poolData = {
    UserPoolId:"us-west-1_jXxtkaOIV",
    ClientId: "51cma49vlhq29g32cf3cq1ck98"
};

// Create and export a new Cognito User Pool instance
const UserPool = new CognitoUserPool(poolData);

export default UserPool;
