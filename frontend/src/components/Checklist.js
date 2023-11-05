import React, { useState } from 'react';
import './Checklist.css';

function Checklist() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (newItem.trim() !== '') {
            setItems([...items, newItem]);
            setNewItem('');
        }
    };

    const removeItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    return (
        <div>
            <h2>Checklist</h2>
            <div>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add a new item"
                />
                <button onClick={addItem}>Add</button>
            </div>
            <ul>
                {items.map((item, index) => (
                    <div className='checklist' key={index}>
                        {item}
                        <div className="listdown">
                            <label class="container">{item}
                                <span class="checkmark"></span>
                                <input class="checkbox" type="checkbox" />
                            </label>
                            <label class="container">{item}
                                <span class="checkmark"></span>
                                <input class="checkbox" type="checkbox" />
                            </label>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}
// <button onClick={() => removeItem(index)}>Remove</button>
export default Checklist;
