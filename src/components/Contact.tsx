// src/components/Contact.tsx

import React from 'react';

// Data for the contact details on the right
const contactDetails = [
  { icon: 'bi-phone-vibrate', text: '978-325-2295' },
  { icon: 'bi-envelope', text: 'bcslingluff@gmail.com' },
  { icon: 'bi-bank2', text: 'jdx7es@virginia.edu' },
];

const Contact: React.FC = () => {
  return (
    <div className="container1">
      <div id="contact" className="contact-container">
        <div className="contact-content">
          <form action="https://api.web3forms.com/submit" method="POST" className="contact-left">
            <div className="contact-left-title">
              <h3>Contact me!</h3>
              <hr />
            </div>
            <input type="hidden" name="access_key" value="24bbdbe9-1f20-4efd-a8cb-ed97637afdbb" />
            <input type="text" name="name" placeholder="Your Name" className="contact-inputs" required />
            <input type="email" name="email" placeholder="Your Email" className="contact-inputs" required />
            <textarea name="message" placeholder="Your Message" className="contact-inputs" required></textarea>
            <button type="submit">Submit</button>
          </form>

          <div className="contact-right">
            <div className="contact-right-items">
              {contactDetails.map((detail, index) => (
                <div key={index} style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <i className={`bi ${detail.icon} contact-right-icon`}></i>
                  <p>{detail.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;