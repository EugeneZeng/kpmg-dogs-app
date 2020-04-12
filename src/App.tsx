import React, { useState, useEffect } from 'react';
import Selector from './Selector';
import { getBreeds, getImages } from './api';
import './App.css';
import logo from './logo.svg';

interface BreedMap {
  [Prop: string]: string[]
}
interface Dog {
  breed: string,
  subBreed?: string
}
let breedMap: BreedMap = {};

function App() {
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isImagesLoading, setIsImagesLoading] = useState<boolean>(false);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [subBreeds, setSubBreeds] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [selectedSubBreed, setSelectedSubBreed] = useState<string>('');

  if (breeds.length === 0) {
    getBreeds().then(res => {
      const dogList: Dog[] = res.data;
      breedMap = {};
      dogList.forEach(dog => {
        breedMap[dog.breed] = breedMap[dog.breed] || [];
        if (dog.subBreed) {
          breedMap[dog.breed].push(dog.subBreed);
        }
      });
      setBreeds(Object.keys(breedMap));
    }).catch(e => {
      console.error(e);
      setErrorMsg(e);
    });
  }

  useEffect(() => {
    if(errorMsg !== ''){
      setTimeout(function(){
        setErrorMsg('');
      }, 500)
    }
  }, [errorMsg])

  useEffect(() => {
    if (breedMap[selectedBreed]) {
      setSubBreeds(breedMap[selectedBreed]);
    } else {
      setSelectedSubBreed('');
      setSubBreeds([]);
    }
    getBreedImages(selectedBreed);
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

  const getBreedImages = (breed: string, subBreed?: string) => {
    if (breed === '') return;
    setImages([]);
    setIsImagesLoading(true);
    getImages(breed, subBreed).then(res => {
      setImages(res.data);
      setIsImagesLoading(false);
    }).catch(e => {
      console.error(e);
      setErrorMsg(e);
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          breeds.length ?
            (<Selector onChange={onBreedChange} list={breeds}></Selector>)
            : (<select disabled><option>--Loading breeds--</option></select>)
        }
        {
          subBreeds.length ? (<Selector onChange={onSubBreedChange} list={subBreeds}></Selector>) : null
        }
      </header>
      <article className="App-article">
        {
          images.length ?
            images.map((image, i) => (<img key={i} alt={`${selectedBreed}-${selectedSubBreed}-${i}`} src={image} />))
            : (<span>{isImagesLoading ? 'Image loading...' : 'No images here!'}</span>)
        }
        {
          isImagesLoading && (<img src={logo} className="App-logo" alt="logo" />)
        }
      </article>
      {
        errorMsg && (<div className="App-message warn">{errorMsg}</div>)
      }
    </div>
  );
}

export default App;
