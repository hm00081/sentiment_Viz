import styled from 'styled-components';
import * as React from 'react';
import { getAPIs, IGetPapersResult, getImage } from '../api';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { makeImagePath } from '../utils';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useHistory, useRouteMatch } from 'react-router-dom'; //url change in react-router v5
import { useQuery } from 'react-query';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Mains = styled.div`
    margin-top: 70px;
    margin-left: 270px;
    display: flex;
    // flex-wrap: wrap;
    position: absolute;
    //position 추후에 뗄수있으면 떼자.
    background: ${(props) => props.theme.white.darker};
    min-width: 89%;
    height: 1942px;
    border: 1px solid #ddd;
    border-radius: 10px;
    // overflow: scroll;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledBox = styled(Box)``;

const StyledPaper = styled(Paper)`
    && {
        border: 1px solid blue;
    }
`;
const Row = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    margin: 5px 1px 1px 5px;
    max-height: 150px;
    // grid-template-columns: repeat(16, 1fr);
    // position: absolute;
    width: 100%;
`;
const PaperBox = styled(motion.div)<{ bgPhoto: string }>`
    background-color: white;
    background-size: cover;
    background-position: center center;
    height: 111px;
    min-width: 111px;
    font-size: 66px;
    margin: 10px;
    cursor: pointer;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
    // position: relative;
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`; // box hover 시 주위 밝기 조절.

const BigPaper = styled(motion.div)`
    position: fixed;
    width: 40vw;
    height: 80vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    // background-color: ${(props) => props.theme.black.lighter};
    background-color: white;
`;

const BigCover = styled.div`
    padding-left: 20px;
    padding-top: 20px;
    background-size: cover;
    background-position: center center;
`;
const BigName = styled.h3`
    color: ${(props) => props.theme.black.veryDark};
    padding: 20px;
    font-size: 26px;
    position: relative;
    top: 10px;
`;

const BigOverview = styled.p`
    padding: 20px;
    position: relative;
    top: 20px;
    color: ${(props) => props.theme.black.veryDark};
`;

const BigSummary = styled.p`
    padding: 20px;
    position: relative;
    top: 20px;
    color: ${(props) => props.theme.black.veryDark};
`;

const BigPdf = styled.p`
    padding: 20px;
    position: relative;
    top: 20px;
    color: ${(props) => props.theme.black.veryDark};
`;

const rowVariants = {
    hidden: {
        x: window.outerWidth + 5,
    },
    visible: {
        x: 0,
    },
    exit: {
        x: -(window.outerWidth + 5),
    },
};

const paperVariants = {
    normal: {
        scale: 1,
    },
    hover: {
        scale: 1.3,
        y: -80,
        transition: {
            delay: 0.5,
            duaration: 0.1,
            type: 'tween',
        },
    },
};

const offset = 100;

function Main() {
    const onPaperClicked = (paperId: string) => {
        history.push(`/${paperId}`);
    };
    const { data, isLoading } = useQuery<IGetPapersResult>(['papers', 'popular'], getAPIs);
    // console.log(data, isLoading);
    const bigPaperMatch = useRouteMatch<{ paperId: string }>('/:paperId');
    // clickedTv = paperInfo
    const { scrollY } = useViewportScroll();
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalTVs = data?.results.length;
            const maxIndex = Math.ceil(totalTVs / offset);
            setIndex((prev: number) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const history = useHistory();
    const onOverlayClick = () => history.push('/');
    const clickedPaper = bigPaperMatch?.params.paperId && data?.results.find((paper) => paper.result_id === bigPaperMatch.params.paperId);
    console.log(data?.results);
    console.log('hello');
    return (
        <Mains>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                        <Row variants={rowVariants} initial="initial" animate="visible" exit="exit" transition={{ type: 'tween', duration: 1 }} key={index}>
                            {data?.results
                                .slice(0)
                                .slice(offset * index, offset * index + offset)
                                .map((paper) => (
                                    <PaperBox
                                        layoutId={paper.result_id + ''}
                                        key={paper.result_id}
                                        initial="normal"
                                        variants={paperVariants}
                                        onClick={() => onPaperClicked(paper.result_id)}
                                        transition={{ type: 'tween' }}
                                        bgPhoto={(makeImagePath(paper.backdrop_path), 'w60')}
                                    >
                                        {paper.backdrop_path ? <img width="111" height="111" src={`https://i.imgur.com${paper.backdrop_path}`} /> : null}
                                    </PaperBox>
                                ))}
                        </Row>
                    </AnimatePresence>
                    <AnimatePresence>
                        {bigPaperMatch ? (
                            <>
                                <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
                                <BigPaper style={{ top: scrollY.get() + 100 }} layoutId={bigPaperMatch.params.paperId}>
                                    {clickedPaper && (
                                        <>
                                            <BigCover> {clickedPaper.backdrop_path ? <img width="312" height="312" src={`https://i.imgur.com${clickedPaper.backdrop_path}`} /> : null} </BigCover>
                                            {/* //이미지 크기 변경 */}
                                            <BigName>{clickedPaper.title}</BigName>
                                            <BigOverview>{clickedPaper.snippet}</BigOverview>
                                            <BigSummary>{clickedPaper.summary}</BigSummary>
                                            <BigPdf>
                                                <a href={`${clickedPaper.pdf_link}`} target="_blank" rel="noreferrer">
                                                    <PictureAsPdfIcon>{clickedPaper.pdf_link}</PictureAsPdfIcon>
                                                </a>
                                            </BigPdf>
                                        </>
                                    )}
                                </BigPaper>
                            </>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Mains>
    );
}
export default Main;
