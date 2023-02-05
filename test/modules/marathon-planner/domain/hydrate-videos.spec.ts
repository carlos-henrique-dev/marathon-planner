import { IApiVideoDetailResponse, IApiVideoSearchResponse } from "@/interfaces";
import {
  hydrateVideos,
  splitIntoChunksOfIds,
} from "@/modules/marathon-planner/domain/hydrate-videos";
import { HttpClientMock } from "test/__mocks__/http-client";
import { describe, expect, it } from "vitest";

const API_DETAIL_RESPONSE_ITEMS = [
  {
    id: "2OTq15A5s0Y",
    snippet: {
      title: "7 better ways to create a React app",
      description:
        "What is the best tool for starting a new React project in 2023? Let's look at 7 good alternatives to create-react-app for starting a new ReactJS web development project. \n\nSubscribe to @nxdevtools for more awesome dev content!\n\n#javascript #webdevelopment #reactjs \n\n💬 Chat with Me on Discord\n\nhttps://discord.gg/fireship\n\n🔗 Resources\n\n- React Apps with Nx https://nx.dev/getting-started/react-standalone-tutorial\n- Create React App Github Issue https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-1409720741\n- 10 Rendering Patterns on the Web https://youtu.be/Dkx5ydvtpCA\n\n🔥 Get More Content - Upgrade to PRO\n\nUpgrade at https://fireship.io/pro\nUse code YT25 for 25% off PRO access \n\n🎨 My Editor Settings\n\n- Atom One Dark \n- vscode-icons\n- Fira Code Font\n\n🔖 Topics Covered\n\n- How to start react project as a beginner\n- Getting started with Vite for React\n- Build standalone react apps with Nx\n- Getting started with Next.js\n- Next.js vs Remix\n- Gatsby vs Astro",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/2OTq15A5s0Y/default.jpg",
        },
      },
    },
    contentDetails: {
      duration: "PT1H1M1S",
    },
  },
  {
    id: "NhUr8cwDiiM",
    snippet: {
      title: "React JS // Dicionário do Programador",
      description:
        "🧠 𝗘𝗦𝗧𝗨𝗗𝗘 𝗡𝗔 𝗖𝗢𝗟𝗟𝗔𝗕𝗣𝗟𝗔𝗬 → https://codft.me/cursopluginswordpress\nReact é Lib ou Framework? No papel é uma lib mas na prática se tornou um ecossistema para desenvolvimento Front-End de aplicações super popular que resolveu problemas importantes como eficiência e flexibilidade.\nEssa tecnologia criada pelo Facebook, sem dúvida, rescreveu a história da criação de User Interfaces.\nSe você quer entender sobre o poder do ReactJS e como ele chegou até aqui esse vídeo é pra você.\n\n📝 𝗟𝗶𝗻𝗸𝘀 𝗖𝗶𝘁𝗮𝗱𝗼𝘀\n→  Site oficial ReactJS: https://reactjs.org/\n\n📡 𝗦𝗶𝗴𝗮 𝗮𝘀 𝗿𝗲𝗱𝗲𝘀 𝗱𝗼 𝗖𝗗𝗙𝗧𝗩\n→ https://linktr.ee/codigofontetv\n\n📸𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺\n→ https://www.instagram.com/codigofontetv/\n\n☕ 𝗖𝗹𝘂𝗯𝗲 𝗱𝗼𝘀 𝗖𝗗𝗙𝘀 𝗻𝗼 𝗬𝗼𝘂𝘁𝘂𝗯𝗲\n→ https://codft.me/clubecdfs\n\n▸ 𝗛𝗢𝗦𝗧𝗚𝗔𝗧𝗢𝗥\n📢 Vagas e Oportunidades: https://codft.me/hostgatorjobs\n\n𝑵ó𝒔 ❤️ 𝒓𝒆𝒄𝒆𝒃𝒆𝒓 𝒑𝒓𝒆𝒔𝒆𝒏𝒕𝒆𝒔, 𝒄𝒂𝒓𝒕𝒂𝒔, 𝒃𝒓𝒊𝒏𝒅𝒆𝒔 𝒆 𝒎𝒊𝒎𝒐𝒔.\nCaixa Postal: 91735 - Cep: 25620-972\nPetrópolis / RJ\n\n🤝 Roteiro em colaboração com João Alves\n💻 Edição e Áudio: RW Studio\n🔗 Um vídeo do site Código Fonte\n\n#React #FrontEnd #JavaScript",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/NhUr8cwDiiM/default.jpg",
        },
      },
    },
    contentDetails: {
      duration: "PT10M4S",
    },
  },
  {
    id: "1LkOa7Ky2ak",
    snippet: {
      title: "Why React.js is taking a new direction",
      description:
        "React.js is super popular. Like ... really, extremely popular.\nBut it's also changing. Slowly but steadily. Not alone but instead with its entire ecosystem.\n\nLearn all about React with my bestselling course: https://acad.link/reactjs\nOr with my brand-new book: https://www.amazon.com/React-Key-Concepts-Consolidate-knowledge-ebook/dp/B0B3XRRYHN\nBuild fullstack React apps with NextJS: https://acad.link/nextjs\nBuild fullstack React apps with Remix: https://acad.link/remix\n\nJoin our Academind Community on Discord: https://academind.com/community\n\nCheck out all our other courses: https://academind.com/courses\n\n----------\n\n• Go to https://www.academind.com and subscribe to our newsletter to stay updated and to get exclusive content & discounts\n• Follow @maxedapps and @academind_real on Twitter\n• Follow @academind_real on Instagram: https://www.instagram.com/academind_real\n• Join our Facebook community on https://www.facebook.com/academindchannel/\n\nSee you in the videos!\n\n----------\n\nAcademind is your source for online education in the areas of web development, frontend web development, backend web development, programming, coding and data science! No matter if you are looking for a tutorial, a course, a crash course, an introduction, an online tutorial or any related video, we try our best to offer you the content you are looking for. Our topics include Angular, React, Vue, Html, CSS, JavaScript, TypeScript, Redux, Nuxt.js, RxJs, Bootstrap, Laravel, Node.js, Progressive Web Apps (PWA), Ionic, React Native, Regular Expressions (RegEx), Stencil, Power BI, Amazon Web Services (AWS), Firebase or other topics, make sure to have a look at this channel or at academind.com to find the learning resource of your choice!",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/1LkOa7Ky2ak/default.jpg",
        },
      },
    },
    contentDetails: {
      duration: "PT5M21S",
    },
  },
];

