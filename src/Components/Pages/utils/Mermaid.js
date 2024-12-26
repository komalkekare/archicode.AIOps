import React, { useState } from "react";

import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
});

class Mermaid extends React.Component {
  componentDidMount() {
    mermaid.contentLoaded();
  }

  render() {
  
    return <div className="mermaid">{this.props.chart}</div>;
  }
}

export default function MermaidComp(props) {
 
  return (
    <div className="App">
      <h3>Architecture Diagram :</h3>
      {<Mermaid chart={props.chart} />}
      <div style={{ textAlign: 'left' }}>
      {props.desc && props.desc.split('\n').map((line, index) => (
        <p key={index}>{line.trim().startsWith('-') ? line.trim().substring(1) : line.trim()}</p>
      ))}
    </div>
    </div>
  );
}
