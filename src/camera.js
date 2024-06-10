import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import CamInfo from "./caminstruc";
import DigitalEnigma from "./enigma";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Camera = (props) => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  var [brightness, setBrightness] = useState("brightness(1)");
  var [isLoading, setLoading] = useState(false);
  var [word, setWord] = useState("");
  var [cam, setCam] = useState(true);

  async function analyzeImage(img) {
    setWord("");
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "I want you to just return the text from the image nothing else.",
            },
            {
              type: "image_url",
              image_url: {
                url: img,
              },
            },
          ],
        },
      ],
    });

    const result = response.choices[0];

    try {
      if (result) {
        setWord(result["message"]["content"]);
      }
    } catch (error) {
      console.error("Error occured proccessing image", error);
    } finally {
      setBrightness("brightness(1");
      setLoading(false);
    }
  }

  const takePhoto = () => {
    setBrightness("brightness(1.75");
    setLoading(true);
    const width = 400;
    const height = 200;
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.height = height;
    photo.width = width;
    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 20, 20, width, height);
    var block = ctx.getImageData(0, 0, width, height);

    ctx.putImageData(block, 0, 0);

    var data = photo.toDataURL("image/png");
    photo.setAttribute("src", data);

    analyzeImage(data);
  };

  const getVideo = (disabled) => {
    if (disabled) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            facingMode: "environment",
            width: 2000,
            height: 1080,
          },
        })
        .then((stream) => {
          var tracks = stream.getTracks();
          for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
          }
        })
        .catch((err) => console.error(err));

      console.log("hello");

      return;
    }

    setCam(false);
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: "environment",
          width: 2000,
          height: 1080,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.setAttribute("playsinline", true);
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {cam ? (
        <div className="caminfo-wrapper">
          {" "}
          <CamInfo />{" "}
          <button className="caminfo-btn" onClick={() => getVideo(false)}>
            Ready! <FontAwesomeIcon icon="camera" />{" "}
          </button>{" "}
        </div>
      ) : (
        <div
          className="camera-wrapper"
          style={{
            background: "url(https://wallpaperaccess.com/full/2939800.jpg)",
          }}
        >
          <div className="camera-cont">
            <video
              id="cap"
              ref={videoRef}
              style={{ filter: brightness }}
              allow="camera;microphone"
            ></video>

            <div className="crypt-cont">
              {word.length > 0 ? (
                <div
                  className="cryptic"
                  style={{ fontSize: `${30 / word.length}rem` }}
                >
                  <DigitalEnigma
                    word={word}
                    rotorChoices={props.rotors}
                    plugBoard={props.plugBoard}
                  />{" "}
                </div>
              ) : null}
            </div>

            {isLoading ? (
              <div className="takePhoto" style={{ color: "black" }}>
                {" "}
                <FontAwesomeIcon icon="lock" />{" "}
              </div>
            ) : (
              <div className="takePhoto" onClick={takePhoto}>
                {" "}
                <FontAwesomeIcon icon="circle" />{" "}
              </div>
            )}

            <div className="homepage-btn" onClick={() => getVideo(true)}>
              {" "}
              <button onClick={props.handleCamera}>HomePage </button>{" "}
            </div>
          </div>
          <div className="photo">
            <canvas id="image" ref={photoRef}></canvas>
          </div>
        </div>
      )}
    </>
  );
};
export default Camera;
