import { useState, useEffect } from 'react';
import { getAllStudents, deleteStudent } from '../api/studentapi'; 
import StudentCard from '../component/studentcard';
import { Alert } from 'react-bootstrap';
import { Row } from 'react-bootstrap';


const HomePage = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message,setMessage] =useState(null);

  const fetchStudents = async () => {
    try {
        setLoading(true);
        const response = await getAllStudents(); 
        // Use response.dataA because that's what your backend sends
        setStudents(response.data || []); 
    } catch (error) {
        setError('Could not find Students!!!');
    } finally {
        setLoading(false);
    }
setTimeout(() => setMessage(null), 3000); 

}


    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = async(id)=>{
        try{
            const data = await deleteStudent(id)
            setStudents(prev=>prev.filter(s=>s._id !== id));
            setMessage({variant :'succes', text:data.message})
        }catch(err){
       setMessage({text:'Could not delete the Student'})
        }
    };

    return (
        <div className="container mt-4">
            <h1>All Students Data</h1>
            {message && (
                <Alert variant="message.variant">
                        {message.text}
                </Alert>

            )}
            
            
            <div className="d-flex flex-wrap gap-3">
                <Row xs={1} md={2} lg={3}/>
                {students && students.length > 0 ? (
                    students.map((s) => (
                        <StudentCard key={s._id} student={s} onDelete={HandleDelete} />
                    ))
                ) : (
                    !loading && <p>No student data found.</p>
                )}
            </div>
        </div>
    );
}

export default HomePage;
