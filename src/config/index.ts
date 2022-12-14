import dotenv from 'dotenv'
dotenv.config()

export default {
    PORT: process.env.PORT,
    SNS_TOPIC_ARN: process.env.SNS_TOPIC_ARN,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION
}