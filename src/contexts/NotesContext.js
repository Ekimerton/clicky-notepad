"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const NotesContext = createContext();

const LOCAL_STORAGE_KEY = "clickyNotes";

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [nextId, setNextId] = useState(1);

  // Load notes from local storage on mount
  useEffect(() => {
    try {
      const storedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedNotes) {
        const parsedNotes = JSON.parse(storedNotes);
        // Basic validation
        if (
          Array.isArray(parsedNotes) &&
          parsedNotes.every((n) => typeof n.id === "number")
        ) {
          setNotes(parsedNotes);
          const maxId = parsedNotes.reduce(
            (max, note) => Math.max(max, note.id),
            0
          );
          setNextId(maxId + 1);
          // Select the first note if available and none is selected
          if (selectedNoteId === null && parsedNotes.length > 0) {
            setSelectedNoteId(parsedNotes[0].id);
          }
        } else {
          console.error(
            "Invalid or inconsistent data found in local storage for notes."
          );
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          setNotes([]);
          setNextId(1);
          setSelectedNoteId(null);
        }
      } else {
        // Initialize with a default note if storage is empty
        const defaultNote = {
          id: 1,
          title: "My First Note",
          content: "Start typing here...",
        };
        setNotes([defaultNote]);
        setSelectedNoteId(1);
        setNextId(2);
      }
    } catch (error) {
      console.error("Failed to parse notes from local storage:", error);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setNotes([]);
      setNextId(1);
      setSelectedNoteId(null);
    }
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    if (notes.length > 0 || localStorage.getItem(LOCAL_STORAGE_KEY)) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.error("Failed to save notes to local storage:", error);
      }
    }
  }, [notes]);

  const addNote = useCallback(() => {
    const newNote = { id: nextId, title: `Note ${nextId}`, content: "" };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setSelectedNoteId(newNote.id);
    setNextId((prevId) => prevId + 1);
  }, [nextId]);

  const updateNote = useCallback((id, updatedFields) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, ...updatedFields } : note
      )
    );
  }, []);

  const deleteNote = useCallback(
    (id) => {
      const remainingNotes = notes.filter((note) => note.id !== id);
      setNotes(remainingNotes);
      if (selectedNoteId === id) {
        setSelectedNoteId(
          remainingNotes.length > 0 ? remainingNotes[0].id : null
        );
      }
    },
    [selectedNoteId, notes]
  );

  const selectNote = useCallback((id) => {
    setSelectedNoteId(id);
  }, []);

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const value = {
    notes,
    selectedNoteId,
    selectedNote,
    addNote,
    updateNote,
    deleteNote,
    selectNote,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
