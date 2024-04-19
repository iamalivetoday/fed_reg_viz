import React, { Component } from 'react';

class Dot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: { x: 0, y: 0 },
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseleave', this.handleMouseLeave);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseMove = (e) => {
    this.setState({
      position: { x: e.clientX, y: e.clientY }
    });
  };

  handleMouseLeave = () => {
    this.setState({ visible: false });
  };

  render() {
    const { x, y } = this.state.position;
    const dotStyle = {
      position: 'fixed',
      width: '120px',
      height: '120px',
      backgroundColor: 'red',
      borderRadius: '60%',
      pointerEvents: 'none',
      opacity: 0.2, // Toggle opacity based on visibility
      transition: 'opacity 0.5s, transform 1s ease-out',
      transform: `translate(${x-700}px, ${y-400}px)`, // Center the dot at cursor position
      zIndex: 1000,
  
      boxShadow: '0 0 200px 100px red', // Increased blur and spread for a more prominent glow
    };

    return <div style={dotStyle} />;
  }
}

export default Dot;
