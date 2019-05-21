import React, { Component } from 'react';
import { Container, Content, Item, Label, Text, Form, Input, Picker, Slider } from 'native-base';
import {
  fullStackApprenticeship,
  cityByCity,
  findingWork
} from '../components/directories';

class ReviewResourceFormScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.resource.name,
      directory: this.props.resource.directory,
      schemas: [],
      schema: this.props.resource.schema,
      description: this.props.resource.description,
      url: this.props.resource.url,
      author: this.props.resource.author,
      rank: this.props.resource.rank
    }
  }

  async componentDidMount() {
    await this.updateSchemas(this.props.resource.directory)
  }

  updateSchemas(directoryValue) {
    this.setState({ directory: directoryValue })
    switch (directoryValue) {
      case 'fsa':
        this.setState({ schemas: fullStackApprenticeship })
        break;
      case 'cityByCity':
        this.setState({ schemas: cityByCity })
        break;
      case 'findingWork':
        this.setState({ schemas: findingWork })
        break;
      default:
        break;
    }
  }

  changeDirectory = async e => {
    await this.setState({
      directory: e.target.value
    })
    await this.updateSchemas();
  }

  handleFormApproval = async event => {
    event.preventDefault();

    const body = {
      resourceId: this.props.formInfo.resourceId,
      timestamp: this.props.formInfo.timestamp,
      directory: this.state.directory,
      schema: this.state.schema,
      name: this.state.name,
      description: this.state.description,
      author: this.state.url,
      url: this.state.url,
      rank: this.state.rank,
      approved: true      
    }

      const mutation = {
        _type: this.state.schema,
        title: this.state.name,
        overview: this.state.description,
        url: this.state.url,
        priority: this.state.rank
    }

    try {
      const response = await API.put('resources', '/resources', {body})
      console.log('approved response', response)
      console.log(JSON.stringify(mutation))
      sanity.create(mutation).then(response => {
        console.log('Document created: ', response)
      })
      // await this.sanityPost(JSON.stringify((mutation)))
    } catch(e) {
      console.log("ERROR not approved", e)
    }
  }

  handleFormDenial = async event => {
    event.preventDefault();

    const body = {
      resourceId: this.props.formInfo.resourceId,
      timestamp: this.props.formInfo.timestamp,
      directory: this.state.directory,
      schema: this.state.schema,
      name: this.state.name,
      description: this.state.description,
      // author: this.state.url,
      url: this.state.url,
      rank: this.state.rank,
      approved: false      
    }

    try {
      const response = await API.put('resources', '/resources', {body})
      console.log('denied response', response)
    } catch(e) {
      console.log("ERROR not denied", e)
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  changeSchema = e => {
    this.setState({ schema: e.target.value })
  }

  render() {
    let schemas = this.state.schemas.map((schema, index) => 
      <Picker.item label={schema.name} value={schema.name} key={index} />)
    return (
      <Container>
        <Content>
          <Label>
            Processing Resource
          </Label>
          <Text>
            Check over the resource from spelling / punctuation
            errors and give it your approval or the boot
          </Text>
          <Form>
            <Item floatingLabel>
              <Label>Resource Name</Label>
              <Input
                value={this.state.resourceName}
                onChangeText={(resourceName) => this.setState({ resourceName })}
              />
            </Item>

            <Item>
              <Label>Directory</Label>
              <Picker
                selectedValue={this.state.directory}
                onValueChange={(directoryValue) => this.updateSchemas(directoryValue) }                
                >
                <Picker.item label='FSA' value='fsa' />
                <Picker.item label='City By City' value='cityByCity' />
                <Picker.item label='Finding Work' value='findingWork' />
              </Picker>
            </Item>

            <Item>
              <Label>Schema</Label>
              <Picker
                selectedValue={this.state.schema}
                onValueChange={schema => this.setState({ schema })}
              >
              {schemas}
              </Picker>
            </Item>

            <Item floatingLabel>
              <Label>Description</Label>
              <Input 
                value={this.state.description}
                onChangeText={(description) => this.setState({ description })}
              />
            </Item>

            <Item floatingLabel>
              <Label>URL</Label>
              <Input 
                value={this.state.url}
                onChangeText={url => this.setState({ url })}
              />
            </Item>

            <Item floatingLabel>
              <Label>Resource Author</Label>
              <Input
                value={this.state.author}
                onChangeText={author => this.setState({ author })}
              />
            </Item>

            <Item floatingLabel>
              <Label>Rank</Label>
              <Input 
                value={this.state.rank}
                keyboardType='numeric'
                onChangeText={rank => this.setState({ rank })}
              />
            </Item>


            <Button onPress={this.handleFormApproval}>
              Approve Resource
            </Button>
            <Button onPress={this.handleFormDenial}>
              Deny Resource
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

export default ReviewResourceFormScreen;