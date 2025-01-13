import AWS from "aws-sdk";

// Set up AWS configuration
AWS.config.update({
    region: "us-west-1", // Replace with your AWS region, e.g., 'us-west-2'
});

// Create a DocumentClient for DynamoDB interactions
const docClient = new AWS.DynamoDB.DocumentClient();

/**
 * Saves user data to DynamoDB
 * @param {Object} data - The data to save, including userId and other fields
 */
export const saveUserDataToDynamoDB = async (data) => {
    const params = {
        TableName: "UserExtraData", // DynamoDB table name
        Item: data,
    };

    try {
        await docClient.put(params).promise();
        console.log("Data saved successfully.");
    } catch (error) {
        console.error("Error saving data:", error);
        throw error;
    }
};

/**
 * Fetches user data from DynamoDB
 * @param {string} userId - The userId of the user whose data to fetch
 * @returns {Object} - The user data retrieved from DynamoDB
 */
export const fetchUserDataFromDynamoDB = async (userId) => {
    const params = {
        TableName: "UserExtraData",
        Key: { userId },
    };

    try {
        const data = await docClient.get(params).promise();
        return data.Item; // Return the user data
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
