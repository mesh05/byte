import { cppLanguage } from "@codemirror/lang-cpp";
import { javaLanguage } from "@codemirror/lang-java";
import { pythonLanguage } from "@codemirror/lang-python";
import { atom } from "recoil";

export const recoilLanguage = atom({
  key: "recoilLanguage",
  default: {
    c: {
      lang: cppLanguage,
      version: "10.2.0",
      code: '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
    },
    "c++": {
      lang: cppLanguage,
      version: "10.2.0",
      code: '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n  cout << "Hello, World!\\n";\n  return 0;\n}',
    },
    java: {
      lang: javaLanguage,
      version: "15.0.2",
      code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
    },
    python: {
      lang: pythonLanguage,
      version: "3.12.0",
      code: 'print("Hello, World!")',
    },
  },
});

export const recoilProblem = atom({
  key: "recoilProblem",
  default: {},
});
