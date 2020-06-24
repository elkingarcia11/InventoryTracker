/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {ButtonGroupComponent} from './components/ButtonGroupComponent';
import { Icon, Input, ListItem} from 'react-native-elements';

import Swipeout from 'react-native-swipeout';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// USER STOCK ITEM # TOTAL # STOCK # SOLD
// SOLD = TOTAL - STOCK * UNIT PRICE
// CLOSE OUT SOLD, LEFT = STOCK,

// USER LIST ITEM:
/*
  TOTAL: 20 STOCK: 10 OWE: 50

*/



class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      name: '',
      userList: [],
    };
  }

  deleteUser(index){
    var newUserList = this.state.userList;
    newUserList.splice(index,1);
    this.setState({userList: newUserList});
  }

  setModalState(b){
    this.setState({
      modalVisible: b
    });
  }

  createUser(s){
    var user = {name: s, total: 10, stock: 3};
    if(s.length > 0) {
      var newUserList = this.state.userList;
      newUserList.push(user);
      this.setState({userList: newUserList, modalVisible: false});
    }
  }

  keyExtractor = (item, index) => index.toString()

  renderItem(item) {
    var diff = item.item.total - item.item.stock;
    var owe = diff * 5;
    // TOTAL KEEPS TRACK OF MONEY MADE AND ITEMS SOLD
    var s = "Total: " +item.item.total+"   Stock: " + item.item.stock + "   Owe: " + owe;
    return (
      <Swipeout
        right={[
          {
            backgroundColor: '#ff3232',
            text: 'Delete',
            onPress: ()=>this.deleteUser(item.index)
          }
        ]}
        autoClose={true}
        backgroundColor='#FF0000'
        type={'delete'}>
        <ListItem
          title={item.item.name}
          titleStyle={{fontSize: 24}}
          subtitle={s}
          subtitleStyle={{fontSize: 16, color: 'gray'}}
          bottomDivider
          chevron
        />
      </Swipeout>
    );
  }

  render(){
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, marginTop: 100}}>
          <Modal
            animationType="slide"
            transparent={true}
            statusBarTranslucent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <TouchableWithoutFeedback onPress={() => {this.setModalState(false);}}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Enter the name of the item/user</Text>
                  <Input
                    placeholder='Item/user name'
                    autoFocus={true}
                    onSubmitEditing={() => this.createUser(this.state.name)}
                    inputContainerStyle={{width: windowWidth*.65}}
                    onChangeText={value => this.setState({ name: value })}/>
                  <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => this.createUser(this.state.name)}
                  >
                    <Text style={styles.textStyle}>Create User</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <ButtonGroupComponent/>
          <FlatList
            style={{marginTop: 20}}
            keyExtractor={this.keyExtractor}
            data={this.state.userList}
            renderItem={(item, index) => this.renderItem(item, index)}
          />
          <Icon
            raised
            containerStyle = {styles.FloatingButtonStyle}
            name='add'
            size= {40}
            type='material'
            color='#C8665B'
            onPress={() => this.setModalState(true)} />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  FloatingButtonStyle: {
     //Here is the trick
     /*flex: 1,
     backgroundColor: 'white',
     borderRadius: 50,
     borderColor: '#89CFF0',
     width: 50,
     height: 50,
     alignItems: 'center',
     justifyContent: 'center',*/
     padding: 0,
     borderColor: '#FA8072',
     borderWidth: .5,
     margin: 0,
     position: 'absolute',
     right: 30,
     bottom: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: 'rgba(190,190,190,.75)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  }
});

export default App;
