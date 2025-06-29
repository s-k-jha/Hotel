function PersonForm({ showForm, setShowForm, formData, handleChange, handleSubmit,setFormData }) {

    return (
        <div className="App">
            {showForm && (
                <form onSubmit={handleSubmit} style={{ marginTop: '20px' }} encType="multipart/form-data">
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        required
                        style={{ marginRight: '10px' }}
                    />
                    <br />
                    <input
                        name="work"
                        value={formData.work}
                        onChange={handleChange}
                        placeholder="Work"
                        required
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        style={{ marginRight: '10px' }}
                    />
                    <br />
                    <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        required
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                        style={{ marginRight: '10px' }}
                    />
                    <br />
                    <h3>Allot Username and Password :</h3>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        required
                        style={{ marginRight: '10px', marginTop: '10px' }}
                    />
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        style={{ marginRight: '10px', marginTop: '10px' }}
                    />
                    
                    <br />
                    <br />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                        Profile Image
                        <input
                            name="image"
                            type="file"
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <br />

                    <button type="submit" style={{ marginTop: '10px', marginRight:'15px'}}>Submit</button>
                    <button onClick={()=>{setShowForm(false)}} style={{ marginTop: '10px' }}>Cancel</button>

                </form>
            )}
        </div>
    );
}

export default PersonForm;