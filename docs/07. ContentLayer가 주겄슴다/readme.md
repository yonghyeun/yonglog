# `ContentLayer` 환경 설정

---

이전 `docs` 에서 `ContentLayer` 의 필요 목적에 대해 공부했다.

즉 `ContentLayer` 는 `Content` 를 이용해 개발하기 위한 초기 환경 설정 , 개발 시 편의를 줄 수 있는 기능 제공 , 빠른 배포를 위한 설정 등을 제공하는 도구임을 알았다.

그럼 이렇게 좋은 기능들을 제공하는 도구를 사용하지 않을 이유가 없으니 `install` 하고 환경을 설정해보자

공식문서에서 매우 친절하게 방법들을 제공한다. :)

## `instll ContentLayer`

---

```bash
$ npm install contentlayer next-contentlayer
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: app@0.1.0
npm ERR! Found: next@14.2.3
npm ERR! node_modules/next
npm ERR!   next@"14.2.3" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer next@"^12 || ^13" from next-contentlayer@0.3.4
npm ERR! node_modules/next-contentlayer
npm ERR!   next-contentlayer@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR!
npm ERR! For a full report see:
npm ERR! C:\Users\ttddc\AppData\Local\npm-cache\_logs\2024-05-31T15_13_35_569Z-eresolve-report.txt

npm ERR! A complete log of this run can be found in: C:\Users\ttddc\AppData\Local\npm-cache\_logs\2024-05-31T15_13_35_569Z-debug-0.log
```

설치하려고 하니까 에러가 발생한다.

왜 발생하는지 아시나요 ?

![alt text](image.png)

`ContentLayer` 는 더 이상 `NextJS 14` 버전 이상부터 사용 할 수 없대요 . `ContentLayer` 개발 중단 이슈 ..

ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ

죽은 라이브러리를 공부해버렸습니다 ..
