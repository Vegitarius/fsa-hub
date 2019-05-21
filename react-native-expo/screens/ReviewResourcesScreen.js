import React, { Component } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import ReviewResourceFormScreen from './ReviewResourceFormScreen';
import { Container, Content, Item, Label, Text, Card, Button, Form, 
  Input, Header, Left, Right, Body, Picker } from 'native-base';
import { Ionicons } from "@expo/vector-icons"
import { API } from 'aws-amplify';


export default class ReviewResourcesScreen extends Component {
  constructor() {
    super();

    this.state = {
      links: [],
      processing: false,
      resourceInProcess: null,
      searchingFor: 'fsa'
    }
  }

  async componentDidMount() {
    const response = await API.get('resources', `/resources/${this.state.searchingFor}`)
    let notReviewed = response.filter(resource => resource.approved === undefined)
    this.setState({ links: notReviewed })
    // this.setState({ links: this.state.links.concat(fakeListOfNewResources)})
  }

  handleReviewResource(item, index) {
    this.setState({
      processing: true,
      resourceInProcess: item
    })
  }

  changeDirectorySearch = async value => {
    await this.setState({
      searchingFor: value
    })
   const response = await API.get('resources', `/resources/${this.state.searchingFor}`);
   let notReviewed = response.filter(resource => resource.approved === undefined)

   this.setState({ links: notReviewed })
  }
  
  revert = () => {
    this.setState({ processing: false })
  }

  render() {
    let toProcess = this.state.links.map((item, index) => {
      return (
        <Card key={index}>
          <Label>{item.name}</Label>
          <Text>{item.description}</Text>
          <Button onPress={() => this.handleReviewResource(item)}>
            <Text>
              Review Resource
            </Text>
          </Button>
        </Card>
      )
    })
    return !this.state.processing ?
    <View style={{ flex: 1, marginTop: Platform.OS === 'android' ? 24 : 0 }}>

        <Container>
          <Picker 
            selectedValue={this.state.searchingFor}
            onValueChange={(value) => this.changeDirectorySearch(value)}
          >
            <Picker.item label="FSA" value="fsa" />
            <Picker.item label='City Guide' value='cityGuide' />
            <Picker.item label='Finding Work' value='findingWork' />
          </Picker>
          <Content>
            {toProcess}
          </Content>
        </Container>
      </View>
      :
      <ReviewResourceFormScreen resource={this.state.resourceInProcess} />
  }
}

const fakeListOfNewResources = [
  {
    name: 'Valhalla Coffee Co.2',
    directory: 'cityByCity',
    schema: 'Tacoma',
    description: 'nice place for meetups',
    url: 'google.com',
    author: 'Vincent',
    rank: '80',
    status: false,
  },

  {
    name: 'Valhalla Coffee Co.2',
    directory: 'City Guide',
    schema: 'Tacoma',
    description: 'nice place for meetups',
    url: 'https://www.google.com/search?tbm=lcl&ei=gOg0XNPiDtW-0PEPwJGhoAM&q=valhalla+coffee+co.2&oq=valhalla+coffee+co.2&gs_l=psy-ab.3..38.14530.15580.0.16493.5.5.0.0.0.0.853.1232.0j3j6-1.4.0....0...1c.1.64.psy-ab..1.4.1230...0j0i67k1j0i22i30k1.0.CbYdY3fkWpw#rlfi=hd:;si:2414417899135471933;mv:!1m2!1d47.255117899999995!2d-122.438844!2m2!1d47.2420786!2d-122.4901013',
    author: 'Vincent',
    rank: 80,
    status: false,
  },

  {
    name: 'Valhalla Coffee Co.2',
    directory: 'City Guide',
    schema: 'Tacoma',
    description: 'nice place for meetups',
    url: 'https://www.google.com/search?tbm=lcl&ei=gOg0XNPiDtW-0PEPwJGhoAM&q=valhalla+coffee+co.2&oq=valhalla+coffee+co.2&gs_l=psy-ab.3..38.14530.15580.0.16493.5.5.0.0.0.0.853.1232.0j3j6-1.4.0....0...1c.1.64.psy-ab..1.4.1230...0j0i67k1j0i22i30k1.0.CbYdY3fkWpw#rlfi=hd:;si:2414417899135471933;mv:!1m2!1d47.255117899999995!2d-122.438844!2m2!1d47.2420786!2d-122.4901013',
    author: 'Vincent',
    rank: 80,
    status: false,
  },

  {
    name: 'Valhalla Coffee Co.2',
    directory: 'City Guide',
    schema: 'Tacoma',
    description: 'nice place for meetups',
    url: 'https://www.google.com/search?tbm=lcl&ei=gOg0XNPiDtW-0PEPwJGhoAM&q=valhalla+coffee+co.2&oq=valhalla+coffee+co.2&gs_l=psy-ab.3..38.14530.15580.0.16493.5.5.0.0.0.0.853.1232.0j3j6-1.4.0....0...1c.1.64.psy-ab..1.4.1230...0j0i67k1j0i22i30k1.0.CbYdY3fkWpw#rlfi=hd:;si:2414417899135471933;mv:!1m2!1d47.255117899999995!2d-122.438844!2m2!1d47.2420786!2d-122.4901013',
    author: 'Vincent',
    rank: 80,
    status: false,
  },

  {
    name: 'Valhalla Coffee Co.2',
    directory: 'FSA',
    schema: 'Getting Started',
    description: 'nice place for meetups',
    url: 'https://www.google.com/search?tbm=lcl&ei=gOg0XNPiDtW-0PEPwJGhoAM&q=valhalla+coffee+co.2&oq=valhalla+coffee+co.2&gs_l=psy-ab.3..38.14530.15580.0.16493.5.5.0.0.0.0.853.1232.0j3j6-1.4.0....0...1c.1.64.psy-ab..1.4.1230...0j0i67k1j0i22i30k1.0.CbYdY3fkWpw#rlfi=hd:;si:2414417899135471933;mv:!1m2!1d47.255117899999995!2d-122.438844!2m2!1d47.2420786!2d-122.4901013',
    author: 'Vincent',
    rank: 80,
    status: false,
  }
]