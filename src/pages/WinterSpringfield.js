import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, } from 'reactstrap';
import '../assets/styles/cloudStyles.css';
import donut from '../assets/images/donut_spinner.svg';

const WinterSpringfield = () => {
    const [ SimpsonsQuote, SetSimpsonsQuote ] = useState({});
    const [ IceAndFireCharacter, SetIceAndFireCharacter ] = useState([]);
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
        let max = 150;
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          };
        let characterId = getRandomInt(52);
        let apiUrl = `https://thronesapi.com/api/v2/Characters/${characterId}`;
        await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.firstName);
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

    useEffect(() => {
        if(dataFetchedRef2.current) return;
            dataFetchedRef2.current = true;
                iceAndFireApi();
    }, []);

    useEffect(() => {
        if(dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            simpsonsQuoteApi();
    }, []);

    const fetchNewData = () => {
        console.log(`Fetch new data`)
        setSimpsonsLoading(true);
        setASOIFLoading(true);
        iceAndFireApi();
        simpsonsQuoteApi();
    }

    const finalOutput = () => {
        if(simpsonsLoading || ASOIFLoading) {
            return(
            <img src={donut} className="donut-spinner" alt="spinnging donut" />
            )
        }
        else {
            console.log("Loading is complete.");
            return(
                <>
                    <Col md={7} id='quote'>
                        <p className="quote">{SimpsonsQuote.quote}</p>
                    </Col>
                    <Col id='image'>
                        <img className="IceAndFire" src={IceAndFireCharacter.imageUrl} alt={IceAndFireCharacter.firstName} />
                        <p className="attribution">
                            &ndash; {IceAndFireCharacter.firstName} {IceAndFireCharacter.lastName}
                        </p>
                    </Col>
                </>
            )
        }
    };

    return(
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
                        <Col>
                            <button onClick={fetchNewData}> Reload</button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
};

export default WinterSpringfield;