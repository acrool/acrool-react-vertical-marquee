import React from 'react';
import BearVerticalMarquee from 'bear-vertical-marquee';
import styled from 'styled-components/macro';




const BaseUsed = () => {

    return (
        <MarqueeRoot>
            <BearVerticalMarquee
                isEnableAutoPlay
                data={[
                    {key: 1, text: '凌晨3點空襲掩護20萬大軍 俄攻烏計畫曝光 演哪齣？', onClick: () => window.open('https://tw.news.yahoo.com/%E5%87%8C%E6%99%A83%E9%BB%9E%E7%A9%BA%E8%A5%B2%E6%8E%A9%E8%AD%B720%E8%90%AC%E5%A4%A7%E8%BB%8D-%E4%BF%84%E6%94%BB%E7%83%8F%E8%A8%88%E7%95%AB%E6%9B%9D%E5%85%89-%E6%BC%94%E5%93%AA%E9%BD%A3-130538471.html')},
                    {key: 2, text: '士林夜市回來了！燈會人潮擠沙丁魚 柯文哲：滿血復活', onClick: () => window.open('https://tw.news.yahoo.com/%E5%A3%AB%E6%9E%97%E5%A4%9C%E5%B8%82%E5%9B%9E%E4%BE%86%E4%BA%86-%E7%87%88%E6%9C%83%E4%BA%BA%E6%BD%AE%E6%93%A0%E6%B2%99%E4%B8%81%E9%AD%9A-%E6%9F%AF%E6%96%87%E5%93%B2-%E6%BB%BF%E8%A1%80%E5%BE%A9%E6%B4%BB-041500139.html')},
                    {key: 3, text: '美國情報變「狼來了」？ 俄突宣布演習後部分撤兵', onClick: () => window.open('https://tw.news.yahoo.com/%E7%BE%8E%E5%9C%8B%E6%83%85%E5%A0%B1%E8%AE%8A-%E7%8B%BC%E4%BE%86%E4%BA%86-%E4%BF%84%E7%AA%81%E5%AE%A3%E5%B8%83%E6%BC%94%E7%BF%92%E5%BE%8C%E9%83%A8%E5%88%86%E6%92%A4%E5%85%B5-111833407.html')},
                    {key: 4, text: '全聯最新結帳方法曝光！婆媽全笑了', onClick: () => window.open('https://tw.news.yahoo.com/%E5%85%A8%E8%81%AF%E6%9C%80%E6%96%B0%E7%B5%90%E5%B8%B3%E6%96%B9%E6%B3%95%E6%9B%9D%E5%85%89-%E5%A9%86%E5%AA%BD%E5%85%A8%E7%AC%91%E4%BA%86-232447254.html')},
                    {key: 5, text: 'BMW男磕頭求原諒！酒駕撞碎天倫夢 林父悲喊「不要錢」：把老婆還給我…', onClick: () => window.open('https://tw.news.yahoo.com/bmw%E7%94%B7%E7%A3%95%E9%A0%AD%E6%B1%82%E5%8E%9F%E8%AB%92-%E9%85%92%E9%A7%95%E6%92%9E%E7%A2%8E%E5%A4%A9%E5%80%AB%E5%A4%A2-%E6%9E%97%E7%88%B6%E6%82%B2%E5%96%8A-%E4%B8%8D%E8%A6%81%E9%8C%A2-%E6%8A%8A%E8%80%81%E5%A9%86%E9%82%84%E7%B5%A6%E6%88%91-053805398.html')},
                ]}
            />
        </MarqueeRoot>

    );

};

export default BaseUsed;

const MarqueeRoot = styled.div`
  background-color: rgba(255, 255, 255, .2);
  color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;
`;
