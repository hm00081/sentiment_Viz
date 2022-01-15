import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { getAPIs, IGetPapersResult } from '../api';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const BigNav = styled.div`
    margin-top: 70px;
    margin-left: 5px;
    position: absolute;
    background: ${(props) => props.theme.white.darker};
    max-width: 250px;
    min-height: 100%;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 5px;
`;

const NavBox = styled.span`
    border-bottom: 1px solid #ddd;
    flex-direction: column;
    flex-wrap: wrap;
    display: flex;
    gap: 2px;
    max-width: 100%;
    background: white;
    border: 1px solid skyblue;
    border-radius: 5px;
    padding-top: 30px;
    padding-bottom: 10px;
    padding-left: 5px;
    // padding: 5px 5px 5px 5px;
    margin: 4px;
    color: black;
    text-align: left;
    font-weight: bolder;
    font-size: 15px;
`;

const StyledBox = styled(Box)``;

const StyledPaper = styled(Paper)`
    && {
        border: 1px solid blue;
    }
`;

// const SFGchild = styled(Typography)`
//     width: 20px;
//     height: 20px;
// `;

const StyledFormGroup = styled.div`
    display: flex;
    margin-top: 5px;
    text-align: center;
    margin-right: auto;
    max-width: 80%;
    heigth: 2px;
    flex-wrap: wrap;
    &:first-child {
        transform-origin: center left;
    }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    float: left;
    && {
    }
`;

const Buttons = styled.div`
    font-size: 10px;
`;

const Search = styled.form`
    color: white;
    display: flex;
    align-items: center;
    position: relative;
    svg {
        height: 25px;
    }
`;

const TechDisplay = styled.div``;

const TimeFilter = styled.div`
    display: flex;
    border-bottom: 1px solid #ddd;
    padding: 10px 15px;
`;

const FilterName = styled.span`
    font-size: 15px;
    width: 100%;
    margin-top: -20px;
    margin-bottom: 5px;
    margin-right: 15px;
`;

const FilterName2 = styled.span`
    font-size: 14px;
    width: 100%;
    padding-top: -10px;
`;

const DisplayName = styled.span`
    font-size: 18px;
    font-weight: bolder;
    text-align: center;
    margin-top: -26px;
    padding-left: 145px;
    width: 100%;
`;

function Navigator() {
    const { data, isLoading } = useQuery<IGetPapersResult>(['papers', 'popular'], getAPIs);
    const [selectData, setSelectData] = useState([]);
    const [entitySelected, setEntitySelected] = useState(false);
    const [aspectSelected, setAspectSelected] = useState(false);
    const [sentSelected, setSentSelected] = useState(false);
    const [opinionSelected, setOpinionSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    useEffect(() => {
        const filteredList = data?.results.filter((dat) => entitySelected && dat.target == 'person');
        console.log(filteredList);
    }, [data?.results, entitySelected]);
    const [checked, setChecked] = React.useState([true, false]);
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([event.target.checked, checked[1]]);
    };

    const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked([checked[0], event.target.checked]);
    };

    const children = (
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel label="Child 1" control={<Checkbox checked={checked[0]} onChange={handleChange2} />} />
            <FormControlLabel label="Child 2" control={<Checkbox checked={checked[1]} onChange={handleChange3} />} />
        </Box>
    );

    const [value, setValue] = React.useState<number[]>([20, 37]);
    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <BigNav>
            <NavBox>
                <FilterName>
                    <span>Techniques displayed</span>
                </FilterName>
                <DisplayName>
                    <span>{data?.results.length}</span>
                </DisplayName>
            </NavBox>
            <NavBox>
                <FilterName>Time Filter</FilterName>
                <Slider style={{ width: '88%', marginLeft: '10px' }} getAriaLabel={() => 'Temperature range'} value={value} onChange={handleChange} valueLabelDisplay="auto" />
            </NavBox>
            <NavBox>
                <FilterName>How to Use Filters</FilterName>
                <StyledFormGroup>
                    <Typography style={{ marginLeft: '30px' }} align="right" variant="inherit" color="textPrimary">
                        Hide
                    </Typography>
                    <Button
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '124px',
                            marginTop: '-8px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        color="primary"
                    >
                        <StarOutlineIcon />
                    </Button>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ marginLeft: '30px' }} align="left" variant="inherit" color="textPrimary">
                        Indifferent
                    </Typography>
                    <Button
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '124px',
                            marginTop: '-8px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        color="primary"
                    >
                        <StarHalfIcon />
                    </Button>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ marginLeft: '30px' }} align="left" variant="inherit" color="textPrimary">
                        Want
                    </Typography>
                    <Button
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '124px',
                            marginTop: '-8px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        color="primary"
                    >
                        <StarIcon />
                    </Button>
                </StyledFormGroup>
            </NavBox>
            <NavBox>
                <FilterName>Target</FilterName>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Entity
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setEntitySelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setEntitySelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setEntitySelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Aspect
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Sentiment
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Opinion Holder
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Time
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
            </NavBox>
            <NavBox>
                <FilterName>Intermediation(Task Oriented)</FilterName>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Detection
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setEntitySelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setEntitySelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setEntitySelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Summarization
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Classification
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Comparison
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Exploration
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
            </NavBox>
            <NavBox>
                <FilterName>Representation</FilterName>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Element
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Process
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
            </NavBox>
            <NavBox>
                <FilterName>Visual Variables</FilterName>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Value
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Color
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Dimension
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Shape
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Position
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Orientation
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Distance
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
            </NavBox>
            <NavBox>
                <FilterName>Visualization Techniques</FilterName>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        3D
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Node-Link
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Bubble Chart
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Area Chart
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Line Plot
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Box Plot
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Pie Chart
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Radar Chart
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Treemap
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Text Cloud
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Heatmap
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Scatter Plot
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        MDS Map
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Parallel Coord
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Pixel Plot
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Time-oriented
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
                <StyledFormGroup>
                    <Typography style={{ fontSize: '2px', padding: '3px' }} align="left" variant="overline" color="textPrimary">
                        Spatial based
                    </Typography>
                    <ButtonGroup
                        style={{
                            width: '10%',
                            display: 'fixed',
                            marginLeft: '95px',
                            position: 'absolute',
                            // transform: 'translate(5%, -10%)',
                        }}
                        size="small"
                        aria-label="outlined primary button group"
                    >
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarOutlineIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            {/* <Button as="a" href="/"> */}
                            <StarHalfIcon />
                        </Button>
                        <Button onClick={(e) => setAspectSelected} color="primary">
                            <StarIcon />
                        </Button>
                    </ButtonGroup>
                </StyledFormGroup>
            </NavBox>
        </BigNav>
    );
}
export default Navigator;
