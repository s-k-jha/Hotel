function MenuForm({ showForm, setShowForm, formData, handleChange, handleSubmit }) {
    return (
        <div className="App">
            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required style={{ marginRight: '10px' }} />
                    <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
                    <br />

                    <br />
                    {/* <input name="ingredients" value={formData.ingredients} onChange={handleChange} placeholder="Ingredients (comma separated)" /> */}
                    <input name="sales" type="number" value={formData.sales} onChange={handleChange} placeholder="Sales (default 0)" style={{ marginRight: '10px' }} />
                    <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
                    <br />
                    <br />
                    <select name="taste" value={formData.taste} onChange={handleChange} required>
                        <option value="sweet">Sweet</option>
                        <option value="sour">Sour</option>
                        <option value="spicy">Spicy</option>
                    </select>

                    <label>
                        <input name="is_drink" type="checkbox" checked={formData.is_drink} onChange={handleChange} />
                        Is Drink
                    </label>
                    <br />
                    <button type="submit" style={{marginTop:'10px',marginRight:'15px'}}>Submit</button>
                    <button onClick={() => { setShowForm(false) }} style={{ marginTop: '10px' }}>Cancel</button>

                </form>
            )}
        </div>
    )
}

export default MenuForm;