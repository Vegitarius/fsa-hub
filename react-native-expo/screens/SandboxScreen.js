import React, {Component} from 'react';
import { View, StyleSheet, Image, Platform, TextInput, TouchableOpacity, Button } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Icon, Left, Right, Body } from 'native-base'; 
import SubcategoriesScreen from './SubcategoriesScreen';
import NavButton from "../components/NavButton"
import { graphql, ApolloProvider, compose } from 'react-apollo';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { createEvent } from "../graphql/mutations"
import { listEvents } from "../graphql/queries"
import moment from "moment";
import gql from "graphql-tag";
import { Query } from "react-apollo";


class SandboxScreen extends Component
{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    static defaultProps = {
      onAdd: () => null
  }

    // allEventWithData() {
    //     compose(
    //         graphql(listEvents, {
    //           options: {
    //             fetchPolicy: 'cache-and-network'
    //           },
    //           props: (props) => ({
    //             events: props.data.listEvents ? props.data.listEvents.items : [],
    //           })
    //         }),
    //         graphql(DeleteEvent, {
    //           options: {
    //             fetchPolicy: 'cache-and-network'
    //           },
    //           props: (props) => ({
    //             onDelete: (event) => {
    //               props.mutate({
    //                 variables: { id: event.id },
    //                 optimisticResponse: () => ({ deleteEvent: { ...event, __typename: 'Event', comments: { __typename: "CommentConnection", items: [], nextToken: null } } }),
    //               })
    //             }
    //           }),
    //           options: {
    //             refetchQueries: [{ query: listEvents }],
    //             update: (dataProxy, { data: { deleteEvent: { id } } }) => {
    //               const query = listEvents;
    //               const data = dataProxy.readQuery({ query });
    //               data.listEvents.items = data.listEvents.items.filter(event => event.id !== id);
    //               dataProxy.writeQuery({ query, data });
    //             }
    //           }
    //         }),
    //       )(listEvents);
    // }

    handleAdd = () => {
      const { id, name, where, when, description } = this.state;

      this.setState(this.getInitialState(), () => {
          this.addEventData({ id, name, where, when, description });
          this.props.navigation.goBack();
      });
  }

    addEventData() {
        compose(
            graphql(createEvent, {
              options: {
                refetchQueries: [{ query: listEvents }],
                update: (dataProxy, { data: { createEvent } }) => {
                  const query = listEvents;
                  const data = dataProxy.readQuery({ query });
                  data.listEvents = {
                    ...data.listEvents,
                    items: [
                      ...data.listEvents.items,
                      createEvent
                    ]
                  }
                  dataProxy.writeQuery({ query, data });
                }
              },
              props: (props) => ({
                onAdd: event => {
                  return props.mutate({
                    variables: event,
                    optimisticResponse: () => {
                      return {
                        createEvent: { ...event, __typename: 'Event', comments: { __typename: "CommentConnection", items: [], nextToken: null } }
                      }
                    },
                  });
                }
              })
            })
          )(createEvent);
    }

    getInitialState = () => ({
      id: '',
      name: '',
      where: '',
      when: 'when',
      whenText: 'when',
      description: '',
      isDateTimePickerVisible: false,
      whenColor:'#C1C1C1',
      events: [{name: 'Smith'}, {name: 'George'}]
  });

  handleChange = (field, value) => {
      this.setState({
          [field]: value
      });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
  
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  
  _handleDatePicked = (date) => {
      this.setState({
          when: date.toISOString(),
          whenText: moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a'),
          whenColor:'#000000',
      })
      this._hideDateTimePicker();
  };

  renderEvents() {

    const GET_EVENT = gql`
      query Event($name: Name!) {
          id,
          where,
          when
      }
  `;
      <Query query={GET_EVENT} variables={{ name: "Sprint Planning" }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
    
          return (
            <Text>{data.where}
              </Text>
            // <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
          );
        }}
      </Query>
  }

    saveButton = () => {
      if(Platform.OS === 'ios'){
          return (
              <View style={styles.footer}>
                  <Button title="Save" color='#ffffff' onPress={this.handleAdd}/>
              </View>
          )
      }else{
          const saveButtonStyle = {
              backgroundColor: '#42a1f4',
              color: '#ffffff',
              height: 75,
              fontSize: 20,
          }
          return(<Button title="Save" style={saveButtonStyle} onPress={this.handleAdd}/>)
      }
  }
    render()
    {
    
        return (
        <Container>
            <Content>
                {/* {this.state.events.map((event, i) => (
                  <Text key={i}>{event.name}</Text>
                ))} */}
                {this.renderEvents()}
                {/* <NavButton route="Subcategories" navigation={this.props.navigation} /> */}
                {/* <SubcategoriesScreen/> */}
                {/* <Button title="Add to GQL"color='#ffffff' onPress={this.handleAdd} /> */}
                <View style={styles.container}>
                <View style={styles.contentContainer}>
                    <TextInput autoFocus={true}
                        style={styles.eventName}
                        multiline={false}
                        value={this.state.name}
                        spellCheck={false}
                        onChangeText={this.handleChange.bind(this, 'name')} 
                        placeholderTextColor = "#C1C1C1"
                        placeholder="Event Name"/>
                    
                    <TextInput style={styles.eventWhere} 
                        value={this.state.where} 
                        onChangeText={this.handleChange.bind(this, 'where')} 
                        placeholder="Location"/>
                    
                    <TouchableOpacity onPress={this._showDateTimePicker}>
                        <Text style={styles.eventWhen} >{this.state.whenText}</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        mode='datetime'
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}/>

                    <TextInput style={styles.eventDescription} 
                        value={this.state.description} 
                        multiline={true}
                        onChangeText={this.handleChange.bind(this, 'description')} 
                        placeholder="More Info"/>
                </View>
                {this.saveButton()}
            </View>
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer:{
        flex: 1,
    },
    footer:{
        height: 50,
        backgroundColor:'#42a1f4'
    },
    eventWhen:{
        backgroundColor:'#ffffff',
        color: '#C1C1C1',
        fontSize: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#C1C1C1',
    },
    eventName:{
        fontSize: 40,
        padding : 10,
        marginBottom: 40,
        backgroundColor:'#ffffff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#C1C1C1'
    },
    eventDescription:{
        fontSize: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#C1C1C1',
        backgroundColor:'#ffffff',
    },
    eventWhere:{
        fontSize: 20,
        padding: 10,
        borderTopWidth: 0.5,
        borderTopColor: '#C1C1C1',
        borderBottomWidth: 0.5,
        borderBottomColor: '#C1C1C1',
        backgroundColor:'#ffffff',
    },
    saveButton:{
        fontSize: 20,
    }
});

export default SandboxScreen;