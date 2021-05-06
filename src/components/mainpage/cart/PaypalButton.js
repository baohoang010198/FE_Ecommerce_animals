import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class PaypalButton extends React.Component {
    render() {
        const onSuccess = (payment) => {
            this.props.tranSuccess(payment);
        }
 
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }
 
        const onError = (err) => {
            console.log("Error!", err);
        }
        let env = 'sandbox'; 
        let currency = 'USD'; 
        let total =  this.props.total; 
 
        const client = {
            sandbox:    'ATayF9nPG5oQgfQ6qqAJRds92mMaUcFYlDJHbpXq-4l6uXpv6IsjGOOJQhH1kfyr6DjyKoct6X2ovMzZ',
            production: 'YOUR-PRODUCTION-APP-ID',
        }

        let style={
            size: 'small',
            color:'gold',
            shape:'rect',
            label: 'pay',
            tagline:false
        }
        return (
            <PaypalExpressBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} 
                style={style}
            />
        );
    }
}