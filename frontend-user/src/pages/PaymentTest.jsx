import React from "react";

const PaymentTest = () => {

  const handlePayment = async () => {
    try {
      // 1️⃣ Create order from backend
      const response = await fetch("http://127.0.0.1:8000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: 500 }) // ₹500 test
      });

      const data = await response.json();

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_SL8aaXI0QUnHTk", // 👈 put your TEST key id here
        amount: data.amount,
        currency: "INR",
        name: "ServiceHub",
        description: "Test Payment",
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful!");
          console.log("Payment Response:", response);
        },
        prefill: {
          name: "Dinesh Kumar",
          email: "test@gmail.com",
          contact: "9000000000"
        },
        theme: {
          color: "#0f172a"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Razorpay Test Payment</h2>
      <button
        onClick={handlePayment}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#0f172a",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Pay ₹500
      </button>
    </div>
  );
};

export default PaymentTest;