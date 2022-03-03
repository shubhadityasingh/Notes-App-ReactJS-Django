import React, { createContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let [note, setNote] = useState(null);

  useEffect(() => {
    getNote();
  }, [id]);

  let getNote = async () => {
    if(id === 'new') return

    let response = await fetch(`/api/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  }

  let updateNote = async () => {
    await fetch(`/api/notes/${id}/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    navigate('/')
  }


  let createNote = async () => {
    await fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    navigate('/')
  }


  let deleteNote = async () => {
    console.log('delete triggered')
    await fetch(`/api/notes/${id}/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    navigate('/')
  }


  let handleSubmit = () => {
    console.log(note)
    if(id === 'new') {
      if(note === null) navigate('/')
      else if(note.body === '') navigate('/');
      else createNote();
    }
    else {
      if(note === null) deleteNote();
      else if(note.body === '') deleteNote();
      else updateNote();
    }




    // if(id !== 'new') {
    //   if(note.body === '') deleteNote()
    //   else updateNote()
    // }
    // else {
    //   if(note == null) navigate('/')
    //   else if(note.body === '') navigate('/')
    //   else createNote()
    // }

    // if(id !== 'new' && note.body === '') {
    //   deleteNote()
    // }
    // else if(id !== 'new') {
    //   updateNote()
    // }
    // else if(id === 'new' && note != null) {
    //   createNote()
    // }
    // else if(id === 'new' && note == null) {
    //   navigate('/')
    // }
  }


  let handleChange = (value) => {
    setNote((note) => {return {...note, 'body': value}})

  }



  return (
    <div className="note">
      <div className="note-header">
        <h3>
            <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id === 'new' ? (
          <button onClick={handleSubmit}>Done</button>
        ) : (
          <button onClick={deleteNote}>Delete</button>
        )}
      </div>
      <textarea onChange={(e) => {handleChange(e.target.value);console.log(note);}} value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
