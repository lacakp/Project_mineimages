import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import "./ImagesComponent.css";
import { API_URL, CLOUDINARY_NAME, AccessHeader } from "../../../utils/API";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

import Cookies from "js-cookie";
function ImagesComponent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  // const handleShow = () => setShow(true);

  const handleOrder = (event) => {
    const response = axios
      .post(
        `${API_URL}/order`,
        { dataImage },
        {
          method: "post",
          headers: AccessHeader,
        }
      )
      .then((response) => {
        return response;
      })
      .then((data) => {
        const resp = data.data;
        setShow(false)
      });

    console.log(dataImage);
  };

  const [dataImage, setDataImage] = useState("");
  const [imagePublicId, setimagePublicId] = useState("");

  const handleOnImageClick = async (event) => {
    setShow(true);
    const imgid = event.target.alt;
    const response = await axios
      .post(`${API_URL}/images/detail`, { imgid: imgid })
      .then((response) => {
        return response;
      })
      .then((data) => {
        const resp = data.data;
        setDataImage(resp);
      });
  };

  const loadImages = async () => {
    try {
      const res = await fetch(`${API_URL}/images`);
      const data = await res.json();
      // console.log(data)
      setimagePublicId(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <>
      <div className="gallery">
        {imagePublicId &&
          imagePublicId.map((imageId, index) => (
            <Image
              key={index}
              cloudName={CLOUDINARY_NAME}
              alt={imageId}
              publicId={imageId}
              width="200"
              height="200"
              crop="scale"
              onClick={handleOnImageClick}
            />
          ))}
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`${dataImage.detail}`}
          <img src={dataImage.pathWatermark}></img>
          <h6>
            เจ้าของภาพ : <span>{dataImage.owner}</span>
          </h6>
          <h6>
            ราคา : <span>{dataImage.price}</span>
          </h6>
          <h6>
            ชื่อภาพ : <span>{dataImage.name}</span>
          </h6>
          <h6>
            รายละเอียด : <span>{dataImage.detail}</span>
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            ปิด
          </Button>
          <Button variant="primary" type="submit" onClick={handleOrder}>
            สั่งซื้อ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ImagesComponent;
