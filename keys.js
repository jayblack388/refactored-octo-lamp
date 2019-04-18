console.log('this is loaded');

exports.cognito = {
	poolId: process.env.COGNITO_USER_POOL_ID,
	clientId: process.env.COGNITO_CLIENT_ID
};