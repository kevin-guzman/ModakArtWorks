import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  frame: {
    marginTop: "5%",
    backgroundColor: "#D9DDC9",
    alignSelf: "center",
    padding: 15,

    borderWidth: 14,
    borderTopColor: "#D8D7D7",
    borderStyle: "solid",
    borderBottomColor: "#efefef",
    borderLeftColor: "#C1C1C1",
    borderRightColor: "#C1C1C1",

    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    elevation: 6,
    overflow: 'visible',
  },
  image: {
    alignSelf: 'center',
  },
  detailsContainer: {
    marginTop: 8, 
    display: "flex", 
    flexDirection: "row",
  },
  favoritesIconContainer:{
    flex: 1, 
    justifyContent: "center" 
  },
  details:{
    flex: 7, 
  }

})