import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from "styled-components";
import { FaStar } from 'react-icons/fa';
import Star from '../star/Star';
import commentSlice from '../../redux/modules/comment';

const DetailForm = () => {
  const navigate = useNavigate();

  const {id} = useParams();
  console.log(id)
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [star,setStar] = useState();
  const [image,setImage] = useState([]);
  const [fileImage, setFileImage] = useState([]);
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  console.log(image)
  const handleStarClick = index => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]); //컨디마 컨디업

 const sendReview = () => {
 let score = clicked.filter(Boolean).length;
 setStar(score)
 }

  const onChangeImg = (e) => {
    const imageList = e.target.files;
    console.log(imageList);
    const imgFiles = [...fileImage];
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl = URL.createObjectURL(e.target.files[i]);
      imgFiles.push(nowImageUrl);
    }
    for (let i = 0; i < imageList.length; i++) {
      const nowImageUrl1 = e.target.files[i];
      image.push(nowImageUrl1);
      continue;
    }
    setFileImage(imgFiles);
    // setImage(imageList);
  };
  const handleDeleteImage = (id) => {
    setFileImage(fileImage.filter((_, index) => index !== id));
    setImage(image.filter((_, index) => index !== id));
  };
  const data = {
    title:title,
    content:content,
    star:Number(star),
    // nickname:nickname
  }

  const onChangeHandler = (event, setState) => setState(event.target.value);
  
  const onAddComment = async (e) => {

    let json = JSON.stringify(data)
    console.log(json);
    const blob = new Blob([json], { type: "application/json" });
    const formData = new FormData();
    for(let i = 0; i<image.length; i++){
      formData.append("image",image[i])
    }
    // formData.append("image",image[0])
    // formData.append("image",image[1])
    // formData.append("image",image[2])
    formData.append("data",blob)

    const payload = {
      id:id,
      formData: formData,
    }

    const res = await axios.post(
        `http://3.34.46.193/api/auth/comment/${payload.id}`,
        payload.formData,
        {
            headers:{
                "Content-Type": "multipart/form-data"
                // Authorization: localStorage.getItem("Authorization"),
                // RefreshToken: localStorage.getItem("RefreshToken"),
            }
        }
    )
    for (let value of payload.formData.values()) {
      console.log(value);
    }
    return res.data;
  };
  return (
   <>
     <Box>
      <LiTilte>
          <PTitle>
            제목<span style={{ color: "rgb(255, 80, 88)" }}>*</span>
          </PTitle>
          <InputTit
            type="text"
            name="title"
            value={title}
            onChange={(event) => onChangeHandler(event, setTitle)}
            placeholder="상품 제목을 입력해주세요"
          />
        </LiTilte>
        <LiImg>
          <ImgTitle>
            <b>
              상품이미지
              <span style={{ color: "rgb(255, 80, 88)" }}>*</span>
            </b>
          </ImgTitle>
          <div style={{ width: "100%" }}>
            <ImgBox>
              <ImgLabel>
                <img
                  alt=""
                  style={{ height: "20px" }}
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj4KICAgIDxwYXRoIGZpbGw9IiNEQ0RCRTQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTI4LjQ3MSAzMkgzLjUzYy0uOTcxIDAtMS44OTQtLjQyMi0yLjUyOS0xLjE1N2wtLjAyNi0uMDNBNCA0IDAgMCAxIDAgMjguMTk4VjguNjA3QTQgNCAwIDAgMSAuOTc0IDUuOTlMMSA1Ljk2YTMuMzQzIDMuMzQzIDAgMCAxIDIuNTI5LTEuMTU2aDIuNTM0YTIgMiAwIDAgMCAxLjUzNy0uNzJMMTAuNC43MkEyIDIgMCAwIDEgMTEuOTM3IDBoOC4xMjZBMiAyIDAgMCAxIDIxLjYuNzJsMi44IDMuMzYzYTIgMiAwIDAgMCAxLjUzNy43MmgyLjUzNGMuOTcxIDAgMS44OTQuNDIzIDIuNTI5IDEuMTU3bC4wMjYuMDNBNCA0IDAgMCAxIDMyIDguNjA2djE5LjU5MWE0IDQgMCAwIDEtLjk3NCAyLjYxN2wtLjAyNi4wM0EzLjM0MyAzLjM0MyAwIDAgMSAyOC40NzEgMzJ6TTE2IDkuNmE4IDggMCAxIDEgMCAxNiA4IDggMCAwIDEgMC0xNnptMCAxMi44YzIuNjQ3IDAgNC44LTIuMTUzIDQuOC00LjhzLTIuMTUzLTQuOC00LjgtNC44YTQuODA1IDQuODA1IDAgMCAwLTQuOCA0LjhjMCAyLjY0NyAyLjE1MyA0LjggNC44IDQuOHoiLz4KPC9zdmc+Cg=="
                />
                <p style={{ marginTop: "15px", fontSize: "12px" }}>
                  이미지 등록
                </p>
                <ImgInput
                  type="file"
                  name="imgUrl"
                  accept="image/*"
                  multiple
                  onChange={onChangeImg}
                  id="image"
                />
              </ImgLabel>
              {fileImage.map((image, id) => (
                <div key={id}>
                  <Img alt={`${image}-${id}`} src={image} />
                  <DeleteImg onClick={() => handleDeleteImage(id)}>
                    X
                  </DeleteImg>
                </div>
              ))}
            </ImgBox>
            </div>
          </LiImg>
          <Wrap>
              <RatingText>별점</RatingText>
              <Stars>
                  {[0,1,2,3,4].map((el, idx) => {
                  return (
                      <FaStar
                      key={idx}
                      size="50"
                      onClick={() => handleStarClick(el)}
                      className={clicked[el] && 'yellowStar'}
                      />
                  );
                  })}
              </Stars>
          </Wrap>
          <LiTilte>
            <PTitle>
              후기<span style={{ color: "rgb(255, 80, 88)" }}>*</span>
            </PTitle>
            <InputCom
              type="text"
              name="content"
              value={content}
              onChange={(event) => onChangeHandler(event, setContent)}
              placeholder="후기를 남겨주세요"
            />
          </LiTilte>
          <div>
                <button onClick={onAddComment}>등록하기</button>
                <button onClick={() => navigate('/detail/'+id)}>취소하기</button>
          </div>
      </Box>
   </>
  )
}

