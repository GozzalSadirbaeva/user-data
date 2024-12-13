import React, { useEffect, useState } from "react";

function Main() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [age, setAge] = useState("");
  const [addrtype, setAddrtype] = useState("");
  const [prof, setProf] = useState("");
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [change, setChange] = useState(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fname.trim || !lname.trim || !age.trim || !addrtype || !prof.trim) {
      return null;
    }
    let users = {
      fname,
      lname,
      age,
      addrtype,
      prof,
      id: new Date().getTime(),
    };
    setData((prev) => [...prev, users]);
    setFname("");
    setLname("");
    setAge("");
    setAddrtype("");
    setProf("");
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (user) => {
    setEditData(user);
    setEdit(true);
  };

  const handleEditData = (value, key) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const handleChange = () => {
    const index = data.findIndex((item) => item.id === editData.id);

    data[index] = editData;
    setEdit(false);
  };

  return (
    <>
      <h1 className="text-center pt-7 font-bold text-3xl text-white">
        User Data
      </h1>
      <div className="flex pt-10 gap-8">
        <div className="flex-none w-72 h-screen ml-0">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-5 "
          >
            <input
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="First Name"
              type="text"
            />
            <input
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              placeholder="Last Name"
              type="text"
            />
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              type="text"
            />
            <select
              value={addrtype}
              onChange={(e) => setAddrtype(e.target.value)}
              name="Gender"
              id=""
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              value={prof}
              onChange={(e) => setProf(e.target.value)}
              placeholder="Profession"
              type="text"
            />
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {data?.map((user) => (
            <div key={user.id} className="card">
              <img className="" src="/ava.jpg" alt="" />
              <div className="bg-[#567ff0] text-white p-8">
                <h3>First Name: {user.fname}</h3>
                <h3>Last Name: {user.lname}</h3>
                <p>Age: {user.age}</p>
                <p>Gender: {user.addrtype}</p>
                <p>Profession: {user.prof}</p>
                <div className="flex justify-around pt-3">
                  <button
                    className="px-8 py-2 rounded bg-slate-200 text-black"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-8 py-2 rounded bg-slate-200 text-black"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {edit && (
        <div className="edit">
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-5 "
          >
            <input
              value={editData.fname}
              onChange={(e) => handleEditData(e.target.value, "fname")}
              placeholder="First Name"
              type="text"
            />
            <input
              value={editData.lname}
              onChange={(e) => handleEditData(e.target.value, "lname")}
              placeholder="Last Name"
              type="text"
            />
            <input
              value={editData.age}
              onChange={(e) => handleEditData(e.target.value, "age")}
              placeholder="Age"
              type="text"
            />
            <select
              value={editData.addrtype}
              onChange={(e) => handleEditData(e.target.value, "addrtype")}
              name="Gender"
              id=""
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              value={editData.prof}
              onChange={(e) => handleEditData(e.target.value, "prof")}
              placeholder="Profession"
              type="text"
            />
            <div className="flex gap-10">
              <button
                onClick={() => handleChange()}
                className="submit"
                type="button"
              >
                Change
              </button>
              <button className="submit close" onClick={() => setEdit(false)}>
                Close
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Main;
