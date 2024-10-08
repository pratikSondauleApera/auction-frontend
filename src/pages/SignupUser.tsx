import axios from "axios"
import { useEffect, useState } from "react"

function SignupUser() {

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

    const [error, setErrors] = useState({
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

    const handleValidation = () => {

        let isValid = true

        let newErrors = { ...error }

        if (formData.firstName.trim() === '') {
            newErrors.firstName = 'Firstname is required'
            isValid = false
        } else {
            newErrors.firstName = ''
        }

        if (formData.lastName.trim() === '') {
            newErrors.lastName = 'Lastname is required'
            isValid = false
        } else {
            newErrors.lastName = ''
        }

        if (formData.email.trim() === '') {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!formData.email.includes('@') && !formData.email.includes('.com')) {
            newErrors.email = 'Invalid email address'
            isValid = false
        } else {
            newErrors.email = ''
        }

        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required'
            isValid = false
        } else {
            newErrors.password = ''
        }

        if (formData.phone.trim() === '') {
            newErrors.phone = 'Phone is required'
            isValid = false
        } else {
            newErrors.phone = ''
        }

        if (formData.address.trim() === '') {
            newErrors.address = 'Address is required'
            isValid = false
        } else {
            newErrors.address = ''
        }

        if (formData.stateId.trim() === '') {
            newErrors.stateId = 'State is required'
            isValid = false
        } else {
            newErrors.stateId = ''
        }

        if (formData.cityId.trim() === '') {
            newErrors.cityId = 'City is required'
            isValid = false
        } else {
            newErrors.cityId = ''
        }

        if (formData.pincode.trim() === '') {
            newErrors.pincode = 'Pincode is required'
            isValid = false
        } else {
            newErrors.pincode = ''
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        let url;

        if (handleValidation()) {

            try {

                if (userType === 'USER') {
                    url = 'http://209.182.232.11:8000/user/create-user'
                } else {
                    url = 'http://209.182.232.11:8000/data-entry/create-user'
                }

                const res = await axios.post(url, formData)
                const data = res.data
                if (res.data.status === true) {
                    alert(res.data.message)
                }
                console.log('User Data ', data)
                return data
            } catch (error: any) {
                console.log(error)
                console.log("ERROR ", error.response.data)
                alert(error.response.data.message)
            }
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
            <div className="flex justify-center items-center">
                <div className="w-full max-w-md p-8 shadow-md my-12">
                    <h1 className="text-2xl text-center font-semibold">Create your account</h1>
                    <form method="POST">
                        <div className="flex justify-around items-center">
                            <div className="flex items-center my-3">
                                <input className="h-4 w-4 mr-1" type="radio" name="user" value='USER' onChange={(e) => { setUserType('USER') }} checked />
                                <label>User</label>
                            </div>
                            <div className="flex items-center my-3">
                                <input className="h-4 w-4 mr-1" type="radio" name="user" value='DE' onChange={(e) => { setUserType('DE') }} />
                                <label>Data-entry user</label>
                            </div>
                        </div>
                        <div className="my-3">
                            <input className="w-full h-8 px-3 border-solid border-2 rounded-m" type="text" placeholder="Firstname" name="firstName" value={formData.firstName} onChange={handleChange} />
                            <span>{error.firstName}</span>
                        </div>
                        <div className="my-3">
                            <input className="w-full h-8 px-3 border-solid border-2 rounded-m" type="text" placeholder="Lastname" name="lastName" value={formData.lastName} onChange={handleChange} />
                            <span>{error.lastName}</span>
                        </div>
                        <div className="my-3">
                            <input className="w-full h-8 px-3 border-solid border-2 rounded-m" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                            <span>{error.email}</span>
                        </div>
                        <div className="my-3">
                            <input className="w-full h-8 px-3 border-solid border-2 rounded-m" type="text" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                            <span>{error.password}</span>
                        </div>
                        <div className="my-3">
                            <input className="w-full h-8 px-3 border-solid border-2 rounded-m" type="text" placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                            <span>{error.phone}</span>
                        </div>
                        <div className="my-3">
                            <select className="w-full h-8 px-3 border-solid border-2 rounded-m" name="stateId" value={formData.stateId} onChange={handleChange}>
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
                            <span>{error.stateId}</span>
                        </div>
                        <div className="my-3">
                            <select className="w-full h-8 px-3 border-solid border-2 rounded-m" name="cityId" value={formData.cityId} onChange={handleChange}>
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
                            <span>{error.cityId}</span>
                        </div>
                        <div className="my-3">
                            <input className="w-full h-8 px-3 border-solid border-2 rounded-m" type="text" placeholder="Address" name="address" value={formData.address} onChange={handleChange} />
                            <span>{error.address}</span>
                        </div>
                        <div className="my-3">
                            <input className="w-full h-8 px-3 border-solid border-2 rounded-m" type="text" placeholder="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
                            <span>{error.pincode}</span>
                        </div>
                        <div className="my-3 flex justify-center">
                            <button className="border-solid border-2 px-3 py-2 rounded-md cursor-pointer" onClick={handleSubmit}>Create account</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignupUser