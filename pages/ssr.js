import User from "../models/User";
import connectDb from "../utils/ConnectDb";

const SSR = ({ users }) => {
  console.log("ssr", users);
  return <div>SSR PAGE</div>;
};

export default SSR;
export async function getServerSideProps() {
  try {
    connectDb();
    const users = await User.find();
    return {
      props: {
        users: JSON.parse(JSON.stringify(users)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
