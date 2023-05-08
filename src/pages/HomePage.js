import React from 'react';
import { Container, Row, Col, } from 'reactstrap';
import initialMeme from '../assets/images/initialMeme.png'

const HomePage = () => {

    return(
        <Container fluid style={{height: "100vh", width: "100%", marginLeft:"0px"}}>
            <Row>
                <Col>
                    <h1>Geek Anger Generator</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <img className="" src={initialMeme} alt='Photo of Patrick Stewart with the text: Use the Force, Harry - Gandolf' />
                </Col>
                <Col>
                    <h2>Use The Force, Harry</h2>
                    <p>This is it.  This is the meme that broke my brain.  It was so perfectly designed to provoke a visceral response. It is poetry.  It's efficient in its misuse of cultural shorthand.</p>
                    <p>I wondered what other mash-ups would deliver.  So I decided to combine existing public resources to see what fun ideas would present themselves.</p>
                    <a href="/test">Winter is Coming to Springfield</a>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;