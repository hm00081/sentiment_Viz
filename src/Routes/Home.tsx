import { useQuery } from 'react-query';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { makeImagePath } from '../utils';
import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { getAPIs } from '../api';

const Wrapper = styled.div`
    background: black;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px; ;
`;

const Overview = styled.p`
    font-size: 30px;
    width: 50%;
`;

const Slider = styled.div`
    display: flex;
    position: relative;
    top: -100px;
`;

const Row = styled(motion.div)`
    position: fixed;
    margin-left: 270px;
    gap: 5px;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    position: absolute;
    width: 100%;
`;

const Boxs = styled(motion.div)`
    position: static;
    margin: 0 3px 3px;
    background: blue;
    width: 100px;
    height: 50px;
    border: solid 1px #aaa;
    border-radius: 4px;
    overflow: hidden;
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth + 10,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -window.outerWidth - 10,
    },
};

function Home() {
    const { data, isLoading } = useQuery(['paper', 'sentiment'], getAPIs);
    // console.log(data, isLoading);
    const [index, setIndex] = useState(0);
    const incraseIndex = () => setIndex((prev) => prev + 1);
    return (
        <>
            <div style={{ backgroundColor: 'whitesmoke', height: '200vh' }}></div>
            <Wrapper>
                <Slider>
                    <AnimatePresence></AnimatePresence>
                </Slider>
            </Wrapper>
        </>
    );
}
export default Home;
