import InputModal from "components/modal/inputModal";
import * as S from "./index.styled";
import { useState } from "react";

const InputContainer = () => {
  const [showModal, setShowModal] = useState<boolean>(true);
  return <>{showModal && <InputModal setShowModal={setShowModal} />}</>;
};

export default InputContainer;
