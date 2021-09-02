import React from "react";
import { Box } from "@chakra-ui/react";
import { TrustpilotProps } from "./types";

const Trustpilot: React.FC<TrustpilotProps> = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if ((window as any).Trustpilot) {
      (window as any).Trustpilot.loadFromElement(ref.current, true);
    }
  }, []);
  return (
    <Box bg="white" d="inline-block" py="12px" borderRadius="12px" w="280px">
      <div
        data-locale="en-GB"
        data-theme="light"
        data-template-id="5419b6ffb0d04a076446a9af"
        data-businessunit-id="4ef7b044000064000511f816"
        data-style-height="40px"
        data-style-width="100%"
        id="trustbox"
        ref={ref}
        className="trustpilot-widget"
      >
        <a
          href="https://trustpilot.com/review/lebara.com"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Trustpilot{" "}
        </a>
      </div>
    </Box>
  );
};

export default Trustpilot;
