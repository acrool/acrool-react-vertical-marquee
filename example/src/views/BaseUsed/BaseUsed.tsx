import React from 'react';
import BearVerticalMarquee from 'bear-vertical-marquee';




const BaseUsed = () => {

    return (
        <BearVerticalMarquee
            style={{
                height: '200px'
            }}
            data={[
                {key: 1,text: 'test1'},
                {key: 2,text: 'test2'},
                {key: 3,text: 'test3'},
                {key: 4,text: 'test4'},
                {key: 5,text: 'test5'},
            ]}
        />
    );

};

export default BaseUsed;
