import React from 'react'
import Modal from 'react-modal';

export default class PaymentPage extends React.Component {

    constructor(){
        super();

        this.state = {isModalOpen: false}
    }

    toggleOpenModal () {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    render() {
        const isModalOpen = this.state.isModalOpen;

        const buttonStyle = {
            cursor: 'pointer',
            background: 'rgba(48, 116, 255, 0.8)',
            verticalAlign: 'baseline',
            outline: 0,
            padding: '14px',
            border: 'none',
            color: 'white',
            fontWeight: 600,
            boxShadow: 'none',
            borderRadius: '15px'
        };

        const invertedButtonStyle = {
            cursor: 'pointer',
            background: 'white',
            verticalAlign: 'baseline',
            outline: 0,
            padding: '14px',
            border: 'none',
            color: 'rgba(48, 116, 255, 0.8)',
            fontWeight: 600,
            boxShadow: 'none',
            borderRadius: '15px'
        };

        return (
            <div className="content-body plan">
                <div className="col-md-12">
                    <div className="row" style={{alignItems: 'center', marginBottom: '20px'}}>
                        <strong><h1 style={{display: 'inline'}}>Pago de suscripción por MercadoPago</h1>
                        </strong>
                    </div>

                    <div className="row" style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                        <img style={{height: '100px', marginTop: '20px'}} src='/img/mercadopago-logo.png' />
                    </div>

                    <div className="row" style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                        <button style={buttonStyle} onClick={this.toggleOpenModal.bind(this)}>Pagar</button>
                    </div>

                </div>

                <Modal
                    isOpen={isModalOpen}
                    contentLabel="Modal"
                    className={{
                        base: '',
                        afterOpen: 'modal fade bottom show',
                        beforeClose: ''
                    }}
                    overlayClassName={{
                        base: 'myOverlayClass_after-open',
                        afterOpen: 'myOverlayClass_after-open',
                        beforeClose: 'myOverlayClass_after-open'
                    }}
                    ariaHideApp={false}
                >
                    <div className="modal-dialog modal-lg modal-open" role="document">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <h4>Pago por MercadoPago</h4>
                                    Recuerda guardar tu comprobante de pago.
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-modal" style={invertedButtonStyle} onClick={this.toggleOpenModal.bind(this)}>Cancelar</button>
                                    <button type="button" className="btn btn-modal" style={buttonStyle}><a style={{color: 'white'}} mp-mode="dftl"
                                                                                                   href="https://www.mercadopago.com/mla/checkout/start?pref_id=41356522-6b80435f-acae-48b7-812e-92be1b81382d"
                                                                                                   name="MP-payButton" className='blue-ar-l-rn-none'>Ir a MercadoPago</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

            </div>
        )

    }

}