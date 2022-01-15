import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/Header';
import Navigator from './Components/Navigator';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Summary from './Routes/Summary';
import About from './Routes/About';
import Main from './Components/Main';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { useState } from 'react';
//나중에 react-router-dom v6으로 바꾸자.

function App() {
    const [isDark, setIsDark] = useState(false);
    const toggleDark = () => setIsDark((current) => !current);
    return (
        <>
            <ThemeProvider theme={theme}>
                <button onClick={toggleDark}>Toggle Mode</button>
                <Router>
                    <Main />
                    <Navigator />
                    <Header />
                    <Switch>
                        {/* <Route path="/" element={<Home />} />
                <Route path="/tv" element={<Tv />} />
                <Route path="/search" element={<Search />} /> is react-router v6*/}
                        <Route path={['/', '/tvs/:tvId']}>
                            <Home />
                        </Route>
                        <Route path="/summary">
                            <Summary />
                        </Route>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/search">
                            <Search />
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </>
    );
}

export default App;
