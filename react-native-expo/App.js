import React, {Component} from 'react';
import Amplify, { Auth, API } from "aws-amplify";
import awsmobile from "./aws-exports"
import config from "./config";
import { Font, AppLoading } from "expo";
import appSyncConfig from "./src/aws-exports";
import AWSAppSyncClient from "aws-appsync";


import AppNavigator from './config/navigation'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }
    async componentDidMount() {
        await this.configure()
        console.log('Export info: ', awsmobile)
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
          });
        const client = new AWSAppSyncClient({
            url: appSyncConfig.aws_appsync_graphqlEndpoint,
            region: appSyncConfig.aws_appsync_region,
            auth: {
              type: appSyncConfig.aws_appsync_authenticationType,
              apiKey: appSyncConfig.aws_appsync_apiKey,
            }
          });
        console.log('GraphQL info: ', client)

    }

    async configure() {
        const result = await Amplify.configure({
          Auth: {
              mandatorySignIn: false,
              region: config.cognito.REGION,
              userPoolId: config.cognito.USER_POOL_ID,
              identityPoolId: config.cognito.IDENTITY_POOL_ID,
              userPoolWebClientId: config.cognito.APP_CLIENT_ID
          },
        //   Storage: {
        //       region: config.s3.REGION,
        //       bucket: config.s3.BUCKET,
        //       identityPoolId: config.cognito.IDENTITY_POOL_ID
        //   },
        //   API: {
        //       endpoints: [
        //           {
        //               name: "fsa",
        //               endpoint: config.apiGateway.URL,
        //               region: config.apiGateway.REGION
        //           },
        //       ]
        //   }
      });
    //   console.log('Result: ', result);
      }

      

    

    render() {
        return (
          <AppNavigator/>
        );
    }
}

export default App;
