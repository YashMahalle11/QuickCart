import React from 'react';

const RazorpayButton = ({ amount, onSuccess, onError }) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // your test key
      amount: amount * 100, // Amount is in paise, so multiply by 100
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      image: "https://your-logo-url.com/logo.png", // optional
      handler: function (response) {
        console.log("Razorpay Success:", response);
        onSuccess(response);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

    rzp.on('payment.failed', function (response) {
      console.error("Razorpay Error:", response.error);
      if (onError) onError(response.error);
    });
  };

  return (
    <button onClick={handlePayment} className="bg-blue-600 text-white px-4 py-2 rounded">
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton; 









/*import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }) => {
  console.log("PayPal Amount:", amount);
  
  const paypalOptions = {
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: 'USD',
    intent: 'capture'
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={{ layout: 'vertical' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: amount.toString() // Ensure it's a string
                },
              },
            ],
            application_context: {
              shipping_preference: 'NO_SHIPPING' // Optional: depends on your needs
            }
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(details => {
            console.log('Transaction completed:', details);
            onSuccess(details);
          });
        }}
        onError={(err) => {
          console.error('PayPal Error:', err);
          if (onError) onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton; */




// import React from 'react'
// import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

// const PayPalButton = ({ amount, onSuccess, onError }) => {
//   console.log("PayPal Amount:", amount)


//   return (
//     <PayPalScriptProvider
//       options={{
//         'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
//         currency: 'USD', // ✅ important
//       }}
//     >
//       <PayPalButtons
//         style={{ layout: 'vertical' }}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   currency_code: 'USD', // ✅ explicitly specify
//                   value: amount
                 
//                 },
//               },
//             ],
//           })
//         }}
//         onApprove={(data, actions) => {
//           return actions.order.capture().then(onSuccess)
//         }}
//         onError={onError}
//       />
//     </PayPalScriptProvider>
//   )
// }

// export default PayPalButton;

/*import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD"
    }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount,
                currency_code: "USD"
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton; */


/*import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD" // ✅ Set default currency here
    }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: "USD", // ✅ Explicitly set currency here too
                value: amount
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton; */






/*import React from 'react'
import {PayPalButtons , PayPalScriptProvider} from "@paypal/react-paypal-js";

const PayPalButton = ({amount, onSuccess, onError}) => {
  return (
    <PayPalScriptProvider options={{"client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID
      
     }}>
        <PayPalButtons style={{layout: "vertical"}}
        createOrder={(data, actions) => {
            return actions.order.create({
                purchase_units: [{amount: {value: amount}}
                   

                ],

            });
        }}
        onApprove={(data,actions) => {
            return actions.order.capture().then(onSuccess)
        }}
        onError={onError} />
    </PayPalScriptProvider>
  )
}

export default PayPalButton */