const VIDEOS_TO_HYDRATE = [
  {
    id: "2OTq15A5s0Y",
    title: "7 better ways to create a React app",
    description:
      "What is the best tool for starting a new React project in 2023? Let's look at 7 good alternatives to create-react-app for starting a ...",
    thumbnail: "https://i.ytimg.com/vi/2OTq15A5s0Y/default.jpg",
    duration: null,
  },
  {
    id: "NhUr8cwDiiM",
    title: "React JS // Dicionário do Programador",
    description:
      "ESTUDE NA COLLABPLAY → https://codft.me/cursopluginswordpress React é Lib ou Framework? No papel é uma ...",
    thumbnail: "https://i.ytimg.com/vi/NhUr8cwDiiM/default.jpg",
    duration: null,
  },
  {
    id: "1LkOa7Ky2ak",
    title: "Why React.js is taking a new direction",
    description:
      "React.js is super popular. Like ... really, extremely popular. But it's also changing. Slowly but steadily. Not alone but instead with its ...",
    thumbnail: "https://i.ytimg.com/vi/1LkOa7Ky2ak/default.jpg",
    duration: null,
  },
];

const HYDRATED_VIDEOS = [
  {
    id: "2OTq15A5s0Y",
    title: "7 better ways to create a React app",
    description:
      "What is the best tool for starting a new React project in 2023? Let's look at 7 good alternatives to create-react-app for starting a new ReactJS web development project. \n\nSubscribe to @nxdevtools for more awesome dev content!\n\n#javascript #webdevelopment #reactjs \n\n💬 Chat with Me on Discord\n\nhttps://discord.gg/fireship\n\n🔗 Resources\n\n- React Apps with Nx https://nx.dev/getting-started/react-standalone-tutorial\n- Create React App Github Issue https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-1409720741\n- 10 Rendering Patterns on the Web https://youtu.be/Dkx5ydvtpCA\n\n🔥 Get More Content - Upgrade to PRO\n\nUpgrade at https://fireship.io/pro\nUse code YT25 for 25% off PRO access \n\n🎨 My Editor Settings\n\n- Atom One Dark \n- vscode-icons\n- Fira Code Font\n\n🔖 Topics Covered\n\n- How to start react project as a beginner\n- Getting started with Vite for React\n- Build standalone react apps with Nx\n- Getting started with Next.js\n- Next.js vs Remix\n- Gatsby vs Astro",
    thumbnail: "https://i.ytimg.com/vi/2OTq15A5s0Y/default.jpg",
    duration: "PT1H1M1S",
  },
  {
    id: "NhUr8cwDiiM",
    title: "React JS // Dicionário do Programador",
    description:
      "🧠 𝗘𝗦𝗧𝗨𝗗𝗘 𝗡𝗔 𝗖𝗢𝗟𝗟𝗔𝗕𝗣𝗟𝗔𝗬 → https://codft.me/cursopluginswordpress\nReact é Lib ou Framework? No papel é uma lib mas na prática se tornou um ecossistema para desenvolvimento Front-End de aplicações super popular que resolveu problemas importantes como eficiência e flexibilidade.\nEssa tecnologia criada pelo Facebook, sem dúvida, rescreveu a história da criação de User Interfaces.\nSe você quer entender sobre o poder do ReactJS e como ele chegou até aqui esse vídeo é pra você.\n\n📝 𝗟𝗶𝗻𝗸𝘀 𝗖𝗶𝘁𝗮𝗱𝗼𝘀\n→  Site oficial ReactJS: https://reactjs.org/\n\n📡 𝗦𝗶𝗴𝗮 𝗮𝘀 𝗿𝗲𝗱𝗲𝘀 𝗱𝗼 𝗖𝗗𝗙𝗧𝗩\n→ https://linktr.ee/codigofontetv\n\n📸𝗜𝗻𝘀𝘁𝗮𝗴𝗿𝗮𝗺\n→ https://www.instagram.com/codigofontetv/\n\n☕ 𝗖𝗹𝘂𝗯𝗲 𝗱𝗼𝘀 𝗖𝗗𝗙𝘀 𝗻𝗼 𝗬𝗼𝘂𝘁𝘂𝗯𝗲\n→ https://codft.me/clubecdfs\n\n▸ 𝗛𝗢𝗦𝗧𝗚𝗔𝗧𝗢𝗥\n📢 Vagas e Oportunidades: https://codft.me/hostgatorjobs\n\n𝑵ó𝒔 ❤️ 𝒓𝒆𝒄𝒆𝒃𝒆𝒓 𝒑𝒓𝒆𝒔𝒆𝒏𝒕𝒆𝒔, 𝒄𝒂𝒓𝒕𝒂𝒔, 𝒃𝒓𝒊𝒏𝒅𝒆𝒔 𝒆 𝒎𝒊𝒎𝒐𝒔.\nCaixa Postal: 91735 - Cep: 25620-972\nPetrópolis / RJ\n\n🤝 Roteiro em colaboração com João Alves\n💻 Edição e Áudio: RW Studio\n🔗 Um vídeo do site Código Fonte\n\n#React #FrontEnd #JavaScript",
    thumbnail: "https://i.ytimg.com/vi/NhUr8cwDiiM/default.jpg",
    duration: "PT10M4S",
  },
  {
    id: "1LkOa7Ky2ak",
    title: "Why React.js is taking a new direction",
    description:
      "React.js is super popular. Like ... really, extremely popular.\nBut it's also changing. Slowly but steadily. Not alone but instead with its entire ecosystem.\n\nLearn all about React with my bestselling course: https://acad.link/reactjs\nOr with my brand-new book: https://www.amazon.com/React-Key-Concepts-Consolidate-knowledge-ebook/dp/B0B3XRRYHN\nBuild fullstack React apps with NextJS: https://acad.link/nextjs\nBuild fullstack React apps with Remix: https://acad.link/remix\n\nJoin our Academind Community on Discord: https://academind.com/community\n\nCheck out all our other courses: https://academind.com/courses\n\n----------\n\n• Go to https://www.academind.com and subscribe to our newsletter to stay updated and to get exclusive content & discounts\n• Follow @maxedapps and @academind_real on Twitter\n• Follow @academind_real on Instagram: https://www.instagram.com/academind_real\n• Join our Facebook community on https://www.facebook.com/academindchannel/\n\nSee you in the videos!\n\n----------\n\nAcademind is your source for online education in the areas of web development, frontend web development, backend web development, programming, coding and data science! No matter if you are looking for a tutorial, a course, a crash course, an introduction, an online tutorial or any related video, we try our best to offer you the content you are looking for. Our topics include Angular, React, Vue, Html, CSS, JavaScript, TypeScript, Redux, Nuxt.js, RxJs, Bootstrap, Laravel, Node.js, Progressive Web Apps (PWA), Ionic, React Native, Regular Expressions (RegEx), Stencil, Power BI, Amazon Web Services (AWS), Firebase or other topics, make sure to have a look at this channel or at academind.com to find the learning resource of your choice!",
    thumbnail: "https://i.ytimg.com/vi/1LkOa7Ky2ak/default.jpg",
    duration: "PT5M21S",
  },
];

describe("HydrateVideos", () => {
  it("should split the videos into chunks and return the ids", () => {
    const chunks = splitIntoChunksOfIds(VIDEOS_TO_HYDRATE, 2);

    expect(chunks).toEqual([["2OTq15A5s0Y", "NhUr8cwDiiM"], ["1LkOa7Ky2ak"]]);
  });

  it("should return a list of hydrated videos", async () => {
    const httpClient = new HttpClientMock<IApiVideoDetailResponse>({
      items: API_DETAIL_RESPONSE_ITEMS,
    });

    const result = await hydrateVideos({
      httpClient,
      videos: VIDEOS_TO_HYDRATE,
    });

    expect(result).toEqual(HYDRATED_VIDEOS);
  });
});
