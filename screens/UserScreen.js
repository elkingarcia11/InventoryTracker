import React from 'react';
import {
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import { Button, Icon, Input, ListItem} from 'react-native-elements';

// PRE-CONDITION TO ADD:
/*
  cannot add non numbers, less than 0, more than total available
  you cannot add more without closing (without updated,free, owe == 0)
*/

// PRE-CONDITION TO UPDATED STOCK:
/*
  cannot be non numbers, less than 0, and greater than local total
*/

// PRE-CONDITION TO free count:
/*
  cannot be non numbers, less than 0, and greater than sold
*/

// PRE-CONDITION TO OWE:
/*
  depends on how much unit cost is - (sold - free) * 5
  once you close, total = stock left, stock left = 0, sold = 0, free = 0, owe = 0
*/



// Remove
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class UserScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name: this.props.route.params.name,
      grandTotal: 300,
      total: 0,
      stockLeft: this.props.route.params.stock,
      freeCount: 0,
      sold: this.props.route.params.total - this.props.route.params.stock,
      owe: (this.props.route.params.total - this.props.route.params.stock) * 5,
      addition: 0,
      updateValue: 0,
      freeValue: 0,
      modalVisible: false,
      addOrUpdate: 0,
    }
  }

  // Have to check that it is a #
  addToTotal(){
      if(parseInt(this.state.stockLeft > 0) || parseInt(this.state.freeCount) > 0 || parseInt(this.state.sold) > 0 || parseInt(this.state.owe) > 0){
        // Throw alert - cannot add any more boxes till you close the day [shouldn't update stock left, sold, free owe if no boxes were sold]
      } else {
        if(this.state.addition != "" && ( this.state.addition.match('^[0-9]+$') && parseInt(this.state.addition) > 0 && (parseInt(this.state.addition) + parseInt(this.state.total)) <= this.state.grandTotal ) ){
          this.setState({
            modalVisible: false,
            total: parseInt(this.state.total)+parseInt(this.state.addition),
            addition: 0,
          })
        } else{
          // Throw alert -- can't add non number and/or total sum larger than grand total
          this.setState({
            modalVisible: false,
            addition: 0,
          })
        }
      }
  }

  updateTotalLeft(){

    // update overwrites,
    // just make sure its a # and its >= 0 and <= total

    if( this.state.updateValue != "" && ( parseInt(this.state.updateValue) <= this.state.total && parseInt(this.state.updateValue) >= 0 && this.state.updateValue.match('^[0-9]+$')) ){
      this.setState({
        modalVisible: false,
        stockLeft: parseInt(this.state.updateValue),
        updateValue: 0,
        sold: this.state.total - parseInt(this.state.updateValue),
        owe: (this.state.total - parseInt(this.state.updateValue) - parseInt(this.state.freeValue) )*5,
        });
    } else{
      this.setState({
        modalVisible: false,
        updateValue: 0,
      })
    }

    // Free has to be a #, >= 0 <= this.state.sold
    if( this.state.freeValue != "" && (parseInt(this.state.freeValue) <= this.state.sold && parseInt(this.state.freeValue) >= 0 && this.state.freeValue.match('^[0-9]+$')) ){
      this.setState({
        owe: (this.state.sold - parseInt(this.state.freeValue) )*5,
        freeCount: parseInt(this.state.freeValue),
        freeValue: 0,
      });
    } else{
      this.setState({
        freeValue: 0,
      })
    }

    /*
    if( this.state.freeValue != "" && (parseInt(this.state.freeValue) <= this.state.total && parseInt(this.state.freeValue) >= 0 && this.state.freeValue.match('^[0-9]+$')) ){

    } else {
      if( this.state.updateValue != "" && ( parseInt(this.state.updateValue) <= this.state.total && this.state.updateValue.match('^[0-9]+$') && parseInt(this.state.updateValue) >= 0) ){
        this.setState({
          modalVisible: false,
          stockLeft: parseInt(this.state.updateValue),
          freeCount: parseInt(this.state.freeValue),
          sold: parseInt(this.state.total) - parseInt(this.state.updateValue),
          owe:  (parseInt(this.state.total) - parseInt(this.state.updateValue))*5,
          updateValue: 0,
          freeValue: 0,
        });
      } else{
        this.setState({
          modalVisible: false,
          updateValue: 0,
          freeValue: 0,
        })
      }
    }
*/
  }

  render(){
    return(
      <SafeAreaView style={{marginTop: 15}}>
        <Modal
          animationType="slide"
          transparent={true}
          statusBarTranslucent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <TouchableWithoutFeedback onPress={() => {this.setState({
            modalVisible: false
          });}}>
            <View style={styles.centeredView}>
            {this.state.addOrUpdate == 0 ?
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Total available: {this.state.grandTotal}</Text>
                <Text style={styles.modalSubText}>How many do you want to add?</Text>
                <Input
                  placeholder='Quantity to add'
                  autoFocus={true}
                  onSubmitEditing={() => this.addToTotal()}
                  inputContainerStyle={{width: windowWidth*.65}}
                  onChangeText={value => this.setState({ addition: value })}/>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => this.addToTotal()}
                >
                  <Text style={styles.textStyle}>Add to total</Text>
                </TouchableOpacity>
              </View> :
              <View style={styles.modalView}>
                <Text style={styles.modalText}>How many units are left?</Text>
                <Input
                  placeholder='Quantity left'
                  autoFocus={true}
                  onSubmitEditing={() => this.updateTotalLeft()}
                  inputContainerStyle={{width: windowWidth*.65}}
                  onChangeText={value => this.setState({ updateValue: value })}/>
                <Text style={styles.modalText}>How many units were given for free?</Text>
                <Input
                  placeholder='Quantity given for free'
                  onSubmitEditing={() => this.updateTotalLeft()}
                  inputContainerStyle={{width: windowWidth*.65}}
                  onChangeText={value => this.setState({ freeValue: value })}/>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => this.updateTotalLeft()}
                >
                  <Text style={styles.textStyle}>Update stock</Text>
                </TouchableOpacity>
              </View>
            }
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <ListItem
          title={this.state.name}
          subtitle={"Total: "+this.state.total+"   Stock left: "+this.state.stockLeft+"   Sold: "+ this.state.sold +"   Free: "+this.state.freeCount+"   Owe: "+ this.state.owe}
          bottomDivider
        />

        <View style={{borderColor: 'grey' , borderTopWidth: .15, borderBottomWidth: .2, backgroundColor: 'white', marginTop: 20, padding: 16, flexDirection: 'row', justifyContent: 'space-around', }}>
          <Button
            title="Add"
            onPress = {()=>this.setState({modalVisible: true, addOrUpdate: 0})}
            style={{width: windowWidth*.25}}
            raised={true}
            type="outline"
          />
          <Button
            title="Update"
            onPress = {()=>this.setState({modalVisible: true, addOrUpdate: 1})}
            style={{width: windowWidth*.25}}
            raised={true}
            type="outline"
          />
          <Button
            title="Close"
            onPress = {()=>this.closeDay()}
            style={{width: windowWidth*.25}}
            raised={true}
            type="outline"
          />
        </View>
      </SafeAreaView>
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
  },
  modalSubText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 17,
  }
});

export default UserScreen;
