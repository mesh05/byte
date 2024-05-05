import { useRecoilState, useSetRecoilState } from "recoil";
import { recoilLanguage } from "../recoil/atom";
import { useState } from "react";

const LANGUAGES = ["c", "c++", "java", "python"];

export default function LanguageSelector({
  setSelectedLanguage,
  setCode,
}: any) {
  const [language, setLanguage]: any = useRecoilState(recoilLanguage);
  return (
    <div>
      <select
        id="language-selector"
        onChange={(e) => {
          setSelectedLanguage(e.target.value);
          setCode(language[e.target.value].code);
        }}
      >
        {LANGUAGES.map((lang) => {
          return (
            <option key={lang} value={lang}>
              {lang}
            </option>
          );
        })}
      </select>
    </div>
  );
}
