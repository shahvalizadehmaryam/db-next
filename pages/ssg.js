import User from "../models/User";
import connectDb from "../utils/ConnectDb";

const SSG = ({ users }) => {
  console.log("users in ssg", users);
  return <div>ssg</div>;
};

export default SSG;
export async function getStaticProps() {
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
