import axios from "axios"
import { useEffect, useState } from 'react';

function Bulb() {
    const [lighted, setLighted] = useState(true)

    function fetch() {
        axios.get("http://localhost:3036/temperature").then((res) => {
            setLighted(res.data)
            console.log(res.data);
        })
    }

    useEffect(() => {
        let bulb = document.querySelector("#bulb")
        if (lighted == true) {
            bulb.style.backgroundColor = "gray"
        }
        else {
            bulb.style.backgroundColor = "orange"
        }
    }, [])

    return (
        <div>
            <div className="bulb" id="bulb"></div>
        </div>
    )
}

export default Bulb