/* eslint-disable react/prop-types */
function InputBoxes({ inputData, setInputData }) {
  return (
    <div className="input-boxes">
      <div className="from-input-box">
        <textarea
          name=""
          id="from-input"
          value={inputData.fromWord}
          onChange={(e) =>
            setInputData({
              ...inputData,
              fromWord: e.target.value,
            })
          }
        ></textarea>
      </div>
      <div className="to-input-box">
        <textarea
          name=""
          id="to-input"
          value={inputData.toWord}
          onChange={(e) =>
            setInputData({
              ...inputData,
              toWord: e.target.value,
            })
          }
        ></textarea>
      </div>
    </div>
  );
}

export default InputBoxes;
