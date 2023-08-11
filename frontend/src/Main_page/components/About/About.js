import React, { useState } from "react";

const ServiceBody = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    phoneNumber: "",
    time: "",
    date: "",
    text: "",
  });

  const handleWhatsAppSend = () => {
    // Replace "whatsappphonenumber" with the actual formatted phone number
    const phoneNumber = "+2340867089851"; // Example: +11234567890

    const whatsappMessage = encodeURIComponent(
      `
      NAME: ${userInput.name}
      PHONE NUMBER: ${userInput.phoneNumber}
      TIME: ${userInput.time}
      DATE: ${userInput.date}
      TEXT: ${userInput.text}
      `
    );

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    window.open(whatsappLink);
  };

  return (
    <div>
      {/* ... Other components and input fields ... */}

      <button onClick={handleWhatsAppSend}>Send via WhatsApp</button>
    </div>
  );
};

export default ServiceBody;
