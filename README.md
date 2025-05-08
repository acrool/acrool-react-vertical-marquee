# Acrool React vertical-marquee

<a href="https://acrool-react-vertical-marquee.pages.dev/" title="Acrool React vertical-marquee - Vertical Marquee">
    <img src="https://raw.githubusercontent.com/acrool/acrool-react-vertical-marquee/main/example/public/og.png" alt="Acrool React Vertical Marquee Logo"/>
</a>

<p align="center">
   Use React + Flexbox directly, not javascript in secondary development into React
</p>



<div align="center">

[![NPM](https://img.shields.io/npm/v/@acrool/react-vertical-marquee.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-vertical-marquee)
[![npm](https://img.shields.io/bundlejs/size/@acrool/react-vertical-marquee?style=for-the-badge)](https://github.com/acrool/react-vertical-marquee/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/l/@acrool/react-vertical-marquee?style=for-the-badge)](https://github.com/acrool/acrool-react-vertical-marquee/blob/main/LICENSE)

[![npm downloads](https://img.shields.io/npm/dm/@acrool/react-vertical-marquee.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-vertical-marquee)
[![npm](https://img.shields.io/npm/dt/@acrool/react-vertical-marquee.svg?style=for-the-badge)](https://www.npmjs.com/package/@acrool/react-vertical-marquee)

</div>


`^4.1.4 support react >=18.0.0 <20.0.0`


## Features

- Use React + Flexbox directly, not javascript in secondary development into React
- Easier to use
- Number of times to avoid re-renders by key in marquee items


## Install

```bash
yarn add @acrool/react-vertical-marquee
```

## Usage

add in your main.tsx

```ts
import '@acrool/react-vertical-marquee/dist/index.css';
```


```tsx
import {SvgSymbol} from '@/library/acrool-react-vertical-marquee';

const App = () => {
    return <div>
        <MainContent/>

        {SvgSymbol} {/* <~ add this */}
    </div>;
}
```

***step5.*** add in your eslint ignore


## Use Sample

```tsx
import AcroolVerticalMarquee from '@/library/acrool-react-vertical-marquee';

<AcroolVerticalMarquee
    autoPlayTime={2000}
    data={[
        {key: 1, text: 'Most modern mobile touch slider with hardware accelerated transitions for ReactJS', onClick: () => window.open('https://carousel.bearests.com/')},
        {key: 2, text: 'This is a carousel developed directly using React + Flexbox (non-js secondary development package into React), and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.', onClick: () => window.open('https://carousel.bearests.com/')},
        {key: 3, text: 'Navigation buttons can be directly moved out of the carousel area without being affected by overflow in simple usage situations', onClick: () => window.open('https://carousel.bearests.com/feature/static-height')},
        {key: 4, text: 'When the image data is loaded asynchronously, it will not be displayed because BearCarousel has componentDidMount, and the image has been loaded but not displayed. Additional processing is required.', onClick: () => window.open('https://carousel.bearests.com/feature/responsive')},
        {key: 5, text: 'The size of the carousel, the height of the outer container is based, and the item container follows the size of the outer container', onClick: () => window.open('https://carousel.bearests.com/feature/centered')},
    ]}
/>
```


There is also a example that you can play with it:

[![Play react-editext-example](https://raw.githubusercontent.com/acrool/acrool-react-vertical-marquee/main/play-in-example-button.svg)](https://acrool-react-vertical-marquee.pages.dev)


## License

MIT © [Acrool](https://github.com/acrool) & [Imagine](https://github.com/imagine10255)
