import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';


const LinksForm = (props) => {
    const initialValues = {
        url: '',
        name: '',
        description: '',
    };

    const [values, setValues] = useState(initialValues);

    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]: value})
    }

    const validateUrl = str => {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);

    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateUrl(values.url)) {
            return (
                toast('Url Inválido', {
                    type: 'warning',
                    autoClose: 2000
                }) 
            )
        }
        props.addOrEditLink(values)
        setValues({...initialValues});
    }
    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()});
    }

    useEffect(() => {
        if(props.currentId === ''){
            setValues({...initialValues});
        }else{
            getLinkById(props.currentId)

        }
    }, [props.currentId]);


    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <div className='form-input'>
                <div className="form-container">
                    <i className="material-icons">insert_link</i>
                    <input 
                        type="text" 
                        className='form-input-url' 
                        placeholder='https://url.com' 
                        name='url'
                        onChange={handleInputChange}
                        value={values.url}
                    />

                </div>
            </div>
            <div className='form-input'>
                <div className="form-container">
                    <i className="material-icons">create</i>
                    <input 
                        type="text" 
                        className='form-input-web' 
                        placeholder='Website Name' 
                        name='name'
                        onChange={handleInputChange}
                        value={values.name}
                    />

                </div>
            </div>
            <div className="form-input">
                <div className="form-container">
                    <textarea 
                        className="form-textarea"
                        name="description" 
                        rows="3" 
                        placeholder='Escribe una descripción'
                        onChange={handleInputChange}
                        value={values.description}
                    >
                    </textarea>
                </div>
            </div>
            <button 
                className='btn' 
            >
                {props.currentId === '' ? 'Guardar' : 'Actualizar'}
            </button>
        </form>
    )
}

export default LinksForm
 