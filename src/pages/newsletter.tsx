import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ServerResponse } from "./api/newsletter";

const Newsletter: NextPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setConfirmMessage("");
    e.preventDefault();

    try {
      const raw = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
        }),
      });

      const response: ServerResponse = await raw.json();

      if (response.success) {
        setConfirmMessage(response.message);
        setEmailInput("");
        return;
      }

      setErrorMessage(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error as string);
      }
    }
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form
          data-test="newsletter"
          onSubmit={handleSubmit}
          style={{
            maxWidth: "350px",
            backgroundColor: "#eee",
            padding: "30px",
            paddingTop: "25px",
            borderRadius: "10px",
            borderColor: "#666",
            borderWidth: "2px",
          }}
        >
          {confirmMessage && (
            <div data-test="successMessage">{confirmMessage}</div>
          )}
          {errorMessage && (
            <div data-test="errorMessage" style={{ color: "red" }}>
              Error: {errorMessage}
            </div>
          )}
          <h3 style={{ marginTop: 0 }}>Sign up for our newsletter!</h3>
          <input
            type={"email"}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            data-test="emailInput"
            id="emailInput"
            formNoValidate
            style={{
              height: "32px",
              paddingLeft: "5px",
              width: "200px",
            }}
            placeholder="your@email.com"
          />
          <input
            type={"submit"}
            data-test="formSubmit"
            style={{
              height: "30px",
              marginLeft: "5px",
              backgroundColor: "blue",
              color: "white",
              borderColor: "blue",
              borderRadius: "5px",
            }}
          />
        </form>
      </main>
    </div>
  );
};

export default Newsletter;
