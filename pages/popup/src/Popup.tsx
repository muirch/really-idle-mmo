import "@src/Popup.css";
import { withErrorBoundary, withSuspense } from "@extension/shared";

const Popup = () => {
  return <div>hello world</div>;
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
