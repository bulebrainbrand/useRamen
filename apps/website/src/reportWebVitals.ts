import { onCLS, onINP, onLCP, onTTFB, onFCP } from "web-vitals";

export const reportWebVitals = () => {
  onCLS(console.log);
  onFCP(console.log);
  onLCP(console.log);
  onINP(console.log);
  onTTFB(console.log);
};
