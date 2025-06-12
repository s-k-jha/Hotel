function MenuForm({ showForm, setShowForm, formData, setFormData, handleSubmit }) {

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });  // store file
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className="App">
            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }} encType="multipart/form-data">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required style={{ marginRight: '10px' }} />
                    <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
                    <br /><br />
                    <input name="sales" type="number" value={formData.sales} onChange={handleChange} placeholder="Sales (default 0)" style={{ marginRight: '10px' }} />
                    
                    <input name="image" type="file" onChange={handleChange} required />
                    <br /><br />
                    <select name="taste" value={formData.taste} onChange={handleChange} required>
                        <option value="sweet">Sweet</option>
                        <option value="sour">Sour</option>
                        <option value="spicy">Spicy</option>
                    </select>

                    <label style={{ marginLeft: '10px' }}>
                        <input name="is_drink" type="checkbox" checked={formData.is_drink} onChange={handleChange} />
                        Is Drink
                    </label>
                    <br />
                    <button type="submit" style={{ marginTop: '10px', marginRight: '15px' }}>Submit</button>
                    <button type="button" onClick={() => setShowForm(false)} style={{ marginTop: '10px' }}>Cancel</button>
                </form>
            )}
        </div>
    );
}

export default MenuForm;