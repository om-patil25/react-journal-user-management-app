import { useEffect, useState } from "react";
import { getLocalEntries, setLocalEntries } from "../services/storageServices";
import { getDate, getTime12hr } from "../services/currentDateNTime";
import JournalCard from "../components/JournalCard";
import JournalForm from "../components/JournalForm";
import { Menu, X } from "lucide-react";
import LoadingState from "../components/LoadingState";

const DailyJournal = () => {
  const [time, setTime] = useState(getTime12hr());
  const [date, setDate] = useState(getDate());
  const [entryData, setEntryData] = useState("");
  const [entries, setEntries] = useState(() => getLocalEntries());
  const [currentId, setCurrentId] = useState(null);
  const [isInEdit, setIsInEdit] = useState(false);
  //menu state for hamburgar menu for entries
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setDate(getDate());
    setEntryData("");
  };

  const handleDelete = (entry) => {
    if (confirm("Are You Want to delete this entry")) {
      setEntries(entries.filter((entry1) => entry.id != entry1.id));
    } else {
      return;
    }
  };

  const handleSaveAftEdit = () => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === currentId ? { ...entry, entryData } : entry,
      ),
    );
    setIsOpen(!isOpen);
  };

  const handleView = (entry) => {
    setEntryData(entry.entryData);
    setDate(entry.date);
    setTime(entry.time);
    setCurrentId(entry.id);
    setIsInEdit(false);
    setIsOpen(!isOpen);
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(getDate());
      setTime(getTime12hr());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!entryData.trim()) return;

    const newEntry = {
      id: Date.now(),
      time,
      date,
      entryData,
    };

    setLoading(true);
    setTimeout(() => {
      setEntries((prev) => [newEntry, ...prev]);
      reset();
      setIsOpen(!isOpen);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    setLocalEntries(entries);
  }, [entries]);

  return (
    <>
      {loading && <LoadingState />}
      <div className="flex h-screen overflow-x-hidden md:pt-14">
        <div
          className={`h-full w-[90vw] md:w-1/2 overflow-y-auto scrollbar-thin pb-20 md:pb-0 ${!isOpen ? " -translate-x-[90vw]" : " translate-x-0 "} md:translate-x-0  md:w-1/2 shrink-0 flex flex-col items-center transition-transform duration-300 gap-2`}
        >
          <div className="bg-white text-gray-800 dark:bg-card-dark dark:text-gray-50 font-semibold w-full md:w-4/6 h-1/12 flex justify-center items-center text-2xl shrink-0 md:bg-transparent md:dark:bg-transparent md:text-4xl md:justify-start">
            <h1>Daily Journal</h1>
          </div>
          {entries.length > 0 ? (
            entries.map((entry) => {
              return (
                <JournalCard
                  entry={entry}
                  onView={handleView}
                  onDelete={handleDelete}
                  key={entry.id}
                />
              );
            })
          ) : (
            <div className="m-4 text-lg">Start Writing Daily Journal!!</div>
          )}
        </div>
        <div
          className={`h-full w-[10vw] p-2 flex justify-center relative ${isOpen ? "translate-x-0" : "-translate-x-[90vw]"} md:hidden bg-accent-light dark:bg-accent-dark shrink-0 transition-transform duration-300`}
        >
          <button
            onClick={handleMenu}
            className="absolute top-5 text-gray-900 dark:text-gray-50"
          >
            {!isOpen ? <Menu size={30} /> : <X size={30} />}
          </button>
        </div>

        <div
          className={`shrink-0 w-[90vw] md:w-1/2 ${isOpen ? "translate-x-0" : "-translate-x-[90vw]"} md:translate-x-0  flex flex-col items-center justify-center gap-2 transition-transform duration-300`}
        >
          <div className="absolute bg-white text-gray-800 top-0 dark:bg-card-dark dark:text-gray-50 w-full h-1/12 flex justify-center items-center text-2xl font-semibold md:hidden">
            <h1>Daily Journal</h1>
          </div>

          <JournalForm
            entryData={entryData}
            setEntryData={setEntryData}
            date={date}
            setDate={setDate}
            isInEdit={isInEdit}
            setIsInEdit={setIsInEdit}
            currentId={currentId}
            setCurrentId={setCurrentId}
            onAdd={submitHandler}
            onSaveAftEdit={handleSaveAftEdit}
            reset={reset}
            time={time}
          />
        </div>
      </div>
    </>
  );
};

export default DailyJournal;
