import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, } from 'reactstrap';
import '../assets/styles/cloudStyles.css';
import donut from '../assets/images/donut_spinner.svg';

const WinterSpringfield = () => {
    const [ SimpsonsQuote, SetSimpsonsQuote ] = useState({});
    const [ IceAndFireCharacter, SetIceAndFireCharacter ] = useState([]);
    const [ characterList, setCharacterList ] = useState([]);
    const [ selectedCharacter, setSelectedCharacter ] = useState('');
    const dataFetchedRef = useRef(false);
    const dataFetchedRef2 = useRef(false);
    const [ simpsonsLoading, setSimpsonsLoading ] = useState(true);
    const [ ASOIFLoading, setASOIFLoading ] = useState(true);

    const simpsonsQuoteApi = async () => { 
        const response = await(fetch('https://thesimpsonsquoteapi.glitch.me/quotes')
        .then((response) => response.json())
        .then((data) => {
            data.forEach(simpsons => {
                console.log(simpsons.quote);
                SetSimpsonsQuote(simpsons);
                setSimpsonsLoading(false);
            })
        })
        .catch(error => {
            console.log(error);
        }));
    }

    const iceAndFireApi = async () => {
        let characterId = 43;
        if(selectedCharacter){
            characterId = selectedCharacter;
        }
        else {
            let max = 150;
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            };
            characterId = getRandomInt(52);    
        }
        let apiUrl = `https://thronesapi.com/api/v2/Characters/${characterId}`;
        await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);
            // console.log(data.firstName);
            let thrones = {};
            thrones = data;
            if(thrones.lastName === 'None' || 
                thrones.lastName ==='Unknown') {
                thrones.lastName = '';
            }
            SetIceAndFireCharacter(thrones);
            setASOIFLoading(false);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const allCharacters = async () => { 
        let apiUrl = `https://thronesapi.com/api/v2/Characters/`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
              throw new Error('Failed to fetch characters');
            }
        const data = await response.json();
        const formattedCharacters = data.map(character => ({
          id: character.id,
          fullName: character.fullName,
        }));
        setCharacterList(formattedCharacters);
        } catch (error) {
        console.error('Error fetching characters:', error);
        }
    }

    useEffect(() => {
        allCharacters();
    }, []);

    let sortCharacters = characterList.sort((a, b) => {
        let fa = a.fullName,
        fb = b.fullName;

    if (fa < fb) {
        return -1;
    }
    if (fa > fb) {
        return 1;
    }
    return 0;
    });

    useEffect(() => {
        if(dataFetchedRef2.current) return;
            dataFetchedRef2.current = true;
                iceAndFireApi(selectedCharacter);
    }, []);

    useEffect(() => {
        if(dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            simpsonsQuoteApi();
    }, []);

    const fetchNewData = () => {
        console.log(selectedCharacter)
        setSimpsonsLoading(true);
        setASOIFLoading(true);
        iceAndFireApi(selectedCharacter);
        simpsonsQuoteApi();
        setSelectedCharacter('')
    }

    const handleSelect = (e) => {
        let newCharacter = e.target.value;
        setSelectedCharacter(newCharacter)
        console.log(`Selected character is: ${newCharacter}`);
        console.log(selectedCharacter);
    }

    const finalOutput = () => {
        if(simpsonsLoading || ASOIFLoading) {
            return(
            <img src={donut} className="donut-spinner" alt="spinnging donut" />
            )
        }
        else {
            // console.log("Loading is complete.");
            return(
                <>
                    <Col md={7} id='quote'>
                        <p className="quote">{SimpsonsQuote.quote}</p>
                    </Col>
                    <Col id='image'>
                        <img className="IceAndFire" src={IceAndFireCharacter.imageUrl} alt={IceAndFireCharacter.firstName} />
                        <p className="attribution">
                            &ndash;&nbsp;&nbsp;{IceAndFireCharacter.firstName}&nbsp;{IceAndFireCharacter.lastName}
                        </p>
                    </Col>
                </>
            )
        }
    };

    return(
        <>
        <Container fluid style={{height: "100vh", width: "100%", marginLeft:"0px"}} id="cloud-intro">
            <Row>
                <Col id="masthead">
                    <h1>Winter is Coming... <br/>to Springfield</h1>
                </Col>
            </Row>
            <Row>
                <Col  className="primary-container" sm={8} md={{span: 8, offset: 2}}>
                    <Row>
                        {finalOutput()}
                    </Row>
                    <Row>
                        <Col className="margin32">
                            <div style={{width: '100%', margin: 'auto', textAlign: 'center'}}>
                            Chose a character
                            <form style={{display: "inline-block", margin: '16px'}}>
                            <select value={selectedCharacter} onChange={handleSelect}>
                                <option value="" > </option>
                                {characterList.map((character) =>{
                                    return(
                                        <option key={character.id} value={character.id}>
                                            {character.fullName}
                                        </option>
                                    )
                                })}
                            </select>
                            </form>
                            <button className="reload" onClick={fetchNewData}><i className="fa-solid fa-rotate-right"></i></button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className="secondary-container" sm={8} md={{span: 8, offset: 2}}>
                        <p style={{opacity: 1}}>This site was made by combining the results of calls to the <a href="https://thesimpsonsquoteapi.glitch.me">Simpson's Quotes API</a> and the <a href="https://thronesapi.com">ThronesAPI</a>.</p>
                </Col>
            </Row>
        </Container>
        </>
    )
};

export default WinterSpringfield;