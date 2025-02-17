import React, { useState, useEffect } from "react";
import "./Contact.css";
import emailjs from "emailjs-com";

const WORDS = ["secure", "robot", "shield", "verify", "human", "captcha", "safety"];

const scrambleWord = (word) => {
  return word.split("").sort(() => Math.random() - 0.5).join("");
};


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showBotTest, setShowBotTest] = useState(false);
  const [botAnswer, setBotAnswer] = useState("");
  const [botError, setBotError] = useState("");
  const [botWord, setBotWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");

  useEffect(() => {
    const timestamp = Date.now();
    const randomIndex = Math.floor((timestamp % WORDS.length)); // Use timestamp for randomness
    const selectedWord = WORDS[randomIndex];
    setBotWord(selectedWord);
    setScrambledWord(scrambleWord(selectedWord));
  }, [submitted]); // Add 'submitted' as a dependency to re-trigger the effect
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setShowBotTest(true); // Show bot test before submitting
  
      // Reset bot test (new word every time the form is submitted)
      const timestamp = Date.now();
      const randomIndex = Math.floor((timestamp % WORDS.length)); // Use timestamp for randomness
      const selectedWord = WORDS[randomIndex];
      setBotWord(selectedWord);
      setScrambledWord(scrambleWord(selectedWord));
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };
  

  const handleBotTestSubmit = () => {
    if (botAnswer.toLowerCase() === botWord) {
      setShowBotTest(false);
      setSubmitted(true);

      emailjs
        .send(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          process.env.REACT_APP_EMAILJS_USER_ID
        )
        .then(
          (response) => {
            console.log("Email sent successfully", response);
            setFormData({ name: "", email: "", message: "" });
            setErrors({});
            setBotAnswer("");
          },
          (error) => {
            console.error("Error sending email:", error);
            setSubmitted(false);
          }
        );
    } else {
      setBotError("Incorrect answer, please try again.");
    }
  };

  return (
    <div className="contact-section">
      <div className="contact-container">
        <h2 id="contact">Contact Us</h2>
        {submitted && <p className="success-message">Message sent successfully!</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div>
            <label className="emailName">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div>
            <label className="messageName">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
            ></textarea>
            {errors.message && <p className="error">{errors.message}</p>}
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
      <div className="copyright">
        <label>©Copyright Aegios Solutions Limited 2025 - All Rights Reserved.</label>
      </div>

      {/* Bot Test Modal */}
      {showBotTest && (
        <div className="bot-test-modal">
          <div className="bot-test-content">
            <h2>Unscramble the word: {scrambledWord}</h2>
            <input
              type="text"
              value={botAnswer}
              onChange={(e) => setBotAnswer(e.target.value)}
              placeholder="Enter the unscrambled word"
            />
            {botError && <p className="error">{botError}</p>}
            <button onClick={handleBotTestSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
