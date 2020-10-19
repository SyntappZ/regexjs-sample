/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import SavedItem from "./SavedItem";

let containerCount = 0;

class CellContainer extends React.Component {
  constructor(args) {
    super(args);
    this._containerId = containerCount++;
  }
  render() {
    return <View {...this.props}>{this.props.children}</View>;
  }
}

/***
 * To test out just copy this component and render in you root component
 */
export default class ListViewContainer extends React.Component {
  constructor(args) {
    super(args);

    let width = Dimensions.get("window").width;

    //Create the data provider and provide method which takes in two rows of data and return if those two are different or not.
    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    //Create the layout provider
    //First method: Given an index return the type of item e.g ListItemType1, ListItemType2 in case you have variety of items in your list/grid
    //Second: Given a type and object set the height and width for that type on given object
    //If you need data based check you can access your data provider here
    //You'll need data in most cases, we don't provide it by default to enable things like data virtualization in the future
    //NOTE: For complex lists LayoutProvider will also be complex it would then make sense to move it to a different file
    this._layoutProvider = new LayoutProvider(
      (index) => {
        return 0;
      },
      (type, dim) => {
        dim.width = width;
        dim.height = 60;
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows(this.props.listData),
    };
  }

  // _generateArray(n) {
  //   let arr = [];
  //   for (let i = 0; i < n; i++) {
  //     arr.push({ name: `test ${i}`, regex: "fladjfaf", id: i });
  //   }
  //   return arr;
  // }

  //Given type and data return the view component
  _rowRenderer(type, data) {
    //You can return any view here, CellContainer has no special significance

    return (
      <CellContainer>
        <SavedItem
          name={data.name}
          mainTextColor={"#000"}
          borderColor={"#dedede"}
        />
      </CellContainer>
    );
  }

  render() {
    return (
      <RecyclerListView
        style={{ flex: 1, height: "100%" }}
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
      />
    );
  }
}
