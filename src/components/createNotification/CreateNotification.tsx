import React, { useState } from "react";
import styles from "./CreateNotification.module.css";

export function CreateNotification() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hearingDate, setHearingDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, hearingDate });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Criar Notificação</h2>

      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={hearingDate}
        onChange={(e) => setHearingDate(e.target.value)}
      />

      <button type="submit" className={styles.button}>
        Criar
      </button>
    </form>
    
  );
}
