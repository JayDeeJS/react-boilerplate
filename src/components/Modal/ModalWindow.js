import { useContext } from 'react';
import ModalWrapper from './ModalWrapper';
import cls from './modal.module.css';
import { StoreContext } from '../../store/StoreContext';
import Input from '../../UI/Input';

const ModalWindow = () => {

    const { entryValue, setEntryValue, reducers } = useContext(StoreContext);

    return (
        <ModalWrapper>
            <div className={cls.wrapper} onClick={reducers.isNotModal}>
                <div className={cls.window} onClick={reducers.handleBubbling}>
                    {
                        Object.keys(entryValue).map((entry) =>
                            entry !== 'id' && (<Input
                                                  key={entry}
                                                  name={entry}
                                                  value={entryValue[entry]}
                                                  placeholder={entry}
                                                  onChange={reducers.onChange}
                                               />)
                        )
                    }
                    <button onClick={() => reducers.onAdd(entryValue)}>Create priority option</button>
                </div>
            </div>
        </ModalWrapper>
    )
};

export default ModalWindow;