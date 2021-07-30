import React, { Component } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Card, ListItem } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class RecommendationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  timeConvert(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
  }

  getData = () => {
    const url = "http://d959883daf89.ngrok.io/recommended-movies";
    axios
      .get(url)
      .then(async (response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  keyExtractor = (item, index) => index.toString();

  //   renderItems = ({ item, index }) => {
  //     return (
  //       <Card
  //         key={`card-${index}`}
  //         image={{ uri: item.poster_link }}
  //         imageProps={{ resizeMode: "cover" }}
  //         featuredTitle={item.title}
  //         containerStyle={styles.cardContainer}
  //         featuredTitleStyle={styles.title}
  //         featuredSubtitle={`${
  //           item.release_date.split("-")[0]
  //         } | ${this.timeConvert(item.duration)}`}
  //         featuredSubtitleStyle={styles.subtitle}
  //       ></Card>
  //     );
  //   };

  renderItems = ({ item, index }) => {
    return (
      <ListItem key={`card-${index}`} containerStyle={styles.cardContainer}>
        <ListItem.Content>
          <Image
            source={{ uri: item.poster_link }}
            style={{
              resizeMode: "cover",
              width: 115,
              height: 115,
              marginLeft: 200,
            }}
          />
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{`${
            item.release_date.split("-")[0]
          } | ${this.timeConvert(item.duration)}`}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItems}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(25),
    marginTop: RFValue(65),
  },
  subtitle: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(15),
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    height: RFValue(110),
    marginBottom: RFValue(20),
  },
});
