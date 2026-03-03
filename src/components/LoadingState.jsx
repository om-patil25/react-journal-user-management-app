import { Loader } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="w-20 h-20 bg-card-light dark:bg-bg-dark dark:text-white flex justify-center items-center rounded-2xl absolute top-1/2 left-1/2 -translate-1/2 z-20">
      <Loader className="animate-spin" />
    </div>
  );
};

export default LoadingState;
