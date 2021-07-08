import React, { useState, useEffect } from 'react';
import LinksForm from './LinkForm';

import { db } from '../firebase/config';
import { toast } from 'react-toastify';

const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');


    const addOrEditLink = async (linkObject) => {
        try {
            if(currentId === ''){
                // .collection-crea un conjunto de datos 'links'
                // .doc-id único, como un key       
                await db.collection('links').doc().set(linkObject);
                toast('Nuevo enlace agregado', {
                    type: 'success'
                })     
            }else {
                await db.collection('links').doc(currentId).update(linkObject);
                toast('Enlace actualizado', {
                    type: 'info'
                })     
            }
        } catch (error) {
            console.error(error)
        }
    }

    
    useEffect(() => {
        getLinks();

    }, [])


    const getLinks = async () => {
        db.collection('links')
            .onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id: doc.id})
                });
                setLinks(docs);
            });
    }

    
    const deleteLink = async (linkId) => { 
        if(window.confirm('Estas seguro de que deseas eliminar el enlace?')){
           await db.collection('links').doc(linkId).delete();
           toast('Enlace removido', {
            type: 'error',
            autoClose: 2000,
            })
        }
    }


    return (
        <>
            <div>
                <LinksForm {...{addOrEditLink, currentId, links}} />
                <div className="links">
                    {links.map(link => {
                        const {id, name, url, description} = link 
                        return (
                            <div className="link-container" key={id}>
                                <div className="link-container-divider"/>
                                <div className="link-container-top">
                                    <div className="name-container">
                                        <h4>{name}</h4>
                                        <div className='icons-container'>
                                            <i className='material-icons edit'
                                                onClick={()=> setCurrentId(id)}>
                                                create
                                            </i>
                                            <i 
                                                className='material-icons close' 
                                                onClick={() => deleteLink(id)}>
                                                close
                                            </i>
                    
                                        </div>
                                    </div>
                                    <p>{description}</p>

                                </div>
                                <div className="web-container">
                                    <span className='text'>Go to web</span>
                                    <div className="link">
                                        <a href={url} target='_blank' rel='noreferrer' >
                                            <i className='material-icons site'>network_cell</i> 
                                        </a>                                
                                    </div>

                                </div>
                                <div className="link-container-divider2"/>

                            </div>
                        ) 
                        
                    })}
                </div>
            </div>
                        
        </>
    )
}

export default Links
 