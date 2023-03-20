import Temperature from "../../Components/Temperatura/temp";
import Prozor from  '../../../src/Components/Prozori/Prozor.js';

const HomeLoggedIn = ({ props, email }) => {
  const user = props;

  return (
    <div>
      {user ? <h1>{email}</h1> : " "}
      <Prozor/>
      <Temperature />
    </div>
  );
};
export default HomeLoggedIn;
