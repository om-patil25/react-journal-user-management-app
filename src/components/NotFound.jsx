import { useNavigate } from "react-router";
import Btns from "./Btns";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen w-full md:pt-16">
      <div className="h-max flex flex-col justify-center items-center gap-8">
        <img
          className="hidden md:block md:dark:hidden"
          src="public\imgs\404light.jpg"
          alt=""
        />
        <img
          className="hidden md:hidden md:dark:block"
          src="public\imgs\404dark.jpg"
          alt=""
        />
        <img
          className="block dark:hidden md:hidden md:dark:hidden rounded-lg h-72"
          src="public\imgs\404lightmobile.jpg"
          alt=""
        />
        <img
          className="hidden dark:block md:hidden md:dark:hidden rounded-lg h-72"
          src="public\imgs\404darkmobile.jpg"
          alt=""
        />
        <Btns
          btnName={"Return to Home →"}
          onClickFunc={() => navigate("/")}
          btnStyle={
            "p-2 rounded-lg text-gray-50 bg-accentdeep-light hover:bg-accent-light-hover dark:bg-accent-dark dark:hover:bg-accent-dark-hover"
          }
        />
      </div>
    </div>
  );
};

export default NotFound;
