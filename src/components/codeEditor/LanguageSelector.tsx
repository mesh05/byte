import { useSetRecoilState } from "recoil";
import { recoilLanguage } from "../recoil/atom";
import { useState } from "react";

const LANGUAGES = ["C", "C++", "Java", "Python"];

export default function LanguageSelector() {
  const setLanguage = useSetRecoilState(recoilLanguage);
  return (
    <div>
      <select
        id="language-selector"
        onChange={(e) => {
          setLanguage(e.target.value);
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
