import React, { useState, useEffect, useRef } from "react";
import "./Contact.css";

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
  const [visibilityRatio, setVisibilityRatio] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timestamp = Date.now();
    const randomIndex = Math.floor((timestamp % WORDS.length)); // Use timestamp for randomness
    const selectedWord = WORDS[randomIndex];
    setBotWord(selectedWord);
    setScrambledWord(scrambleWord(selectedWord));
  }, [submitted]); // Add 'submitted' as a dependency to re-trigger the effect

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update the visibility ratio continuously (0 to 1)
          setVisibilityRatio(entry.intersectionRatio);
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Check every 1%
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Calculate animation progress for each element based on visibility ratio
  const getElementStyle = (baseDelay = 0) => {
    // Scale visibility so 100% is reached at 70% visibility instead of 100%
    const scaledRatio = Math.min(1, visibilityRatio / 0.7);
    // Adjust progress based on element's delay to create staggered effect
    const progress = Math.max(0, Math.min(1, (scaledRatio - baseDelay) / (1 - baseDelay)));
    const opacity = progress;
    const translateY = (1 - progress) * 40; // Start 40px down
    
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  const getVisualStyle = () => {
    // Scale visibility so 100% is reached at 70% visibility instead of 100%
    const scaledRatio = Math.min(1, visibilityRatio / 0.7);
    const progress = Math.max(0, Math.min(1, scaledRatio));
    const opacity = progress;
    const translateX = (1 - progress) * 40; // Start 40px right
    
    return {
      opacity,
      transform: `translateX(${translateX}px)`,
      transition: 'opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  

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
      
      // Create mailto link with form data
      const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
      );
      const mailtoLink = `mailto:info@aegios.ca?subject=${subject}&body=${body}`;
      
      // Open user's email client
      window.location.href = mailtoLink;
      
      // Show success message and reset form
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setBotAnswer("");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } else {
      setBotError("Incorrect answer, please try again.");
    }
  };

  const handleCloseBotTest = () => {
    setShowBotTest(false);
    setBotAnswer("");
    setBotError("");
  };

  return (
    <div className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-form-wrapper">
            <h2 style={getElementStyle(0.1)}>Get In Touch</h2>
            <h3 className="contact-subheading" style={getElementStyle(0.15)}>CONTACT US</h3>
            <p className="contact-description" style={getElementStyle(0.2)}>
              Let us help you build secure, private AI solutions tailored to your organization's needs. 
              Reach out to discuss your requirements and learn how we can assist.
            </p>
            {submitted && <p className="success-message">Message sent successfully!</p>}
            <form onSubmit={handleSubmit} style={getElementStyle(0.25)}>
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                ></textarea>
                {errors.message && <p className="error">{errors.message}</p>}
              </div>

              <button type="submit">Send Message</button>
            </form>
          </div>
          <div className="contact-visual" style={getVisualStyle()}>
            <div className="contact-bg-rectangle contact-bg-rect-1"></div>
            <div className="contact-bg-rectangle contact-bg-rect-2"></div>
            <div className="contact-bg-rectangle contact-bg-rect-3"></div>
            <div className="contact-bg-rectangle contact-bg-rect-4"></div>
            <div className="contact-bg-rectangle contact-bg-rect-5"></div>
            <div className="contact-bg-rectangle contact-bg-rect-6"></div>
            <div className="contact-bg-rectangle contact-bg-rect-7"></div>
            <div className="contact-bg-rectangle contact-bg-rect-8"></div>
            <div className="contact-bg-rectangle contact-bg-rect-9"></div>
            <div className="contact-bg-rectangle contact-bg-rect-10"></div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <label>© COPYRIGHT AEGIOS SOLUTIONS LTD 2025 - ALL RIGHTS RESERVED.</label>
      </div>

      {/* Bot Test Modal */}
      {showBotTest && (
        <div className="bot-test-modal">
          <div className="bot-test-content">
            <h2><span className="unscramble-label">UNSCRAMBLE:</span> {scrambledWord}</h2>
            <input
              type="text"
              value={botAnswer}
              onChange={(e) => setBotAnswer(e.target.value)}
              placeholder="ENTER THE UNSCRAMBLED WORD"
            />
            {botError && <p className="error bot-error">{botError.toUpperCase()}</p>}
            <div className="bot-test-buttons">
              <button onClick={handleBotTestSubmit}>SUBMIT</button>
              <button className="close-bot-test" onClick={handleCloseBotTest}>CLOSE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
