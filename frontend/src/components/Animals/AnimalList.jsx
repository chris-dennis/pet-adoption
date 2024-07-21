import { useEffect, useState } from 'react';
import { getAnimals } from '../../services/animalService';

const AnimalList = () => {
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const [hoveredAnimal, setHoveredAnimal] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [showAdoptForm, setShowAdoptForm] = useState(false);
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('none');
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchAnimals = async () => {
            const data = await getAnimals();
            setAnimals(data);
            setFilteredAnimals(data);
        };

        fetchAnimals();
    }, []);

    useEffect(() => {
        let updatedAnimals = [...animals];

        // Apply filter
        if (filter === 'dogs') {
            updatedAnimals = updatedAnimals.filter(animal => animal.species.toLowerCase() === 'dog');
        } else if (filter === 'cats') {
            updatedAnimals = updatedAnimals.filter(animal => animal.species.toLowerCase() === 'cat');
        }

        // Apply search
        updatedAnimals = updatedAnimals.filter(animal =>
            animal.name.toLowerCase().includes(search.toLowerCase()) ||
            animal.breed.toLowerCase().includes(search.toLowerCase())
        );

        // Apply sort
        if (sort === 'age') {
            updatedAnimals.sort((a, b) => a.age - b.age);
        } else if (sort === 'size') {
            updatedAnimals.sort((a, b) => a.size.localeCompare(b.size));
        }

        setFilteredAnimals(updatedAnimals);
    }, [filter, sort, search, animals]);

    const handleMouseEnter = (animal) => {
        setHoveredAnimal(animal);
    };

    const handleMouseLeave = () => {
        setHoveredAnimal(null);
    };

    const handleShowDetails = (animal) => {
        setSelectedAnimal(animal);
        setShowAdoptForm(false);
    };

    const handleShowAdoptForm = () => {
        setShowAdoptForm(true);
    };

    const handleBack = () => {
        setShowAdoptForm(false);
    };

    const handleCloseDetails = () => {
        setSelectedAnimal(null);
    };

    return (
        <div id='top'>
            <div className={`filters ${selectedAnimal ? 'blurred' : ''}`} style={{ marginBottom: '20px' }}>
                <label>
                    Animal:
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ marginLeft: '10px' }}>
                        <option value="all">All</option>
                        <option value="dogs">Dogs</option>
                        <option value="cats">Cats</option>
                    </select>
                </label>
                <label style={{ marginLeft: '20px' }}>
                    Sort by:
                    <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ marginLeft: '10px' }}>
                        <option value="none">None</option>
                        <option value="age">Age</option>
                        <option value="size">Size</option>
                    </select>
                </label>
                <input
                    type="text"
                    placeholder="Search by name or breed"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ marginLeft: '20px', fontSize:16, backgroundColor: 'white', border: "1px solid gray", borderRadius:"5px", color: "black" }}
                />
            </div>
            <div className="card-container">
                {filteredAnimals.map(animal => (
                    <div className={`card ${selectedAnimal ? 'blurred' : ''} ${animal.status === "adopted" ? 'adopted' : ''}`}
                         key={animal.id}
                         onMouseEnter={() => handleMouseEnter(animal)}
                         onMouseLeave={handleMouseLeave}
                         style={{border: '1px solid #ccccc', padding: '10px', margin: '10px', position: 'relative'}}
                    >
                        <img src={"http://13.59.42.81:5000" + animal.image_url} alt={animal.name}
                             style={{maxWidth: '200px'}}/>
                        <div className='name-breed'>
                            <h2>{animal.name}, {animal.age}</h2>
                            <p>{animal.breed}</p>
                        </div>
                        {hoveredAnimal === animal && (
                            <button
                                style={{position: 'absolute', bottom: '10px', right: '10px'}}
                                onClick={() => handleShowDetails(animal)}
                            >
                                Show Details
                            </button>
                        )}
                    </div>
                ))}

                {selectedAnimal && (
                    <div style={{
                        position: 'fixed', top: '10%', left: '10%', right: '10%', bottom: '10%',
                        overflow: 'auto'}}>
                        {showAdoptForm ? (
                            <div className="adoption-form">
                                <h2>Adopt {selectedAnimal.name}</h2>
                                <form>
                                    <div>
                                        <label>Name:</label>
                                        <input type="text" name="name" required/>
                                    </div>
                                    <div>
                                        <label>Email:</label>
                                        <input type="email" name="email" required/>
                                    </div>
                                    <div>
                                        <label>Phone:</label>
                                        <input type="tel" name="phone" required/>
                                    </div>
                                    <div>
                                        <label>Address:</label>
                                        <input type="text" name="address" required/>
                                    </div>
                                    <div>
                                        <label>City:</label>
                                        <input type="text" name="city" required/>
                                    </div>
                                    <div>
                                        <label>State:</label>
                                        <input type="text" name="state" required/>
                                    </div>
                                    <div>
                                        <label>Zip Code:</label>
                                        <input type="number" name="zip" required/>
                                    </div>
                                    <div>
                                        <label>Why do you want to adopt {selectedAnimal.name}? (optional)</label>
                                        <textarea name="reason" rows="4"></textarea>
                                    </div>
                                    <button type="submit">Submit</button>
                                    <button onClick={handleBack} style={{marginRight: 5}}>Return to Listing</button>

                                    <button onClick={handleCloseDetails} style={{}}>Close</button>

                                </form>
                            </div>
                        ) : (
                            <div className="more-details">
                                <img src={"http://13.59.42.81:5000" + selectedAnimal.image_url} alt={selectedAnimal.name}
                                     style={{maxWidth: '400px'}}/>
                                <div className="details">
                                    <h2>{selectedAnimal.name}</h2>
                                    <p><strong>Species:</strong> {selectedAnimal.species}</p>
                                    <p><strong>Breed:</strong> {selectedAnimal.breed}</p>
                                    <p><strong>Age:</strong> {selectedAnimal.age}</p>
                                    <p><strong>Size:</strong> {selectedAnimal.size}</p>
                                    <p><strong>Description:</strong> {selectedAnimal.description}</p>
                                    <p><strong>Status:</strong> {selectedAnimal.status}</p>
                                    <button onClick={handleShowAdoptForm}
                                            style={{display: 'block', marginTop: '10px',}}>Adoption Application
                                    </button>
                                    <button onClick={handleCloseDetails}>Close</button>
                                </div>

                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AnimalList;
