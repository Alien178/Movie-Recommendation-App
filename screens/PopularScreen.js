import React, { Component } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Card, ListItem } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class PopularScreen extends Component {
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
    const url = "http://d959883daf89.ngrok.io/popular-movies";
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
  //       <Card key={`card-${index}`} containerStyle={styles.cardContainer}>
  //         <Card.Image
  //           source={{ uri: item.poster_link }}
  //           style={{
  //             resizeMode: "cover",
  //             width: 100,
  //             height: 100,
  //             alignSelf: "flex-start"
  //           }}
  //         ></Card.Image>
  //         <Card.Title style={styles.title}>{item.title}</Card.Title>
  //         <Card.FeaturedSubtitle style={styles.subtitle}>{`${
  //           item.release_date.split("-")[0]
  //         } | ${this.timeConvert(item.duration)}`}</Card.FeaturedSubtitle>
  //       </Card>
  //     );
  //   };

  renderItems = ({ item, index }) => {
    return (
      <ListItem key={`card-${index}`} containerStyle={styles.cardContainer} bottomDivider>
        <ListItem.Content>
          <Image
            source={{ uri: item.poster_link }}
            style={{
              resizeMode: "cover",
              width: 105,
              height: 105,
              //marginLeft: 200,
              alignSelf: "flex-end"
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
    color: "#000",
    alignSelf: "flex-start",
    paddingLeft: RFValue(60),
    fontSize: RFValue(20),
    marginTop: RFValue(-65),
  },
  subtitle: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(15),
    color: "#000",
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    height: RFValue(110),
    marginTop: RFValue(20),
  },
});
