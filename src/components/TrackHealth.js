// import React, { useState } from 'react';
// import TopNavBar from './TopNav';
// import '../styles/trackhealth.css';



// const HeartHealthForm = () => {
//     const [showResult, setShowResult] = useState(false);
//     const [result, setResult] = useState("");

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData(e.target);
//         const data = {};

//         formData.forEach((value, key) => {
//             data[key] = value;
//         });

//         try {
//             const response = await fetch('http://localhost:5000/api/save_heart_data', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify(data)
//             });

//             if (response.headers.get("content-type")?.includes("application/json")) {
//                 const responseData = await response.json();  
//                 if ((response.status === 200 || response.status === 201) && responseData.message === "Data saved successfully") {
                   
//                     const predictResponse = await fetch('http://localhost:5000/predict', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(data),
//                         credentials: 'include',
//                     });
    
//                     if (predictResponse.ok && predictResponse.headers.get("content-type")?.includes("application/json")) {
//                         const prediction = await predictResponse.json();
//                         setResult(`Your prediction result: ${prediction.result}`);
//                         setShowResult(true);
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error("An error occurred:", error);
//         }
//     };

//     return (

//         <div className="profilePage">
//             <TopNavBar />
//             {!showResult ? (
//                 <div >
                        
//                         <form className="form" onSubmit={handleFormSubmit}>
//                         <h3>Heart Health Tracker</h3>
//                             <label>
//                                 Age:
//                                 <input type="number" name="age" required/>
//                             </label>

//                             <label>
//                                 Sex:
//                                 <select name="sex" required>
//                                     <option value="1">Male</option>
//                                     <option value="0">Female</option>
//                                 </select>
//                             </label>

//                             <label>
//                                 Chest Pain Type:
//                                 <select name="chestPainType" required>
//                                     <option value="1">Type 1</option>
//                                     <option value="2">Type 2</option>
//                                     <option value="3">Type 3</option>
//                                     <option value="4">Type 4</option>
//                                 </select>
//                             </label>

//                             <label>
//                                 Blood Pressure:
//                                 <input type="number" name="bloodPressure" required/>
//                             </label>

//                             <label>
//                                 Cholesterol:
//                                 <input type="number" name="cholesterol" required/>
//                             </label>

//                             <label>
//                                 Blood Sugar:
//                                 <input type="number" name="bloodSugar" required/>
//                             </label>

//                             <label>
//                                 Max Heart Rate:
//                                 <input type="number" name="maxHeartRate" required/>
//                             </label>

//                             <label>
//                                 Angina:
//                                 <select name="angina" required>
//                                     <option value="1">Yes</option>
//                                     <option value="0">No</option>
//                                 </select>
//                             </label>

//                             <button type="submit">Submit</button>
//                         </form>

//                 </div>
//                       ) : (
//                 <div className="result-form">
//                     <h3>Result</h3>
//                     <p>{result}</p>
//                     <button onClick={() => setShowResult(false)}>Go Back</button>
//                 </div>
//             )}
//         </div>

//     );
// };

// export default HeartHealthForm;


import React, { useState } from 'react';
import TopNavBar from './TopNav';
import '../styles/trackhealth.css';

const HeartHealthForm = () => {
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch('http://127.0.0.1:5000/api/save_heart_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            if (response.headers.get("content-type")?.includes("application/json")) {
                const responseData = await response.json();  
                if ((response.status === 200 || response.status === 201) && responseData.message === "Data saved successfully") {
                   
                    const predictResponse = await fetch('http://127.0.0.1:5000/predict', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                        credentials: 'include',
                    });
    
                    if (predictResponse.ok && predictResponse.headers.get("content-type")?.includes("application/json")) {
                        const prediction = await predictResponse.json();
                        setResult(`Your prediction result: ${prediction.result}`);
                        setShowResult(true);
                    }
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="profilePage">
            <TopNavBar />
            {!showResult ? (
                <div >
                        
                        <form className="form" onSubmit={handleFormSubmit}>
                        <h3>Heart Health Tracker</h3>
                            <label>
                                Age:
                                <input type="number" name="age" required/>
                            </label>

                            <label>
                                Sex:
                                <select name="sex" required>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </label>

                            <label>
                                Chest Pain Type:
                                <select name="chestPainType" required>
                                <option value="1">Type 1 - Highly Severe</option>
                                    <option value="2">Type 2 - Severe</option>
                                    <option value="3">Type 3 - Moderate</option>
                                    <option value="4">Type 4 - Very Mild</option>
                                </select>
                            </label>

                            <label>
                                Blood Pressure:
                                <input type="number" name="bloodPressure" required/>
                            </label>

                            <label>
                                Cholesterol:
                                <input type="number" name="cholesterol" required/>
                            </label>

                            <label>
                                Blood Sugar:
                                <input type="number" name="bloodSugar" required/>
                            </label>

                            <label>
                                Max Heart Rate:
                                <input type="number" name="maxHeartRate" required/>
                            </label>

                            <label>
                                Angina:
                                <select name="angina" required>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </label>

                            <button type="submit">Submit</button>
                        </form>

                </div>
                      ) : (
                <div className="result-form">
                    <h3>Result</h3>
                    <p>{result}</p>
                    <button onClick={() => setShowResult(false)}>Go Back</button>
                </div>
            )}
        </div>
    );
};

export default HeartHealthForm;