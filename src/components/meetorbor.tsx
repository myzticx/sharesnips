import React, { useState } from "react";

interface CookieConsentProps {}

const CookieConsent: React.FC<CookieConsentProps> = ({}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "fixed",
            bottom: 16,
            left: 1506,
            backgroundColor: "#f0f0f0",
            padding: 15,
            borderRadius: 15,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            zIndex: 999,
          }}
        >
          <button
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              cursor: "pointer",
              background: "none",
              border: "none",
              fontSize: 16,
            }}
            onClick={handleClose}
          >
            &#10006; {/* Close symbol (X) */}

          </button>
          <h1>Orbital Oreo</h1>
          <p>
            Meet OrbitalOreo aka OrbOr a bot that can help with all your needs.
            Coming Soon!
          </p>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
