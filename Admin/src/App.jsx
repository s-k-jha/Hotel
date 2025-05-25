import { useState } from 'react'
import './App.css'
import MenuForm from './components/MenuForm'
// import Person from '../../Backend/models/person'
import PersonForm from './components/PersonForm'
function App() {
  const [showForm, setShowForm] = useState(false)
  const [showStaffForm, setShowStaffForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    taste: 'sweet',
    is_drink: false,
    sales: '',
    image: ''
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name: formData.name,
      price: Number(formData.price),
      taste: formData.taste,
      is_drink: formData.is_drink,
      sales: formData.sales ? Number(formData.sales) : 0,
      image: formData.image,
    }

    try {
      const res = await fetch('https://hotel-server-abx9.onrender.com/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      alert('Item added successfully!')
      setFormData({
        name: '',
        price: '',
        taste: 'sweet',
        is_drink: false,
        sales: '',
        image: ''
      })
      setShowForm(false)
    } catch (err) {
      alert('Failed to add item.')
      console.error(err)
    }
  }

  // Staff Form Data Handler
  const [staffFormData, setStaffFormData] = useState({
    name: '',
    age: '',
    work: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: ''
  })
  const handleStaffChange = (e) => {
    const { name, value } = e.target
    setStaffFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleStaffSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      name: staffFormData.name,
      age: Number(staffFormData.age),
      work: staffFormData.work,
      email: staffFormData.email,
      phone: staffFormData.phone,
      address: staffFormData.address,
      username: staffFormData.username,
      password: staffFormData.password
    }

    try {
      const res = await fetch('https://hotel-server-abx9.onrender.com/person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      alert('Staff member added successfully!')
      setStaffFormData({
        name: '',
        age: '',
        work: '',
        email: '',
        phone: '',
        address: '',
        username: '',
        password: ''
      })
      setShowStaffForm(false)
    } catch (err) {
      alert('Failed to add staff member.')
      console.error(err)
    }
  }

  return (
    <>

      <div className="App">
        <h1>ADMIN PANEL</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <button onClick={() => {
              setShowForm(true)
              setShowStaffForm(false)
            }}>Add Menu Item</button>
          </div>
          <div>
            <button onClick={() => {
              setShowStaffForm(true)
              setShowForm(false)
            }}>Add Staff Members</button>
          </div>
        </div>
      </div>

      {showForm && <MenuForm
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />}

      {
        showStaffForm &&
        <PersonForm
          showForm={showStaffForm}
          setShowForm={setShowStaffForm}
          formData={staffFormData}
          handleChange={handleStaffChange}
          handleSubmit={handleStaffSubmit}
        />

      }


    </>



  );
}

export default App