export default DetailForm

const Box = styled.div`
  height:100%;
  max-width: 380px;
  width:100%;
  /* font-size: 17px; */
  font-family: "Noto Sans KR", sans-serif;
  border: 1px solid black;
  background-color: rgb(255, 255, 255);
  margin: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  /* position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99; */
`;
const LiImg = styled.li`
  width: 90%;
  display: flex;
  padding: 10px 0px;
  border-bottom: 1px solid rgb(204, 204, 204);
`;
const ImgTitle = styled.div`
  padding-right:28px;
  width: 100px;
  height: 48px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
  font-size: 14px;
`;
const ImgBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const ImgInput = styled.input`
  display: none;
`;
const ImgLabel = styled.label`
  width: 100px;
  height: 100px;
  position: relative;
  border: 1px solid rgb(230, 229, 239);
  background: rgb(250, 250, 253);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  color: rgb(155, 153, 169);
  font-size: 1rem;
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  font-synthesis: none;
  ::-webkit-font-smoothing {
    -webkit-appearance: none;
    -webkit-font-smoothing: antialiased;
  }
`;
const DeleteImg = styled.button`
  margin: -10.3px;
  position: relative;
  color: red;
  right: 11.5px;
  bottom: 88px;
  background-color: white;
  border: none;
`;
const LiTilte = styled.li`
  padding: 10px 0px;
  display: flex;
  width: 100%;
`;
const PTitle = styled.b`
  padding-right:18px;
  width: 100px;
  height: 48px;
  font-size: 14px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;
const InputTit = styled.input`
  font-size: 15px;
  width: 79.7%;
  border: 1px solid rgb(195, 194, 204);
  color: rgb(195, 194, 204);
  padding: 0px 16px;
`;
const InputCom = styled.textarea`
  width: 90%;
  height: 100%;
  min-height: 163px;
  padding-left:10px;
  /* margin-right: 16px; */
  font-size: 14px;
  resize: none;
  border: 1px solid rgb(195, 194, 204);
`;
const Wrap = styled.div`
  display: flex;
  /* flex-direction: column; */
  padding-top: 15px;
`;

const RatingText = styled.b`
  width: 100px;
  height: 48px;
  font-size: 14px;
  align-items: center;
  display: flex;
  justify-content: flex-start;
`;

const Stars = styled.div`
  width:130px;
  display: flex;
  /* padding-top: 5px; */

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;