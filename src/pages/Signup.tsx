import axios from "axios"
import { useEffect, useState } from "react"

function Signup() {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        stateId: "",
        cityId: "",
        pincode: ""
    })

    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [userType, setUserType] = useState('USER')

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        let url;

        try {

            if (userType === 'USER') {
                url = 'http://209.182.232.11:8000/user/create-user'
            } else {
                url = 'http://209.182.232.11:8000/data-entry/create-user'
            }

            const res = await axios.post(url, formData)
            const data = res.data
            console.log('User Data ', data)
            return data
        } catch (error: any) {
            console.log("ERROR ", error.response.data)
        }
    }

    async function getStates() {
        try {
            const res = await axios.get('http://209.182.232.11:8000/user/states')
            const states = res.data.states
            setStates(states)
            return states
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    }

    async function getCitiesByStateId() {
        try {
            const res = await axios.get(`http://209.182.232.11:8000/user/cities-by-state/${formData.stateId}`)
            const cities = res.data.cities
            setCities(cities)
            return cities
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    }

    useEffect(() => {
        getStates();
    }, [])

    useEffect(() => {
        if (formData.stateId) {
            getCitiesByStateId();
        }
    }, [formData.stateId])

    return (
        <>
            <div>
                <h1>Create your account</h1>
                <form method="POST">
                    <label>User</label>
                    <input type="radio" name="user" value='USER' onChange={(e) => { setUserType('USER') }} />
                    <label>Data-entry user</label>
                    <input type="radio" name="user" value='DE' onChange={(e) => { setUserType('DE') }} />
                    <input type="text" placeholder="Firstname" name="firstName" value={formData.firstName} onChange={handleChange} />
                    <input type="text" placeholder="Lastname" name="lastName" value={formData.lastName} onChange={handleChange} />
                    <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                    <input type="text" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    <input type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                    <select name="stateId" value={formData.stateId} onChange={handleChange}>
                        <option>Select state</option>
                        {
                            states?.length
                                ? states?.map((item: any) => {
                                    return (
                                        <option className="" key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </option>
                                    );
                                })
                                : "No State Found"
                        }
                    </select>
                    <select name="cityId" value={formData.cityId} onChange={handleChange}>
                        <option>Select city</option>
                        {
                            cities?.length
                                ? cities?.map((item: any) => {
                                    return (
                                        <option className="" key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </option>
                                    );
                                })
                                : "No City Found"
                        }
                    </select>
                    <input type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
                    <input type="text" placeholder="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />

                    <button onClick={handleSubmit}>Create account</button>
                </form>
            </div>
        </>
    )
}

export default Signup