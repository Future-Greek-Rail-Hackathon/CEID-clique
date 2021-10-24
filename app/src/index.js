import React from "react";
import ReactDOM from "react-dom";
import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css";
import ReactPlayer from "react-player";
import "./index.css";

export default class HorizontalLayoutWithIFrame extends React.Component {
  constructor(props) {
    super(props);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {
      dragging: false
    };
  }

  onDragStart() {
    this.setState({ dragging: true });
  }

  onDragEnd() {
    this.setState({ dragging: false });
  }

  getRandomDistance() {
    const min = 50;
    const max = 120;
    const random = min + Math.random() * (max - min);
    return Math.floor(random);
  }

  renderDetailLinks() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1>
            <b style={{ color: "red" }}>Train</b>
            <b style={{ color: "white" }}>edDriver</b>
            <br />
            <br />
            <br />
          </h1>
          <h2>
            <b style={{ color: "white" }}>Status: </b>
            <b id="status" style={{ color: "green" }}>
              SAFE
            </b>
            {/* <b style={{ color: "red" }}>WARNING</b> */}
          </h2>
          <h2>
            <b style={{ color: "white" }}>Distance: </b>
            <b style={{ color: "white" }}>{this.getRandomDistance()}m</b>
          </h2>
        </div>
      </div>
    );
  }

  render() {
    return (
      <SplitterLayout
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        percentage={true}
        secondaryMinSize="80"
      >
        <div className="my-iframe">{this.renderDetailLinks()}</div>

        <div className="my-pane">
          {/* <iframe
            width="100%"
            // height="100%"
            src="//www.youtube.com/embed/IXxcKuenuiI?modestbranding=1&autohide=1&showinfo=0&controls=0"
            frameborder="0"
            allowfullscreen
          ></iframe> */}

          <ReactPlayer
            url="https://github.com/TrainedDriver/app/blob/main/public/videos/drone.mp4?raw=true"
            config={{
              youtube: {
                playerVars: {
                  showinfo: 1,
                  modestbranding: 1
                }
              }
            }}
            controls={false}
            width="100%"
            height="100%"
            muted={true}
            loop={true}
            playing={true}
            onStart={() => {
              setTimeout(function () {
                var e = document.getElementById("status");
                e.innerText = "DANGER";
                e.style.color = "red";
              }, 36540);
              setTimeout(function () {
                var e = document.getElementById("status");
                e.innerText = "SAFE";
                e.style.color = "green";
              }, 52500);
            }}
          />
        </div>
      </SplitterLayout>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<HorizontalLayoutWithIFrame />, rootElement);
