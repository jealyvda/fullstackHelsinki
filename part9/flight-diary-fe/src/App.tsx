import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "./constants";

import { NonSensitiveDiaryEntry, NewDiaryEntry, Weather, Visibility, DiaryError } from "./types";

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState<NewDiaryEntry>({} as NewDiaryEntry);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get<NonSensitiveDiaryEntry[]>(`${apiBaseUrl}/diaries`);
        setDiaries(response.data);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    };

    fetchDiaries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEntry(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${apiBaseUrl}/diaries`, newEntry);
      setNewEntry({} as NewDiaryEntry);
      setError(null);
    } catch (error) {
      const e = error as DiaryError;
      console.error("Error adding new diary entry:");
      setError(`Failed to add new diary entry. ${e.response?.data}`);
    }
  };

  return (
    <div>
      <h1>Diary Entries</h1>
      <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Add New Diary Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={newEntry.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Weather:</label>
          {Object.values(Weather).map((weatherOption) => (
            <label key={weatherOption}>
              <input
                type="radio"
                name="weather"
                value={weatherOption}
                checked={newEntry.weather === weatherOption}
                onChange={handleChange}
              />
              {weatherOption}
            </label>
          ))}
        </div>
        <div>
          <label>Visibility:</label>
          {Object.values(Visibility).map((visibilityOption) => (
            <label key={visibilityOption}>
              <input
                type="radio"
                name="visibility"
                value={visibilityOption}
                checked={newEntry.visibility === visibilityOption}
                onChange={handleChange}
              />
              {visibilityOption}
            </label>
          ))}
        </div>
        <div>
          <label>Comment:</label>
          <textarea name="comment" value={newEntry.comment} onChange={handleChange} required />
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <h2>Date: {diary.date}</h2>
            <p>Weather: {diary.weather}</p>
            <p>Visibility: {diary.visibility}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
