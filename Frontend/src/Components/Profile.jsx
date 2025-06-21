const Profile = ({apiData}) => {
    <div>
        <div style={{border:'2px solid red'}}>
            <img src={apiData.image} alt="profile-img" />

            <h3>{apiData ? apiData.name : 'Guest'}</h3>
            {/* <p>{userdetails}</p> */}
          
            
        </div>
    </div>
}


export default Profile;