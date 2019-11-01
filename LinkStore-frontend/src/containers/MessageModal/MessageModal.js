import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {genericDispatch} from '../../store/actions/allLinks'
import {connect} from 'react-redux'


function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class MessageModal extends React.Component {
    state = {
            open: false,

    }
  handleClickOpen = () => {
    document.body.style.overflowY = 'hidden'
    this.setState({ open: true });
  };

  handleClose = () => {
    document.body.style.overflowY = 'scroll'
    this.setState({ open: false });

  };
  componentDidMount () {
      if(this.props.showModal){
        setTimeout(function () {
            document.getElementById('someModal').click()
        
        } ,3000)
        this.props.genericDispatch({type:'CLOSE_MODAL',closeModal:false})
      }
     
      
  }

  render() {
    return (
      <div>
        <Button  onClick={this.handleClickOpen} id="someModal" style={{visibility:'hidden'}} value ="">
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"What is LinkStore?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              LinkStore is a website where you can store, update, and search for links that
              related to different topics on different websites
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Got It
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
function mapStateToProps (state){
    return {
        showModal : state.errors.showModal
    }

}
export default connect(mapStateToProps,{genericDispatch})(MessageModal);
