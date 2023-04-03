<div align="center">



[![NPM](https://img.shields.io/npm/v/bear-marquee.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-marquee)
[![npm downloads](https://img.shields.io/npm/dm/bear-marquee.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-marquee)
[![npm](https://img.shields.io/npm/dt/bear-marquee.svg?style=for-the-badge)](https://www.npmjs.com/package/bear-marquee)
[![npm](https://img.shields.io/npm/l/bear-marquee?style=for-the-badge)](https://github.com/bear-marquee/bear-marquee/blob/master/LICENSE)

</div>


### Features

- Use React + Flexbox directly, not javascript in secondary development into React
- Easier to use
- Number of times to avoid re-renders by key in marquee items


### Install

```bash
yarn add bear-react-vertical-marquee
```

### Usage

```tsx
import BearVerticalMarquee from 'bear-react-vertical-marquee';
import 'bear-vertial-marquee/dist/index.css';


export const CustomBanner = () => {
    return <MarqueeRoot>
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
   </MarqueeRoot>
}
```


### License

MIT © [imagine10255](https://github.com/imagine10255)
