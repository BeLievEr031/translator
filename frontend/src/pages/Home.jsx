/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from "react";
import { IoMdSwap } from "react-icons/io";
import "../index.css";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import Setting from "../components/Setting";
import InputBoxes from "../components/InputBoxes";
import Speakers from "../components/Speakers";
import { createHistory, translateLanguage } from "../http/api";
import { KOLHAPURI, MALVANI } from "../utils/constant";
import toast, { Toaster } from "react-hot-toast";

import loaderSrc from "../assets/loader.gif";
const languages = [
  { value: "Asami", prefix: "as" },
  { value: "Bhojpuri", prefix: "bho" },
  { value: "English", prefix: "en" },
  { value: "Hindi", prefix: "hi" },
  { value: "Konkani", prefix: "kok" },
  { value: "Kolhapuri", prefix: "kol" },
  { value: "Malay", prefix: "ms" },
  { value: "Marathi", prefix: "mr" },
  { value: "Marwari", prefix: "mwr" },
  { value: "Tamil", prefix: "ta" },
  { value: "Telugu", prefix: "te" },
  // { value: "agri", prefix: "agr" },
  { value: "malvni", prefix: "mlv" },
];

function Home() {
  const { isSignedIn, user, isLoaded } = useUser();
  const fromAudioRef = useRef(null);
  const toAudioRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [translatedAudio, setTranslatedAudio] = useState({
    fromWordAdo: null,
    toWordAdo: null,
  });
  // const [gradient, setGradient] = useState({
  //   textGradient: true,
  //   docsGradient: false,
  // });

  const [langData, setLangData] = useState({
    fromLang: "en",
    toLang: "hi",
  });

  const [inputData, setInputData] = useState({
    fromWord: "",
    toWord: "",
  });

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth" replace={true} />;
  }

  function getMatchingPercentage(str1, str2) {
    // Normalize the strings to lowercase for case-insensitive comparison
    const normalizedStr1 = str1.toLowerCase();
    const normalizedStr2 = str2.toLowerCase();

    let matchingCharacters = 0;

    // Find the shorter length to iterate over
    const length = Math.min(normalizedStr1.length, normalizedStr2.length);

    // Count the number of matching characters at each index
    for (let i = 0; i < length; i++) {
      if (normalizedStr1[i] === normalizedStr2[i]) {
        matchingCharacters++;
      }
    }

    // Calculate the percentage based on the longer string's length
    const percentage =
      (matchingCharacters /
        Math.max(normalizedStr1.length, normalizedStr2.length)) *
      100;

    console.log(percentage);
    return percentage;
  }

  const hanldeCustomeLanguage = async (language, from, to) => {
    let result;
    let ans = "";
    if (from === "en" && (to === "kol" || to === "mlv")) {
      result = language.phrases.filter((item) => {
        const percentage = getMatchingPercentage(
          item.english.toLowerCase().trim().split(" ").join(""),
          inputData.fromWord.toLowerCase().trim().split(" ").join("")
        );

        setTranslatedAudio({
          fromWordAdo: null,
          toWordAdo: null,
        });

        if (percentage >= 75) {
          ans = item.translatedWord;
          return item.translatedWord;
        }
      });
    } else {
      result = language.phrases.filter((item) => {
        const percentage = getMatchingPercentage(
          inputData.fromWord.toLowerCase().trim().split(" ").join(""),
          item.translatedWord.toLowerCase().trim().split(" ").join("")
        );

        setTranslatedAudio({
          fromWordAdo: null,
          toWordAdo: null,
        });

        if (percentage >= 75) {
          ans = item.english;
          return item.english;
        }
      });

      console.log(result);
    }

    if (result.length > 0) {
      const historyData = await createHistory(user.id, inputData.fromWord, ans);

      console.log(historyData);
      setInputData({
        ...inputData,
        toWord: ans,
      });
    } else {
      setInputData({
        ...inputData,
        toWord: "",
      });
    }
  };

  const handleTranslate = async () => {
    if (
      langData.fromLang === "" ||
      langData.toLang === "" ||
      inputData.fromWord === ""
    ) {
      toast.error("All fields required.");
      return;
    }

    try {
      if (
        langData.fromLang !== "en" &&
        (langData.toLang === "mlv" || langData.toLang === "kol")
      ) {
        toast.error("Language not supported");
        return;
      }

      if (
        langData.toLang !== "en" &&
        (langData.fromLang === "mlv" || langData.fromLang === "kol")
      ) {
        toast.error("Language not supported");
        return;
      }

      if (
        langData.fromLang === "en" &&
        (langData.toLang === "mlv" || langData.toLang === "kol")
      ) {
        console.log("ateyhbhj");

        if (langData.toLang === "kol") {
          hanldeCustomeLanguage(KOLHAPURI, "en", "kol");
        } else {
          hanldeCustomeLanguage(MALVANI, "en", "mlv");
        }
      } else if (
        langData.toLang === "en" &&
        (langData.fromLang === "mlv" || langData.fromLang === "kol")
      ) {
        console.log("i am running.");
        console.log(langData.fromLang, langData.toLang);

        if (langData.fromLang === "kol") {
          hanldeCustomeLanguage(KOLHAPURI, "kol", "en");
        } else {
          hanldeCustomeLanguage(MALVANI, "mlv", "en");
        }
      } else {
        setLoading(true);
        const result = await translateLanguage(
          user.id,
          inputData.fromWord,
          langData.fromLang,
          langData.toLang
        );

        const { data } = result.data;
        const historyData = await createHistory(
          user.id,
          inputData.fromWord,
          data.translatedText
        );

        console.log(historyData);

        setTranslatedAudio({
          fromWordAdo: data.sourceAudio.base64,
          toWordAdo: data.translatedAudio.base64,
        });

        setInputData({
          ...inputData,
          toWord: data.translatedText,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSwap = () => {
    setLangData({
      toLang: langData.fromLang,
      fromLang: langData.toLang,
    });

    setInputData({
      fromWord: inputData.toWord,
      toWord: inputData.fromWord,
    });
  };

  return (
    <div>
      {!isLoaded ? (
        <div>Loading...</div>
      ) : (
        <div className="container">
          <div className="box">
            <div className="top-row">
              {/* <div className="downloadable">
                <div
                  className={`text${gradient.textGradient ? "-gradient" : ""}`}
                  onClick={() =>
                    setGradient({
                      textGradient: true,
                      docsGradient: false,
                    })
                  }
                >
                  Text
                </div>
                <div
                  className={`doc${gradient.docsGradient ? "-gradient" : ""}`}
                  onClick={() =>
                    setGradient({
                      textGradient: false,
                      docsGradient: true,
                    })
                  }
                >
                  Doc
                </div>
              </div> */}
              <div className="lang-selectors">
                <div className="from-lang">
                  <select
                    name=""
                    id="from-select"
                    defaultValue={"en"}
                    value={langData.fromLang}
                    onChange={(e) =>
                      setLangData({
                        ...langData,
                        fromLang: e.target.value,
                      })
                    }
                  >
                    {languages.map((item, index) => (
                      <option key={index} value={item.prefix}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="swap-btn">
                  <div className="swap-icon" onClick={handleSwap}>
                    <IoMdSwap size={30} />
                  </div>
                </div>
                <div className="to-lang">
                  <select
                    name=""
                    id="to-select"
                    defaultValue={"hi"}
                    value={langData.toLang}
                    onChange={(e) =>
                      setLangData({
                        ...langData,
                        toLang: e.target.value,
                      })
                    }
                  >
                    {languages.map((item, index) => (
                      <option key={index} value={item.prefix}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <InputBoxes inputData={inputData} setInputData={setInputData} />
            <div className="btm-row">
              {translatedAudio.fromWordAdo !== null &&
                translatedAudio.toWordAdo !== null && (
                  <Speakers
                    fromAudioRef={fromAudioRef}
                    toAudioRef={toAudioRef}
                  />
                )}
              <div className="translate-btn-div">
                {loading ? (
                  <img src={loaderSrc} />
                ) : (
                  <button
                    id="translate-btn"
                    onClick={() => {
                      handleTranslate();
                    }}
                  >
                    Translate
                  </button>
                )}
              </div>
              <Setting />
            </div>
            <div>
              <audio
                ref={fromAudioRef}
                src={`${translatedAudio.fromWordAdo}`}
                controls
              ></audio>
              <audio
                ref={toAudioRef}
                src={`${translatedAudio.toWordAdo}`}
                controls
              ></audio>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default Home;
