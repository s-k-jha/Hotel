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
    image: null
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const payload = {
  //     name: formData.name,
  //     price: Number(formData.price),
  //     taste: formData.taste,
  //     is_drink: formData.is_drink,
  //     sales: formData.sales ? Number(formData.sales) : 0,
  //     image: formData.image,
  //   }

  //   try {
  //     const res = await fetch('https://hotel-server-abx9.onrender.com/menu', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(payload),
  //     })
  //     const data = await res.json()
  //     alert('Item added successfully!')
  //     setFormData({
  //       name: '',
  //       price: '',
  //       taste: 'sweet',
  //       is_drink: false,
  //       sales: '',
  //       image: ''
  //     })
  //     setShowForm(false)
  //   } catch (err) {
  //     alert('Failed to add item.')
  //     console.error(err)
  //   }
  // }

  // Staff Form Data Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('taste', formData.taste);
    formDataToSend.append('is_drink', formData.is_drink);
    formDataToSend.append('sales', formData.sales || 0);
    formDataToSend.append('image', formData.image); // This is the File object

    try {
      const res = await fetch('http://localhost:3000/menu', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await res.json();
      alert('Item added successfully!');
      setFormData({
        name: '',
        price: '',
        taste: 'sweet',
        is_drink: false,
        sales: '',
        image: null
      });
      setShowForm(false);
    } catch (err) {
      alert('Failed to add item.');
      console.error(err);
    }
  };

  const [staffFormData, setStaffFormData] = useState({
    name: '',
    age: '',
    work: '',
    email: '',
    phone: '',
    address: '',
    username: '',
    password: '',
    image: null
  })
  const handleStaffChange = (e) => {
    const { name, value, type, files } = e.target
    setStaffFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }))
  }
  // const handleStaffSubmit = async (e) => {
  //   e.preventDefault()
  //   // const payload = {
  //   //   name: staffFormData.name,
  //   //   age: Number(staffFormData.age),
  //   //   work: staffFormData.work,
  //   //   email: staffFormData.email,
  //   //   phone: staffFormData.phone,
  //   //   address: staffFormData.address,
  //   //   username: staffFormData.username,
  //   //   password: staffFormData.password
  //   // }
  //   const formData = new FormData();
  //   formData.append('name', staffFormData.name);
  //   formData.append('age', staffFormData.age);
  //   formData.append('work', staffFormData.work);
  //   formData.append('email', staffFormData.email);
  //   formData.append('phone', staffFormData.phone);
  //   formData.append('address', staffFormData.address);
  //   formData.append('username', staffFormData.username);
  //   formData.append('password', staffFormData.password);
  //   formData.append('image',staffFormData.image);


  //   try {
  //     const res = await fetch('http://localhost:3000/person', {
  //       method: 'POST',
  //       // headers: { 'Content-Type': 'application/json' },
  //       // body: JSON.stringify(payload),
  //       body: formData
  //     })
  //     const data = await res.json()
  //     alert('Staff member added successfully!')
  //     setStaffFormData({
  //       name: '',
  //       age: '',
  //       work: '',
  //       email: '',
  //       phone: '',
  //       address: '',
  //       username: '',
  //       password: '',
  //       image: null
  //     })
  //     setShowStaffForm(false)
  //   } catch (err) {
  //     alert('Failed to add staff member.')
  //     console.error(err)
  //   }
  // }
  const handleStaffSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', staffFormData.name);
    formDataToSend.append('age', staffFormData.age);
    formDataToSend.append('work', staffFormData.work);
    formDataToSend.append('email', staffFormData.email);
    formDataToSend.append('phone', staffFormData.phone);
    formDataToSend.append('address', staffFormData.address);
    formDataToSend.append('username', staffFormData.username);
    formDataToSend.append('password', staffFormData.password);
    formDataToSend.append('image', staffFormData.image); // file

    try {
      const res = await fetch('http://localhost:3000/person/signup', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await res.json();
      alert('Staff member added successfully!');
      setStaffFormData({
        name: '',
        age: '',
        work: '',
        email: '',
        phone: '',
        address: '',
        username: '',
        password: '',
        image: null
      });
      setShowStaffForm(false);
    } catch (err) {
      alert('Failed to add staff member.');
      console.error(err);
    }
  };


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
        setFormData={setStaffFormData}
      />}

      {
        showStaffForm &&
        <PersonForm
          showForm={showStaffForm}
          setShowForm={setShowStaffForm}
          formData={staffFormData}
          handleChange={handleStaffChange}
          handleSubmit={handleStaffSubmit}
          setFormData={setFormData}

        />

      }


    </>



  );
}

export default App