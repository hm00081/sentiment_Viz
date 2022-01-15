import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';

const Nav = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    background-color: skyblue;
    font-size: 14px;
    padding: 20px 60px;
    color: white;
`;

const Col = styled.div`
    display: flex;
    align-items: center;
`;

// const Logo = styled(motion.svg)`
//     margin-right: 50px;
//     width: 95px;
//     height: 25px;
//     fill: #e51013;
//     path {
//         stroke-width: 6px;
//         stroke: white;
//     }
// `;

const HomeName = styled.span`
    font-size: 30px;
    margin-left: -20px;
    margin-top: -5px;
    font-weight: bolder;
`;

const Items = styled.ul`
    display: flex;
    align-items: center;
    margin-left: 80px;
`;

const Item = styled.li<{ current: boolean }>`
    margin-right: 20px;
    color: ${(props) => props.theme.white.lighter};
    transition: color 0.3s ease-in-out;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    &:hover {
        color: ${(props) => props.theme.white.lighter};
    }
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

const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    bottom: -15px;
    left: 0;
    right: 0;
    margin: 0 auto;
    background-color: red;
`;

const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 0px;
    padding: 5px 10px;
    padding-left: 40px;
    z-index: -1;
    color: white;
    font-size: 16px;
    font-color: white;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.black.darker};
`;

const navVariants = {
    top: {
        backgroundColor: '#1976d2',
    },
    scroll: {
        backgroundColor: '#1976d2',
    },
};

interface Iform {
    keyword: string;
    password: string;
}

function Header() {
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const homeMatch = useRouteMatch('/');
    const tvMatch = useRouteMatch('/tv');
    const aboutMatch = useRouteMatch('/about');
    const inputAnimation = useAnimation();
    const navAnimation = useAnimation();
    const { scrollY } = useViewportScroll();
    const toggleSearch = () => {
        if (searchOpen) {
            inputAnimation.start({
                scaleX: 0,
            });
        } else {
            inputAnimation.start({ scaleX: 1 });
        }
        setSearchOpen((prev) => !prev);
    };
    useEffect(() => {
        scrollY.onChange(() => {
            if (scrollY.get() > 80) {
                navAnimation.start('scroll');
            } else {
                navAnimation.start('top');
            }
        });
    }, [scrollY, navAnimation]); // 다시 클릭 시 닫기.
    const history = useHistory();
    const { register, handleSubmit } = useForm<Iform>();
    const onValid = (data: Iform) => {
        console.log('hello');
        history.push(`/search?keyword=${data.keyword}`);
    };
    return (
        <Nav variants={navVariants} animate={navAnimation} initial={'top'}>
            <Col>
                <HomeName>Metaphor Viz</HomeName>
                <Items>
                    <Item current={homeMatch?.isExact || false}>
                        <Link to="/">Home{homeMatch?.isExact && <Circle layoutId="circle" />}</Link>
                    </Item>
                    <Item current={tvMatch?.isExact || false}>
                        <Link to="/tv">Summary{tvMatch && <Circle layoutId="circle" />}</Link>
                    </Item>
                    <Item current={aboutMatch?.isExact || false}>
                        <Link to="/about">About{aboutMatch && <Circle layoutId="circle" />}</Link>
                    </Item>
                </Items>
            </Col>
            <Col>
                <Search onSubmit={handleSubmit(onValid)}>
                    <motion.svg
                        onClick={toggleSearch}
                        animate={{ x: searchOpen ? -185 : 0 }}
                        transition={{ type: 'linear' }}
                        fill="currentColor"
                        viewBox="0 0 45 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                    </motion.svg>
                    <Input
                        {...register('keyword', { required: true, minLength: 2 })}
                        animate={inputAnimation}
                        initial={{ scaleX: 0 }}
                        transition={{ type: 'linear' }}
                        placeholder="Search for Paper you want..."
                        style={{ color: 'white' }}
                    />
                </Search>
            </Col>
        </Nav>
    );
}

export default Header;
