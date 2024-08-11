"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify(formData),
      
        "content-type": "application/json",
     
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2 "
      >
        <h1>Create New User</h1>
        <label>Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required={true}
          value={formData.name}
          className="m-2 bg-slate-400 rounded"
        />
        <label>Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required={true}
          value={formData.email}
          className="m-2 bg-slate-400 rounded"
        />
        <label>Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required={true}
          value={formData.password}
          className="m-2 bg-slate-400 rounded"
        />
        <input type="submit" value={"Create User"} className="m-2 bg-blue-300 rounded hover:bg-blue-100" />
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
};

export default UserForm;
