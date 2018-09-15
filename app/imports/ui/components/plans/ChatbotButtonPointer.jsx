import React from 'react';

const blurImageStyle = {
                position: 'fixed',
                top: 0, 
                left: 0,
                width: '100vw',
                height: '100vh',
                background: "url('/img/welcome.jpg')",
                backgroundSize: "cover",
                filter: "blur(4px)",
                opacity: "0.8",
                zIndex: '900'
            };

const textContainerStyle = {
    position: 'fixed',
    top: 0, 
    left: 0, 
    width: '100vw',
    height: '100vh',
    zIndex: '905',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-between',
    textAlign: 'center',
    color: "white",
    textShadow: "-1px 1px 5px #3c3939"
};

class ChatbotButtonPointer extends React.Component {

    render () {
        return (
            <div>
                <div style={blurImageStyle}></div>
                <div style={textContainerStyle}>
                    <h1 style={{paddingTop: "25vh"}}><strong>Para cualquier duda que tengas, dale click al asistente!</strong></h1>
                    <img style={{width: '50vw', alignSelf: 'center', transform: "rotate(10deg)"}} src='/img/pointingHand.png'/>
                </div>
            </div>
        );
    }

}

export default ChatbotButtonPointer;