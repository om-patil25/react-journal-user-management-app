import {
  fetchUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} from "../services/userServices";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { Menu, X, LoaderCircle } from "lucide-react";
import UserModal from "../components/UserModal";
import UserForm from "../components/UserForm";
import LoadingState from "../components/LoadingState";

const UsersDB = () => {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(0); //not much role of id just to resolve unique key error
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [photo, setPhoto] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentlyInView, setCurrentlyInView] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const resetForm = () => {
    setName("");
    setUsername("");
    setEmail("");
    setCountry("");
    setPhoto("");
  };

  const postUser = async () => {
    const newUser = {
      //for key error
      id: Date.now(),
      name,
      username,
      email,
      country,
      photo,
    };
    setIsOpen(!isOpen);
    try {
      const data = await createUsers(newUser);
      setLoading(true);
      setTimeout(() => {
        setUsers((prev) => [newUser, ...prev]);
        resetForm();
        setLoading(false);
      }, 300);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (user) => {
    setCurrentlyInView(user);
  };

  const handleEdit = (user) => {
    setId(user.id);
    setName(user.name || "");
    setUsername(user.username || "");
    setEmail(user.email || "");
    setCountry(user.country || "");
    setPhoto(user.photo || "");
    setCurrentId(user.id || "");
    setIsOpen(!isOpen);
    setCurrentlyInView(null);
  };

  const handleUpdate = async () => {
    if (!currentId) return;

    const updateUser = {
      id,
      name,
      username,
      email,
      country,
      photo,
    };
    try {
      const data = await updateUsers(currentId, updateUser);

      setUsers(
        users.map((user) => (user.id === currentId ? updateUser : user)),
      );

      resetForm();
      setCurrentId(null);
      setIsOpen(!isOpen);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  //for two task with one button
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      handleUpdate();
    } else {
      postUser(e);
    }
  };

  const handleDelete = async (id) => {
    if (confirm(`Are you want to delete User with id: ${id}`))
      try {
        const data = await deleteUsers(id);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        console.log(data);
        setCurrentlyInView(null);
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <>
      {loading && <LoadingState />}
      <div className="flex md:flex-col h-screen overflow-x-hidden md:pt-14 md:gap-8 md:items-center">
        <div
          className={`h-full overflow-y-auto md:overflow-y-visible scroll-smooth w-[90vw] md:w-5/6 pb-20 md:pb-0 relative${!isOpen ? " -translate-x-[90vw]" : " translate-x-0 "} md:translate-x-0 shrink-0 flex flex-col md:flex-row md:flex-wrap items-center md:items-start transition-transform duration-300 gap-3 md:gap-0 md:justify-evenly md:order-2`}
        >
          <AnimatePresence mode="wait">
            {currentlyInView ? (
              <UserModal
                //to help motion to differ
                key="modal"
                user={currentlyInView}
                onClose={() => setCurrentlyInView(null)}
                isOpen={isOpen}
                onEdit={handleEdit}
                onDelete={handleDelete}
                currentlyInView={currentlyInView}
              />
            ) : (
              <>
                <div className="w-full h-1/12 bg-white text-gray-800 dark:bg-card-dark dark:text-gray-50 font-semibold flex justify-center items-center text-2xl shrink-0 md:hidden">
                  <h1>User Database</h1>
                </div>
                {users.length > 0 ? (
                  users.map((user) => {
                    return (
                      <UserCard
                        key={user.id}
                        user={user}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                      />
                    );
                  })
                ) : (
                  <div className="flex items-start gap-3">
                    <LoaderCircle className="animate-spin" />
                    <h3> Loading...</h3>
                  </div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
        <div
          className={`min-h-screen w-[10vw] p-2 flex justify-center relative ${isOpen ? "translate-x-0" : "-translate-x-[90vw]"} md:hidden bg-accent-light dark:bg-accent-dark shrink-0 transition-transform duration-300`}
        >
          <button
            onClick={handleMenu}
            className="absolute top-5 text-gray-900 dark:text-gray-50"
          >
            {!isOpen ? <Menu size={30} /> : <X size={30} />}
          </button>
        </div>

        <div
          className={`shrink-0 w-[90vw] md:w-full relative ${isOpen ? "translate-x-0" : "-translate-x-[90vw]"} md:translate-x-0 flex flex-col items-center justify-center gap-2 md:gap-y-4 transition-transform duration-300 order-1`}
        >
          <div className="absolute md:static bg-white text-gray-800 dark:bg-card-dark dark:text-gray-50 font-semibold top-0 w-full h-1/12 flex justify-center items-center text-2xl md:bg-transparent md:dark:bg-transparent md:text-4xl md:m-4">
            <h1>User Database</h1>
          </div>
          <UserForm
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            setName={setName}
            setUsername={setUsername}
            setEmail={setEmail}
            setCountry={setCountry}
            setPhoto={setPhoto}
            name={name}
            username={username}
            email={email}
            country={country}
            photo={photo}
            currentId={currentId}
          />
          <div className="w-full mt-9 text-center text-xl hidden md:block">
            Users
          </div>
        </div>
      </div>
    </>
  );
};

export default UsersDB;
