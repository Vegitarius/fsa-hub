import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import {
  RkCard, RkStyleSheet,
  RkText, RkButton
} from 'react-native-ui-kitten';
import { Button, Text } from "native-base";
const BlockContent = require('@sanity/block-content-to-react')

export default class ChapterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

  render() {
    
      const schema = this.props.navigation.getParam('schema', 'None')
      const title = schema.title;
      const subtitle = schema.subtitle;
      const overview = schema.overview;
      const chapter = schema.chapter;
      
      
    return(
        <ScrollView>
        <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}>
        <RkCard rkType='blog' style={styles.card}>
            <Image rkCardImg source={require('../assets/blueprint.jpg')} />
            <View rkCardHeader style={styles.content}>
            <RkText style={{fontSize: 24}} rkType='header4'>{title}</RkText>
            <RkText style={{fontSize: 18 }} rkType='header4'>Chapter {chapter}</RkText>

            </View>
            <RkText style={{marginLeft: 10, fontSize: 16}}>{subtitle}</RkText>
            <View rkCardContent>
            <View>
                <BlockContent blocks={overview} />
                <RkText>{'\n'}</RkText>
            </View>
            </View>
        </RkCard>

        {/* {complete === false ? (
          <Button full style={{backgroundColor: "#6200EE"}} onPress={this.handlePress}><Text>Mark Complete</Text></Button>

        ) : (<Button full disabled style={{backgroundColor: "gray"}}><Text>Achievement Unlocked</Text></Button>
        )
      } */}
        <Text>{'\n'}</Text>
        </TouchableOpacity>
        </ScrollView>
  );
      }

    }

const styles = RkStyleSheet.create(theme => ({
  // container: {
  //   backgroundColor: theme.colors.screen.scroll,
  //   paddingVertical: 8,
  //   paddingHorizontal: 14,
  // },
  card: {
    marginVertical: 8,
  },
  userInfo: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  avatar: {
    marginRight: 17,
  },
}));
