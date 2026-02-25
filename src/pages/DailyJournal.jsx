import { useEffect, useState } from "react";

const DailyJournal = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  // adding 1 in month since its index starts from 0
  const getDate =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1 < 10
      ? "0" + (currentDate.getMonth() + 1)
      : currentDate.getMonth() + 1) +
    "-" +
    (currentDate.getDate() < 10
      ? "0" + currentDate.getDate()
      : currentDate.getDate());

  const [time, setTime] = useState(currentDate.toLocaleTimeString());
  const [date, setDate] = useState(getDate);
  const [entryData, setEntryData] = useState("");
  const [entries, setEntries] = useState(() => {
    const stored = localStorage.getItem("Journal_Entries");
    return stored ? JSON.parse(stored) : [];
  });
  const [editId, setEditId] = useState(null);

  const reset = () => {
    setDate(getDate);
    setEntryData("");
  };

  const handleDelete = (entry) => {
    setEntries(entries.filter((entry1) => entry.id != entry1.id));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setDate(getDate);
    setTime(currentDate.toLocaleTimeString());
  }, [currentDate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!entryData.trim()) return;

    if (editId) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editId ? { ...entry, entryData } : entry,
        ),
      );
      setEditId(null);
    } else {
      const newEntry = {
        id: crypto.randomUUID(),
        time,
        date,
        entryData,
      };

      setEntries((prev) => [...prev, newEntry]);
    }
    reset();
  };

  useEffect(() => {
    localStorage.setItem("Journal_Entries", JSON.stringify(entries));
  }, [entries]);

  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <div>{currentDate.toLocaleTimeString()}</div>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          name="entry"
          value={entryData}
          onChange={(e) => setEntryData(e.target.value)}
        ></textarea>
        <button>{editId ? "Update" : "Add Entry"}</button>
      </form>
      {entries.length > 0 ? (
        entries.map((entry) => {
          return (
            <div key={entry.id} className="border-black border-2">
              <p>{entry.date}</p>
              <p>{entry.time}</p>
              <p>{entry.entryData}</p>
              <button onClick={() => handleDelete(entry)}>delete</button>
              <button
                onClick={() => {
                  setEntryData(entry.entryData);
                  setDate(entry.date);
                  setTime(entry.time);
                  setEditId(entry.id);
                }}
              >
                Edit
              </button>
            </div>
          );
        })
      ) : (
        <h2>No Entry yet!</h2>
      )}
    </>
  );
};

export default DailyJournal;
