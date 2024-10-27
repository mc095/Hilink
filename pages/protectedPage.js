// pages/protectedPage.js
import withAuth from "../utils/withAuth";

const ProtectedPage = () => {
  return <div>This is a protected page. Only logged-in users can see this.</div>;
};

export default withAuth(ProtectedPage);
