import { useEffect, useState } from 'react';
import {StoreContext} from './StoreContext';
import cls from '../components/Canvas/canvas.module.css';

const StoreProvider = ({ children }) => {

    const [modal, setModal] = useState(false);
    const [entries, setEntries] = useState([]);
    const [entry, setEntry] = useState({});
    const [entryValue, setEntryValue] = useState(
        entry.title
          ? entry
          : { title: '', salary: '', social: '', benefits: '' }
    );

    const isModal = () => {
        setModal(!modal);
    }

    const isNotModal = () => {
        setModal(false);
    }

    const handleBubbling = (e) => {
        e.stopPropagation();
    }

    const onChange = (e) => {
        setEntryValue({
            ...entryValue,
            [e.target.name]: e.target.value,
        })
    }

    const onAdd = (data) => {
        let id = 1
        if (entries.length > 0) {
            id = entries[entries.length - 1].id + 1
        }
        const newEntry = {...data, id};
        const newEntries = [...entries, newEntry];
        setEntries(newEntries);
        setModal(false);
        setEntryValue({ title: '', salary: '', social: '', benefits: '' })
    }

    const onDelete = (id) => {
        const filteredEntries = entries.filter((entry) => entry.id !== id);
        setEntries(filteredEntries);
        localStorage.setItem('list', JSON.stringify(filteredEntries));
    }

    const reducers = {
        isModal, isNotModal,
        handleBubbling,
        onChange, onAdd, onDelete
    }

    const value = {
        modal, setModal,
        entries, setEntries,
        entry, setEntry,
        entryValue, setEntryValue,
        reducers
    }

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('list'))
        if (list) setEntries(list)
    }, [])

    useEffect(() => {
        if (entries.length === 0) return
        localStorage.setItem('list', JSON.stringify(entries))
    }, [entries])

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    )
};

export default StoreProvider;