import { useEffect, useState } from 'react';
import { getAnimals, addAnimal, updateAnimal, deleteAnimal } from '../../services/animalService';
import { uploadImage } from '../../services/imageService';

const AdminDashboard = () => {
    const [animals, setAnimals] = useState([]);
    const [hoveredAnimal, setHoveredAnimal] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [animalData, setAnimalData] = useState({ name: '', species: '', breed: '', age: '', size: '', description: '', image: null });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchAnimals = async () => {
            const data = await getAnimals();
            setAnimals(data);
        };

        fetchAnimals();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAnimalData({ ...animalData, [name]: value });
    };

    const handleSubmitAnimal = async (e) => {
        e.preventDefault();
        let imageUrl = selectedAnimal ? selectedAnimal.image_url : '';

        if (imageFile) {
            const uploadData = await uploadImage(imageFile);
            imageUrl = uploadData.url;
        }

        const animal = { ...animalData, image_url: imageUrl };
        if (selectedAnimal) {
            const updatedAnimal = await updateAnimal(selectedAnimal.id, animal);
            setAnimals(animals.map(a => (a.id === selectedAnimal.id ? updatedAnimal : a)));
        } else {
            const addedAnimal = await addAnimal(animal);
            setAnimals([...animals, addedAnimal]);
        }

        setSelectedAnimal(null);
        setIsAdding(false);
        setAnimalData({ name: '', species: '', breed: '', age: '', size: '', description: '', image: null });
        setImageFile(null);
        setImagePreview(null);
    };

    const handleDeleteAnimal = async (id) => {
        await deleteAnimal(id);
        setAnimals(animals.filter(animal => animal.id !== id));
    };

    const handleEditAnimal = (animal) => {
        setSelectedAnimal(animal);
        setAnimalData(animal);
        setImagePreview(`http://localhost:5050${animal.image_url}`);
    };

    const handleCloseDetails = () => {
        setSelectedAnimal(null);
        setIsAdding(false);
        setAnimalData({ name: '', species: '', breed: '', age: '', size: '', description: '', image: null });
        setImagePreview(null);
    };

    const handleMouseEnter = (animal) => {
        setHoveredAnimal(animal);
    };

    const handleMouseLeave = () => {
        setHoveredAnimal(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredAnimals = animals.filter(animal =>
        animal.name.toLowerCase().includes(searchQuery) || animal.breed.toLowerCase().includes(searchQuery)
    );

    return (
        <div id="top">
            <h1>Administrator View</h1>
            <div>
                <button onClick={() => setIsAdding(true)}>Add Animal</button>
                <input
                    type="text"
                    placeholder="Search by name or breed"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ marginLeft: '10px' }}
                />
            </div>
            <div className={`card-container ${selectedAnimal ? 'blurred' : ''}`}>
                {filteredAnimals.map(animal => (
                    <div className="card"
                         key={animal.id}
                         onMouseEnter={() => handleMouseEnter(animal)}
                         onMouseLeave={handleMouseLeave}
                         style={{border: '1px solid #ccc', padding: '10px', margin: '10px', position: 'relative'}}
                    >
                        <img src={"http://13.59.42.81:5000" + animal.image_url} alt={animal.name}
                             style={{maxWidth: '200px'}}/>
                        <div className="name-breed">
                            <h2>{animal.name}, {animal.age}</h2>
                            <p>{animal.breed}</p>
                        </div>
                        {hoveredAnimal === animal && (
                            <button
                                style={{position: 'absolute', bottom: '10px', right: '10px'}}
                                onClick={() => handleEditAnimal(animal)}
                            >
                                Show Details
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {(selectedAnimal || isAdding) && (
                <div className="edit-animals " style={{position: 'fixed', top: '10%', left: '10%', right: '10%', bottom: '10%'}}>
                    <button onClick={handleCloseDetails} style={{ float: 'right' }}>Close</button>
                    <h2>{selectedAnimal ? `Edit ${selectedAnimal.name}` : 'Add Animal'}</h2>
                    <form onSubmit={handleSubmitAnimal}>
                        <label>Name:</label>
                        <input type="text" name="name" value={animalData.name} onChange={handleInputChange} required/>
                        <label>Species:</label>
                        <input type="text" name="species" value={animalData.species} onChange={handleInputChange}
                               required/>
                        <label>Breed:</label>
                        <input type="text" name="breed" value={animalData.breed} onChange={handleInputChange}/>
                        <label>Age:</label>
                        <input type="number" name="age" value={animalData.age} onChange={handleInputChange}/>
                        <label>Size:</label>
                        <input type="text" name="size" value={animalData.size} onChange={handleInputChange}/>
                        <label>Description:</label>
                        <textarea name="description" value={animalData.description} onChange={handleInputChange}></textarea>

                        <label>Status (available/adopted):</label>
                        <input type="text" name="status" value={animalData.status} onChange={handleInputChange} required/>

                        <label>Image:</label>
                                <input type="file" name="image" onChange={handleImageChange}/>
                        {imagePreview && <img src={imagePreview} alt="Preview"
                                              style={{maxWidth: '200px', display: 'block', marginTop: '10px'}}/>}
                        <button type="submit">{selectedAnimal ? 'Update Animal' : 'Add Animal'}</button>
                        {selectedAnimal && <button type="button" onClick={handleCloseDetails}>Cancel</button>}
                        {selectedAnimal && <button type="button" onClick={() => handleDeleteAnimal(selectedAnimal.id)}
                                                   style={{marginTop: '10px'}}>Delete Animal from Database (non
                            reversible)</button>}

                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
