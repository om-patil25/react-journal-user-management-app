import { Link } from "react-router";
import { getTime24hr } from "../services/currentDateNTime";

const Home = () => {
  const currentHour = getTime24hr().split(":")[0];
  const greetings =
    currentHour < 12
      ? "Good Morning"
      : currentHour > 18
        ? "Good Evening"
        : "Good Afternoon";

  return (
    <div className="h-screen flex flex-col md:flex-row md:justify-center md:gap-32 items-center gap-2 pb-20 md:pb-0 md:pt-14 overflow-y-auto">
      <div className="max-w-4xl w-full md:w-1/3 min-h-8/12 px-6 bg-white dark:bg-card-dark shrink-0 flex flex-col justify-center gap-4">
        <div
          className="text-5xl md:text-6xl p-2 font-semibold text-gray-800 dark:text-white
leading-14"
        >
          <h1>
            {greetings.split(" ").map((words, idx) => (
              <span key={idx} className="block">
                {words}
              </span>
            ))}
          </h1>
        </div>
        <div className="p-2 gap-1 text-gray-800 dark:text-white">
          <p className="text-xl leading-7">
            Welcome to My <b>React Practice Workspace.</b>
          </p>
          <p className="text-lg leading-7">
            A personal project built to explore modern React patterns, state
            management, API integration, and clean UI structure.
          </p>
        </div>
        <div className="flex gap-3 items-center p-2 text-gray-900">
          <Link
            to="/DailyJournal"
            className="text-base font-medium w-max px-5 py-3 rounded-lg text-white bg-accentdeep-light hover:bg-accent-light-hover dark:bg-accent-dark dark:hover:bg-accent-dark-hover"
          >
            Go to Daily Journal &#8594;
          </Link>
          <Link
            to="/Users"
            className="text-base font-medium w-max px-5 py-3 rounded-lg text-white bg-accentdeep-light hover:bg-accent-light-hover dark:bg-accent-dark dark:hover:bg-accent-dark-hover"
          >
            Go to Users Api Integration &#8594;
          </Link>
        </div>
      </div>
      <div className="w-11/12 md:w-1/3 md:text-justify p-2 text-lg">
        <p>Concepts practiced:</p>
        <ul className="list-disc list-inside grid-cols-2">
          <li>State management using useState</li>
          <li>Side effects with useEffect</li>
          <li>Conditional rendering patterns</li>
          <li>Component separation & reusability</li>
          <li>LocalStorage persistence</li>
          <li>API data fetching with loading & error handling</li>
          <li>Responsive navigation structure</li>
          <li>Theme management with Context API (in progress)</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
