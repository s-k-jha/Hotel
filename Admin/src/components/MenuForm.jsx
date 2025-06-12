function MenuForm({ showForm, setShowForm, formData, setFormData, handleSubmit }) {
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    return (
        <div className="App">
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        marginTop: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        maxWidth: '400px',
                        marginInline: 'auto',
                    }}
                    encType="multipart/form-data"
                >
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />

                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />

                    <input
                        name="sales"
                        type="number"
                        value={formData.sales}
                        onChange={handleChange}
                        placeholder="Sales (default 0)"
                    />
                    <select
                        name="taste"
                        value={formData.taste}
                        onChange={handleChange}
                        required
                    >
                        <option value="sweet">Sweet</option>
                        <option value="sour">Sour</option>
                        <option value="spicy">Spicy</option>
                    </select>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <input
                            name="is_drink"
                            type="checkbox"
                            checked={formData.is_drink}
                            onChange={handleChange}
                        />
                        Is Drink
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                        Upload Image
                        <input
                            name="image"
                            type="file"
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default MenuForm;