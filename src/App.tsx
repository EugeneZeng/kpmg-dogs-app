import React, { useState, useEffect } from 'react';
import Selector from './Selector';
import { getBreeds, getImages } from './api';
import './App.css';

interface BreedMap {
  [Prop: string]: string[]
}
interface Dog {
  breed: string,
  subBreed?: string
}
let breedMap: BreedMap = {};

function App() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [subBreeds, setSubBreeds] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [selectedSubBreed, setSelectedSubBreed] = useState<string>('');

  if (breeds.length === 0) {
    getBreeds().then(res => {
      console.log(res);
      const dogList: Dog[] = res.data;
      breedMap = {};
      dogList.forEach(dog => {
        breedMap[dog.breed] = breedMap[dog.breed] || [];
        if (dog.subBreed) {
          breedMap[dog.breed].push(dog.subBreed);
        }
      });
      setBreeds(Object.keys(breedMap));
    });
  }

  useEffect(()=>{
    if(breedMap[selectedBreed] && breedMap[selectedBreed].length){
      setSubBreeds(breedMap[selectedBreed]);
    } else {
      getBreedImages(selectedBreed);
    }
  }, [selectedBreed]);

  useEffect(() => {
    getBreedImages(selectedBreed, selectedSubBreed);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSubBreed])

  const onBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(e.target.value)
  }
  const onSubBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubBreed(e.target.value);
  }

  const getBreedImages = (breed:string, subBreed?:string) => {
    getImages(breed, subBreed).then(res => {
      console.log(res);
      setImages(res.data);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          breeds.length ?
            (<Selector onChange={onBreedChange} list={breeds}></Selector>)
            : (<select><option>---</option></select>)
        }
        {
          subBreeds.length ? (<Selector onChange={onSubBreedChange} list={subBreeds}></Selector>) : null
        }
      </header>
      <article className="APP-article">
        {
          images.length ? images.map((image, i) => (<img key={i} alt="" src={image} />)) : null
        }
      </article>
    </div>
  );
}

export default App;
