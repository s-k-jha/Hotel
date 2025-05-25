function MenuForm ({showForm, setShowForm, formData, handleChange, handleSubmit}){
    return (
    <div className="App">
      {/* <h1>ADMIN PANEL</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <button onClick={() => setShowForm(true)}>Add Menu Item</button>
        </div>
        <div>
          <button onClick={() => console.log("add person functioon")}>Add Staff Members</button>
        </div>
      </div> */}

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
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}

export default MenuForm;