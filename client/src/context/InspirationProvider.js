import React from "react";

const InspirationContext = React.createContext({});

const InspirationProvider = ({ children }) => {
  const [inspiration, setInspiration] = React.useState(false);

  return (
    <InspirationContext.Provider
      value={{
        inspiration: inspiration,
        setInspiration: setInspiration,
      }}
    >
      {children}
    </InspirationContext.Provider>
  );
};

export { InspirationContext, InspirationProvider };
