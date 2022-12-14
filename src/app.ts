import express from 'express';
import config from './config';
import Currency from './currency/currency';
const AWS = require('aws-sdk');

const app = express();

//Setup AWS
AWS.config.update({
    region: "us-east-1",
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
})
const sns = new AWS.SNS()

app.use(express.json());
app.get('/api', (req, res) => {
    res.json("Welcome to currency API");
});

app.get('/api/status', (req, res) => {
    res.json({ status: "OK", sns })
})

app.post('/api/subscribe', (req, res) => {
    const params = {
        Protocol: "EMAIL",
        TopicArn: config.SNS_TOPIC_ARN,
        Endpoint: req.body.email,
    }

    sns.subscribe(params, (err: any, data: any) => {
        if (err) throw new Error(err)

        res.json(data);
    })
})


app.post('/api/usd/buy', (req, res) => {
    const currency = new Currency()
    const { userId, amount, } = req.body;

    if (!userId || amount <= 0) {
        return res.status(400).json({ error: `accountId is required and amount must be greater than zero` });
    }

    const usd = currency.buyUSD(amount);

    //send a push notification to bank Bee
    const params = {
        TopicArn: config.SNS_TOPIC_ARN,
        Subject: `Transaction Initiated`,
        Message: `Credit account number: ${userId} with ${usd} USD`
    }

    sns.publish(params, (err: any, data: any) => {
        if (err) throw new Error(err)

        console.log(data);
    })

    res.status(200).json(`Conversion of ${amount} NRA to USD in progress...`)
})

export default app;
