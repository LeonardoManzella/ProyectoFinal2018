import React, { Component } from 'react';
import moment from 'moment';
import { TAPi18n } from 'meteor/tap:i18n';
import _ from 'lodash';
import SharedMethods from '../../../api/helpers/sharedMethods';
import PaypalButton from './PaypalButton';

const CLIENT = {
    sandbox: 'AXCGkNzDK4LAVHCFV4PdiZstmjM6TAgnnyzYq6Cz9wZ62B-C4OTBngXgN8Gcp8BABtDAnc9kp0RVm-sJ',
    production: 'AXJGaFR3AA11NwkIwlF--EfDW-97Si8JEFRl5Hpgnj5ijYp4sllmm7LMNK7Pp7EvfVwQCo_ChEoXTTq9',
};

const ENV = process.env.NODE_ENV === 'production'
    ? 'production'
    : 'sandbox';

export default class PaypalPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        console.log("Environment: " + ENV);
        const onSuccess = (payment) => {
            console.log("=========PAGO REALIZADO==========");
            console.log(JSON.stringify(payment)); //TODO borrar esta impresion, es peligroso e inseguro
            window.alert('Pago Realizado!. A las 24hs de realizado el pago te avisaremos por email para que puedas empezar con Botigo', payment);
        }
        const onError = (error) => {
            console.error("========ERROR AL PAGAR=========");
            console.error(JSON.stringify(error)); 
            console.trace();
            window.alert('Pago erroneo o fallo la conexion con Paypal. Tranquilo. No se te ha cobrado nada! Por favor envianos un email a botigo.contigo@gmail.com con este Error: ' + JSON.stringify(error), error);
        }
        const onCancel = (data) => {
            console.log("=======PAGO CANCELADO==========");
            console.log(JSON.stringify(data)); //TODO borrar esta impresion, es peligroso e inseguro
            window.alert('Pago cancelado. Tranquilo. No se te ha cobrado nada!', data);
        }
        return (
            <div id="home" className="content-body paypal-page">
                <h2 style={{ textAlign: "center" }}>Suscripción Mensual</h2>
                <h3 style={{ textAlign: "center" }}>Ya que Botigo esta contigo todo el tiempo, es razonable que pagues una suscripción mensual por el uso.</h3>
                <h4 style={{ textAlign: "center" }}>Abajo encontraras para pagar via Paypal, Unicamente se te cobrara este mes y luego de usarlo puedes decidir si renovar la suscripción el proximo mes.</h4>
                <h5 style={{ textAlign: "center" }}>A las 24hs de realizado el pago te avisaremos por email para que puedas empezar con Botigo.</h5>
                <div className="paypal-button">
                    <PaypalButton
                        client={CLIENT}
                        env={ENV}
                        commit={true}
                        currency={'USD'}
                        total={10}
                        onSuccess={onSuccess}
                        onError={onError}
                        onCancel={onCancel}
                    />
                </div>
            </div>
        );
    }
}
