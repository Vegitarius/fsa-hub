import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Platform,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Notifications, Permissions } from "expo"
import {
  RkButton,
  RkText,
  RkCard,
  RkTheme,
} from 'react-native-ui-kitten';
import Event from "../components/Event"
import Loader from "../components/Loader";
import { Header, Left, Body, Right, Button, Title } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';
import { Ionicons } from "@expo/vector-icons"
import orderBy from "lodash.orderby";
import { API, Auth } from "aws-amplify"

export default class PaymentOptionsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      profile: null,
      product: { xpEarned: 0, achievements: 0 },
      apprenticeship: { xpEarned: 0, achievements: 0 },
      xp: null,
      loading: true

    }
   
  }
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    const session = await Auth.currentSession();  
     
    try {
      const username = await session.accessToken.payload.username;
      const token = await session.accessToken.jwtToken;
      const id = await session.accessToken.payload.sub;
      const values = [['accessToken', token], ['username', username], ['id', id]]
      await AsyncStorage.multiSet(values)

      await this.stopLoading();
      
    } catch(e) {
      // Improve error handling here
      this.setState({ loading: false })
      // alert(e)
      console.log(e)
    }
  }



  async stopLoading() {
    this.setState({ loading: false })
  }

  render() {

    const likeStyle = [styles.buttonIcon, { color: RkTheme.colors.accent }];
    const iconButton = [styles.buttonIcon, { color: RkTheme.current.colors.text.hint }];
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 24 : 0 }}>
        <Header>
          <Left>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Ionicons style={{color: Platform.OS === 'android' ? 'white' : 'black', paddingLeft: 10 }} name="md-menu" size={32} />
            </TouchableOpacity>
          </Left>
          <Body>
            {/* <Title>#fsa206</Title> */}
          </Body>
          <Right>
            <View></View>
          </Right>
        </Header>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}>

          <RkCard>
            <View rkCardHeader={true}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../assets/michael.jpg')} style={styles.avatar} />
                <View style={{}}>
                  <RkText rkType='header'>My Apprenticeship Trainer</RkText>
                  <RkText rkType='subtitle'>Michael Litchev</RkText>
                </View>
              </View>
              {/* <RkButton rkType='clear'>
              <Icon name="group" style={iconButton} />
               <Text>{'\n'}</Text>
              <Text>Switch Instructor</Text> 

                 <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" />
                <Icon style={styles.dot} name="circle" /> 

              </RkButton>  */}
            </View>            
          </RkCard>

          <Loader loading={this.state.loading} />

          <RkCard>
          <View rkCardHeader={true}>
              <View>
                <RkText rkType='header'>Full-Stack JumpStart</RkText>
                <RkText rkType='subtitle'>Learn the habits, workflows & mindset of a development team.</RkText>
              </View>
            </View>
            <View rkCardContent={true}>
              <RkText rkType='compactCardText'>
              A month-long program to help you build the habits that will make you a successful student, who can successfully transition into development.{'\n'}{'\n'}
              Week 1 is focused on collecting context for the journey ahead, setting goals, planning your portfolio product & setting up your development environment. {'\n'}{'\n'}
              Weeks 2, 3 & 4 are about setting habits. Scientifically speaking, it takes 21 days to set a habit. By building the habit of submitting at least one pull-request a day, 6 days a week, you will build the foundation for success. {'\n'}{'\n'}
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="dollar" style={likeStyle} />
                <RkText rkType='accent'>450.00</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="clock-o" style={iconButton} />
                <RkText rkType='hint'>1 Month</RkText>
              </RkButton>
              <RkButton rkType='clear link' onPress={() => navigation.navigate('PaymentScreen', {
                amount: '450'
              })}>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>Pay Here</RkText>
              </RkButton>
            </View>
          </RkCard>
          <Text>{'\n'}</Text>

          <RkCard>
          <View rkCardHeader={true}>
              <View>
                <RkText rkType='header'>Weekly Sprint Training</RkText>
                <RkText rkType='subtitle'>Professional accountability & pair programming</RkText>
              </View>
            </View>
            <View rkCardContent={true}>
              <RkText rkType='compactCardText'>
              Saturday/Sunday - Weekly Sprint Planning Meeting to organize & estimate the work to be done throughout the duration of the sprint.{'\n'}{'\n'}
              Monday thru Friday - Daily Stand-up Meetings (am or pm) during the week to check-in on what you've done, are stuck on, and what you are working on that day. Accountability, structure, discipline. {'\n'}{'\n'}
              Friday - Weekly Sprint Retrospective Meeting to review the finished work, compare the time it took compared to our original estimates, & learn how we can more effectively operate as a team. {'\n'}{'\n'}
              </RkText>
            </View>
            <View rkCardFooter={true} style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="dollar" style={likeStyle} />
                <RkText rkType='accent'>100.00</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="clock-o" style={iconButton} />
                <RkText rkType='hint'>1 Week</RkText>
              </RkButton>
              <RkButton rkType='clear link' onPress={() => navigation.navigate('PaymentScreen', {
                amount: '100'
              })}>
                <Icon name="send-o" style={iconButton} />
                <RkText rkType='hint'>Pay Here</RkText>
              </RkButton>
            </View>
          </RkCard>
          <Text>{'\n'}</Text>

        </ScrollView>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f0f1f5',
    padding: 12,
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7,
  },
  footer: {
    marginHorizontal: 16,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 17,
  },
  header: {
    fontSize: 30,
    paddingLeft: 14,
    textAlign: 'left'
  },
  dot: {
    fontSize: 6.5,
    color: '#0000008e',
    marginLeft: 2.5,
    marginVertical: 10,
  },
  floating: {
    width: 56,
    height: 56,
    position: 'absolute',
    zIndex: 200,
    right: 16,
    top: 173,
    backgroundColor: 'purple'
  },
  footerButtons: {
    flexDirection: 'row',
  },
  overlay: {
    justifyContent: 'flex-end',
    paddingVertical: 23,
    paddingHorizontal: 16,
  },
});
