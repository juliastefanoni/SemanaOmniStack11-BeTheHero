import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('OngId');

    const history = useHistory();

    async function handleNewIncident(event){
        event.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try{
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            alert('Caso cadastrado com sucesso!');
            history.push('/profile');
        } catch (error){
            alert('Erro ao cadastro caso', error);
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Digitar o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to="/profile" className="back-link"> 
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                     placeholder="Título do caso"
                     value={title}
                     onChange={event => setTitle(event.target.value)}
                    />
                    <textarea 
                     placeholder="Descrição"
                     value={description}
                     onChange={event => setDescription(event.target.value)}
                    />
                    <input 
                     placeholder="Valor em reais"
                     value={value}
                     onChange={event => setValue(event.target.value)}
                    />

                    <button className="button" type="submit"> Cadastrar</button>

                </form>
            </div>
        </div>
    );
}