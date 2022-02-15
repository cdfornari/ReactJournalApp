import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startFileUpload, startSaveNote } from '../../actions/notes'

export const NotesAppBar = () => {

    const dispatch = useDispatch();

    const {active} = useSelector(state => state.notes);

    const fileInput = useRef();

    const handleSave = ()=>{
        dispatch(startSaveNote(active));
    }

    const handlePictureUpload = ()=>{
        fileInput.current.click();
    }

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            dispatch(startFileUpload(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>12 de marzo de 2022</span>

            <input 
                ref={fileInput}
                type="file"
                name="file"
                style={{display: "none"}}
                onChange={handleFileChange}
            />
            <div>
                <button 
                    className="btn"
                    onClick={handlePictureUpload}
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
