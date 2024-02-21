import { useContext } from "react";
import { StoreContext } from "../../store/StoreContext";
import cls from './canvas.module.css';
import ModalWindow from "../Modal/ModalWindow";

const Canvas = () => {

    const { modal, setModal, entries, reducers } = useContext(StoreContext);

    const handlePriority = (entry) => {
        if (entry.salary >= 450 && entry.social === 'yes' && entry.benefits === 'yes') {
            return cls.high;
        } else if (entry.salary >= 350 && entry.salary <= 449 && entry.social === 'yes' && entry.benefits === 'yes') {
            return cls.medium;
        } else if (entry.salary <= 349 && (entry.social === 'no' || entry.benefits === 'no')) {
            return cls.low;
        } else if (entry.salary <= 349 && entry.social === 'no' && entry.benefits === 'no') {
            return cls.lowest;
        }
        return "";
    }

    return (
        <div className={cls.canvas}>
            <h3 className={cls.canvas_title}>Prioritizer</h3>
            <button onClick={reducers.isModal}>Create options</button>
            
            { modal && (<ModalWindow/>) }
            
            <section className={cls.entries}>
                {
                    entries.length === 0
                      ? <h5>No entries</h5>
                      : entries.map((entry) =>
                        <section key={entry.id} className={`${cls.entry_card} ${handlePriority(entry)}`}>
                            <p>{entry.title}</p>
                            <i>{entry.salary}</i>
                            <p>{entry.social}</p>
                            <p>{entry.benefits}</p>
                            <button onClick={() => reducers.onDelete(entry.id)}>Delete priority option</button>
                        </section>
                      )
                }
            </section>
        </div>
    )
};

export default Canvas;