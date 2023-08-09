import * as S from "./index.styled";
import logoImg from "../../../asset/img/logo/2.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MyPage from "containers/myPage/MyPage";

type inputModalProps = {
  setShowModal: (value: boolean) => void;
};

type formProps = {
  main_image_id: string;
  phoneNumber: string;
  userAge: number;
  userGender: "FEMALE" | "MALE";
};

const InputModal = ({ setShowModal }: inputModalProps) => {
  let navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false); //부모의 함수를 쓰는 거임, 즉 부모에서 이 모달을 여닫을 변수를 관리하는 것
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formProps>({});

  const handleUser = () => {
    fetch("http://localhost:9999/api/users/mypage", {
      headers: {
        Auth: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjQiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY5MTAzODYyOSwiZXhwIjoxNjkxMDM5MjI5fQ.DWaglhnuTcbxg_7SOxd9rFpXP74TyT16hB8H05qGrN4",
      },
    });
  };

  const handleProfile = () => {};

  const handleOnClick = () => {
    const insertUser = async () => {
      console.log("insert User");
    };

    const insertProfile = () => {
      console.log("insert Profile");
    };

    insertUser();
    insertProfile();
    // navigate("/mypage");
    window.location.href = "http://localhost:3000/mypage";
  };

  return (
    <S.ModalWrapper onClick={handleCloseModal}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.LogoImg src={logoImg} alt="logo" />
        <S.UserBox onSubmit={handleSubmit(handleUser)}>
          <S.Title>기본 정보</S.Title>
          <S.Input
            {...register("phoneNumber", {
              required: "휴대폰 번호를 입력해주세요",
              pattern: {
                value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                message: "정확한 휴대폰 번호를 입력해주세요",
              },
            })}
            placeholder="휴대폰 번호"
          />
          <span>{errors?.phoneNumber?.message}</span>
          <S.Input placeholder="생년월일" />
          <div>
            <label htmlFor="MALE">남성</label>
            <input type="radio" id="MALE" name="gender" value="MALE" />
            <label htmlFor="FEMALE">여성</label>
            <input type="radio" id="FEMALE" name="gender" value="FEMALE" />
          </div>
        </S.UserBox>

        <S.ProfileBox onSubmit={handleSubmit(handleProfile)}>
          <S.Title>선택 정보</S.Title>
          <S.Input placeholder="한줄 소개" />
          <S.Input placeholder="취미" />
          <S.Input placeholder="직업" />
          <S.Input placeholder="MBTI" />
          <S.Input placeholder="시도" />
          <S.Input placeholder="구군" />
          <span>{errors?.phoneNumber?.message}</span>
        </S.ProfileBox>
        <S.Button onClick={handleOnClick}>입력완료</S.Button>
      </S.ModalContent>
    </S.ModalWrapper>
  );
};

export default InputModal;
