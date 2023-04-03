import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import BearVerticalMarquee from 'bear-react-vertical-marquee';

import './App.css';
import './bootstrap-base.min.css';
import 'bear-react-vertical-marquee/dist/index.css';



function App() {


    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <BearVerticalMarquee
                    autoPlayTime={2000}
                    data={[
                        {key: 1, text: 'Most modern mobile touch slider with hardware accelerated transitions for ReactJS', onClick: () => window.open('https://carousel.bearests.com/')},
                        {key: 2, text: 'This is a carousel developed directly using React + Flexbox (non-js secondary development package into React), and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.', onClick: () => window.open('https://carousel.bearests.com/')},
                        {key: 3, text: 'Navigation buttons can be directly moved out of the carousel area without being affected by overflow in simple usage situations', onClick: () => window.open('https://carousel.bearests.com/feature/static-height')},
                        {key: 4, text: 'When the image data is loaded asynchronously, it will not be displayed because BearCarousel has componentDidMount, and the image has been loaded but not displayed. Additional processing is required.', onClick: () => window.open('https://carousel.bearests.com/feature/responsive')},
                        {key: 5, text: 'The size of the carousel, the height of the outer container is based, and the item container follows the size of the outer container', onClick: () => window.open('https://carousel.bearests.com/feature/centered')},
                    ]}
                />

                <p>
          Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
        Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
