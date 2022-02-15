import React from 'react'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id,date,title,body,url}) => {

    const noteDate = moment(date);

    const dispatch = useDispatch()

    const note = {
        date,
        title,
        body,
        url
    }

    const handleActive = (id,note)=>{
        dispatch(activeNote(id,note))
    }

    return (
        <div 
            className="journal__entry pointer animate__animated animate__fadeIn animate__faster" 
            onClick={()=> handleActive(id,note)}
        >

            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `${url}`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>

                <p className="journal__entry-content">
                    {body}
                </p>

            </div>

            <div className="jounal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>

        </div>
    )
}
