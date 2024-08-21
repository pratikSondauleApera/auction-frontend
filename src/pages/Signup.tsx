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

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
                    <input type="radio" value='USER' onChange={(e) => { setUserType('USER') }} />
                    <label>Data-entry</label>
                    <input type="radio" value='DE' onChange={(e) => { setUserType('DE') }} />
                    <input type="text" placeholder="Firstname" value={formData.firstName} onChange={handleChange} />
                    <input type="text" placeholder="Lastname" value={formData.lastName} onChange={handleChange} />
                    <input type="text" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <input type="text" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <input type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} />
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
                    <input type="text" placeholder="Address" value={formData.address} onChange={handleChange} />
                    <input type="text" placeholder="Pincode" value={formData.pincode} onChange={handleChange} />

                    <button>Create account</button>
                </form>
            </div>
        </>
    )
}

export default Signup