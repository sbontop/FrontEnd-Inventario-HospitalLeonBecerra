/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {Component } from 'react';
import ReactDOM from 'react-dom';

import { withIonLifeCycle } from '@ionic/react';

//import AxiosAutenticacion from '../../services/AxiosAutenticacion';

import SignaturePad from 'react-signature-canvas'
import styles from './styles.module.css'


class FirmaElectronica extends Component {
  
  

  constructor(props: any) {
    super(props);
    this.state = {
      trimmedDataURL: null,
      
    }
  }

  //state = {trimmedDataURL: null}
  sigCanvas:any = {}
  clear = () => {
    //this.sigPad.clear()
  }
  trim = () => {
    //this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')})
  }

  render(){//Start  
    //let {trimmedDataURL} = this.state  
    return(    <div className={styles.sigContainer}>
      <SignaturePad canvasProps={{className: styles.sigPad}}
      />
    </div>
);

  }//END
}

export default withIonLifeCycle(FirmaElectronica);