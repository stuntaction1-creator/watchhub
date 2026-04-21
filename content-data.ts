export type ContentCategory =
  | "drama"
  | "entertainment"
  | "documentary"
  | "series";

export interface ContentItem {
  id: string;
  title: string;
  titleKo: string;
  category: ContentCategory;
  genre: string;
  rating: string;
  year: number;
  episodes?: number;
  duration: string;
  priceInPi: number;
  description: string;
  thumbnail: string;
  banner: string;
  featured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  tags: string[];
  cast?: string[];
  color: string;
}

export const CONTENT_DATA: ContentItem[] = [
  /* ─── Dramas ─── */
  {
    id: "d1",
    title: "Neon Dynasty",
    titleKo: "네온 왕조",
    category: "drama",
    genre: "SF 드라마",
    rating: "9.1",
    year: 2025,
    episodes: 12,
    duration: "52분/편",
    priceInPi: 1,
    description:
      "Pi Network가 모든 거래를 뒷받침하는 근미래 도시에서, 한 해커가 탈중앙화 세계를 뒤흔들 음모를 발견한다. Web3 시대를 정의하는 사이버펑크 스릴러.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=675&fit=crop&q=85",
    featured: true,
    isTrending: true,
    tags: ["액션", "스릴러", "Web3"],
    cast: ["카이 타나카", "미라 솔라스", "덱스 오카포"],
    color: "#04021a",
  },
  {
    id: "d2",
    title: "Seoul Nights",
    titleKo: "서울의 밤",
    category: "drama",
    genre: "로맨스 드라마",
    rating: "9.0",
    year: 2025,
    episodes: 16,
    duration: "58분/편",
    priceInPi: 1,
    description:
      "서울 하늘 아래, 전통과 기술 사이에서 갈등하는 두 남녀의 사랑 이야기. 숨 막히는 영상미와 잔잔하게 울리는 OST가 인상적인 작품.",
    thumbnail: "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=1200&h=675&fit=crop&q=85",
    featured: true,
    isTrending: true,
    tags: ["로맨스", "K-드라마", "감성"],
    cast: ["박지훈", "임서연", "오채원"],
    color: "#020c18",
  },
  {
    id: "d3",
    title: "City of Gold",
    titleKo: "황금의 도시",
    category: "drama",
    genre: "사극",
    rating: "8.9",
    year: 2024,
    episodes: 20,
    duration: "56분/편",
    priceInPi: 1,
    description:
      "세 왕조에 걸쳐 황금, 권력, 배신이 제국을 바꿔나가는 대하 사극. 웅장한 제작과 역대급 스토리라인.",
    thumbnail: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1200&h=675&fit=crop&q=85",
    isTrending: true,
    tags: ["사극", "대서사", "액션"],
    cast: ["아마라 디알로", "천웨이", "레자 카리미"],
    color: "#1a0c02",
  },
  {
    id: "d4",
    title: "Star Crossed",
    titleKo: "별의 교차",
    category: "drama",
    genre: "판타지 드라마",
    rating: "8.5",
    year: 2025,
    episodes: 14,
    duration: "50분/편",
    priceInPi: 1,
    description:
      "고대 예언에 따라 현대 도쿄에서 환생한 두 천상의 존재. 신화와 현대 로맨스가 만나는 판타지 드라마.",
    thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=675&fit=crop&q=85",
    isNew: true,
    tags: ["판타지", "로맨스", "신화"],
    cast: ["하나 모리", "레온 비달"],
    color: "#02021e",
  },
  {
    id: "d5",
    title: "Midnight Bloom",
    titleKo: "자정의 꽃",
    category: "drama",
    genre: "멜로드라마",
    rating: "8.6",
    year: 2024,
    episodes: 18,
    duration: "55분/편",
    priceInPi: 1,
    description:
      "비밀을 공유한 세 여성이 사랑, 야망, 희생 속에서 살아가는 멜로드라마. 이 시대를 정의하는 연기와 깊이 있는 감정선.",
    thumbnail: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&h=675&fit=crop&q=85",
    isNew: true,
    tags: ["멜로", "여성서사", "도시"],
    cast: ["최유나", "파티마 알-하산", "엘레나 로시"],
    color: "#160208",
  },
  {
    id: "d6",
    title: "Harvest Moon",
    titleKo: "추수의 달",
    category: "drama",
    genre: "시골 드라마",
    rating: "8.1",
    year: 2024,
    episodes: 10,
    duration: "46분/편",
    priceInPi: 0.8,
    description:
      "동남아시아 농촌 마을에 대기업이 들어서면서 전통과 현대가 충돌하는 이야기. 담담하고 가슴 저린 인간 드라마.",
    thumbnail: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=675&fit=crop&q=85",
    tags: ["가족", "사회극", "감동"],
    color: "#081604",
  },
  {
    id: "d7",
    title: "Glass Empire",
    titleKo: "유리 제국",
    category: "drama",
    genre: "정치 드라마",
    rating: "8.7",
    year: 2025,
    episodes: 16,
    duration: "60분/편",
    priceInPi: 1,
    description:
      "암호화폐로 운영되는 가상의 도시국가에서 펼쳐지는 치열한 권력 다툼. 냉혹한 정치극과 Web3 세계관의 완벽한 결합.",
    thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&h=675&fit=crop&q=85",
    isNew: true,
    isTrending: true,
    tags: ["정치", "권력", "블록체인"],
    cast: ["나탈리아 하비에르", "아킨 아데바요"],
    color: "#0c0c14",
  },

  /* ─── Documentaries ─── */
  {
    id: "doc1",
    title: "The Last Frontier",
    titleKo: "마지막 경계",
    category: "documentary",
    genre: "자연 다큐멘터리",
    rating: "9.2",
    year: 2025,
    duration: "2시간 14분",
    priceInPi: 0.5,
    description:
      "지구의 미탐험 지역을 8K 드론 기술로 촬영한 몰입형 자연 다큐멘터리. 환경운동가 아다에제 오비의 내레이션이 감동을 더한다.",
    thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=675&fit=crop&q=85",
    featured: true,
    isNew: true,
    tags: ["자연", "탐험", "8K"],
    cast: ["내레이터: 아다에제 오비"],
    color: "#02140a",
  },
  {
    id: "doc2",
    title: "Pi Pioneers",
    titleKo: "파이 파이오니어스",
    category: "documentary",
    genre: "기술 다큐멘터리",
    rating: "8.7",
    year: 2025,
    duration: "1시간 48분",
    priceInPi: 0.5,
    description:
      "세계에서 가장 접근성 높은 암호화폐를 만든 글로벌 커뮤니티의 숨겨진 이야기. Pi 파이오니어들의 독점 인터뷰와 개발 비화.",
    thumbnail: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200&h=675&fit=crop&q=85",
    isTrending: true,
    tags: ["Pi Network", "암호화폐", "커뮤니티"],
    color: "#02041e",
  },
  {
    id: "doc3",
    title: "Ocean Deep",
    titleKo: "심해",
    category: "documentary",
    genre: "과학 다큐멘터리",
    rating: "8.8",
    year: 2024,
    duration: "1시간 34분",
    priceInPi: 0.5,
    description:
      "심해 해구에서 촬영된 전례 없는 영상으로 미지의 생물 세계를 공개한다. 3관왕 수상 작품으로 수중 촬영의 새 기준을 제시.",
    thumbnail: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=1200&h=675&fit=crop&q=85",
    tags: ["해양", "과학", "발견"],
    color: "#02101e",
  },
  {
    id: "doc4",
    title: "Mind Matters",
    titleKo: "마음의 문제",
    category: "documentary",
    genre: "정신건강 다큐",
    rating: "9.3",
    year: 2025,
    duration: "1시간 22분",
    priceInPi: 0.5,
    description:
      "신경과학자와 정신건강 활동가들이 인간의 감정, 회복력, 연결에 관한 과학을 탐구한다. 필수적이고 공감 가득한 다큐멘터리.",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=675&fit=crop&q=85",
    isNew: true,
    tags: ["건강", "과학", "인식"],
    color: "#140218",
  },
  {
    id: "doc5",
    title: "Quiet Giants",
    titleKo: "고요한 거인들",
    category: "documentary",
    genre: "야생동물 다큐",
    rating: "9.1",
    year: 2024,
    duration: "1시간 18분",
    priceInPi: 0.5,
    description:
      "3대륙 코끼리 가족의 10년에 걸친 귀한 기록. 생존, 슬픔, 기쁨을 놀라운 친밀감으로 포착했다.",
    thumbnail: "https://images.unsplash.com/photo-1551524163-d31192ef6117?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1551524163-d31192ef6117?w=1200&h=675&fit=crop&q=85",
    tags: ["야생동물", "자연", "가족"],
    color: "#0c1604",
  },

  /* ─── Entertainment ─── */
  {
    id: "e1",
    title: "Global Laughs",
    titleKo: "글로벌 웃음",
    category: "entertainment",
    genre: "코미디 버라이어티",
    rating: "8.0",
    year: 2025,
    episodes: 20,
    duration: "44분/편",
    priceInPi: 0.3,
    description:
      "전 세계 최고의 스탠드업 코미디언과 버라이어티 아티스트들의 문화를 초월한 유머. 매주 금요일 새 에피소드, Pi 투표로 순위 결정.",
    thumbnail: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=1200&h=675&fit=crop&q=85",
    isTrending: true,
    tags: ["코미디", "버라이어티", "글로벌"],
    color: "#141002",
  },
  {
    id: "e2",
    title: "Arena King",
    titleKo: "아레나 킹",
    category: "entertainment",
    genre: "리얼리티 경쟁",
    rating: "7.8",
    year: 2025,
    episodes: 12,
    duration: "62분/편",
    priceInPi: 0.3,
    description:
      "50인의 참가자가 극한의 정신·체력 시험을 거쳐 최후의 Pi Network 상금을 노린다. 동맹, 배신, 그리고 잊을 수 없는 우승자.",
    thumbnail: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1200&h=675&fit=crop&q=85",
    isNew: true,
    tags: ["리얼리티", "경쟁", "Pi 상금"],
    color: "#180204",
  },
  {
    id: "e3",
    title: "Spark & Static",
    titleKo: "스파크 앤 스태틱",
    category: "entertainment",
    genre: "음악 오디션",
    rating: "8.3",
    year: 2024,
    episodes: 10,
    duration: "42분/편",
    priceInPi: 0.3,
    description:
      "전 세계 신인 아티스트들이 글로벌 뮤직 센세이션 타이틀을 향해 경쟁한다. Pi 기반 팬 투표로 실제 결과가 바뀐다.",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=675&fit=crop&q=85",
    isTrending: true,
    tags: ["음악", "경쟁", "아티스트"],
    color: "#060216",
  },
  {
    id: "e4",
    title: "Chef Wars",
    titleKo: "셰프 워즈",
    category: "entertainment",
    genre: "요리 경쟁",
    rating: "8.5",
    year: 2025,
    episodes: 14,
    duration: "48분/편",
    priceInPi: 0.3,
    description:
      "미슐랭 스타 심사위원이 평가하는 세계적 셰프들의 고강도 요리 대결. 압박감, 창의력, 플레이팅 예술이 매 에피소드 충돌.",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=675&fit=crop&q=85",
    isNew: true,
    tags: ["음식", "경쟁", "요리"],
    color: "#180c02",
  },

  /* ─── Series ─── */
  {
    id: "s1",
    title: "The Block",
    titleKo: "더 블록",
    category: "series",
    genre: "기술 스릴러",
    rating: "9.2",
    year: 2025,
    episodes: 8,
    duration: "54분/편",
    priceInPi: 1,
    description:
      "블록체인 신원으로 운영되는 세계에서, 디지털 흔적을 지운 연쇄 살인마를 추적하는 형사. Web3 세대를 위한 장르 정의 스릴러.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop&q=85",
    featured: true,
    isTrending: true,
    tags: ["범죄", "미스터리", "블록체인"],
    cast: ["레이 보스", "레나 마르케티", "타리크 선"],
    color: "#020e18",
  },
  {
    id: "s2",
    title: "The Signal",
    titleKo: "더 시그널",
    category: "series",
    genre: "SF 시리즈",
    rating: "8.7",
    year: 2025,
    episodes: 8,
    duration: "51분/편",
    priceInPi: 1,
    description:
      "설명 불가한 신호가 지구 모든 블록체인 네트워크를 교란시킨다. 여섯 명의 낯선 이들이 문명 붕괴 전에 암호를 풀어야 한다.",
    thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=675&fit=crop&q=85",
    isNew: true,
    tags: ["SF", "미스터리", "블록체인"],
    cast: ["알리시아 몬토야", "핀 오브라이언", "스키 야마모토"],
    color: "#02061a",
  },
  {
    id: "s3",
    title: "Iron Veil",
    titleKo: "철의 장막",
    category: "series",
    genre: "스파이 스릴러",
    rating: "8.8",
    year: 2024,
    episodes: 6,
    duration: "60분/편",
    priceInPi: 1,
    description:
      "심층 잠복 요원이 정부에 대한 충성과 탈중앙화 운동 사이에서 선택을 강요받는다. 정밀한 각본, 숨막히는 페이스.",
    thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=675&fit=crop&q=85",
    isTrending: true,
    tags: ["스파이", "서스펜스", "액션"],
    cast: ["니나 바스케스", "오마르 할리드"],
    color: "#100e10",
  },
  {
    id: "s4",
    title: "Velocity",
    titleKo: "벨로시티",
    category: "series",
    genre: "액션 시리즈",
    rating: "8.5",
    year: 2025,
    episodes: 10,
    duration: "46분/편",
    priceInPi: 1,
    description:
      "무법 미래 도시를 누비는 엘리트 배달팀 — 가장 빠른 자가 살아남는다. 처절한 스턴트와 멈추지 않는 아드레날린.",
    thumbnail: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&h=675&fit=crop&q=85",
    isNew: true,
    isTrending: true,
    tags: ["액션", "미래", "레이싱"],
    color: "#180800",
  },
  {
    id: "s5",
    title: "Dark Web",
    titleKo: "다크 웹",
    category: "series",
    genre: "사이버펑크",
    rating: "8.9",
    year: 2025,
    episodes: 10,
    duration: "58분/편",
    priceInPi: 1,
    description:
      "지하 해커 그룹이 세계 최고의 기밀을 숨긴 인터넷의 숨겨진 층을 발견한다. 네온 빛이 가득한 사이버펑크 스릴러.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop&q=80",
    banner:    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=675&fit=crop&q=85",
    isNew: true,
    tags: ["사이버펑크", "해킹", "스릴러"],
    cast: ["조이 리브스", "마커스 은코시", "프리야 센"],
    color: "#04021a",
  },
];

/* ── Derived lists ── */
export const FEATURED_CONTENT = CONTENT_DATA.filter((c) => c.featured);
export const TRENDING_CONTENT = CONTENT_DATA.filter((c) => c.isTrending);
export const NEW_CONTENT      = CONTENT_DATA.filter((c) => c.isNew);
export const DRAMAS           = CONTENT_DATA.filter((c) => c.category === "drama");
export const DOCUMENTARIES    = CONTENT_DATA.filter((c) => c.category === "documentary");
export const ENTERTAINMENT    = CONTENT_DATA.filter((c) => c.category === "entertainment");
export const SERIES           = CONTENT_DATA.filter((c) => c.category === "series");

/* Continue watching mock data (first 4 items with fake progress) */
export const CONTINUE_WATCHING = CONTENT_DATA.slice(0, 4).map((item, i) => ({
  ...item,
  progress: [42, 68, 15, 82][i],
  episode:  [3,   7,  1,  5][i],
}));

/* ── ALL_CONTENT alias ── */
export const ALL_CONTENT = CONTENT_DATA;

/* ── Legacy aliases for older components ── */
export const HERO_ITEMS   = FEATURED_CONTENT;
export const NEW_RELEASES = NEW_CONTENT;
export const TRENDING     = TRENDING_CONTENT;
export const KDRAMA       = DRAMAS;
export const MOVIES       = CONTENT_DATA.filter((c) => c.category === "drama").slice(0, 4);
export const ANIME        = CONTENT_DATA.filter((c) => c.category === "series").slice(0, 4);

/* ── Channels ── */
export interface Channel {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export const CHANNELS: Channel[] = [
  {
    id: "ch1",
    name: "드라마 TV",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop&q=80",
    color: "#1a0530",
  },
  {
    id: "ch2",
    name: "다큐 HD",
    logo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop&q=80",
    color: "#021a0c",
  },
  {
    id: "ch3",
    name: "예능 LIVE",
    logo: "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=100&h=100&fit=crop&q=80",
    color: "#1a0e02",
  },
  {
    id: "ch4",
    name: "Pi 오리지널",
    logo: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=100&h=100&fit=crop&q=80",
    color: "#0a021a",
  },
  {
    id: "ch5",
    name: "시리즈 4K",
    logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop&q=80",
    color: "#021018",
  },
  {
    id: "ch6",
    name: "키즈 채널",
    logo: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100&h=100&fit=crop&q=80",
    color: "#180a02",
  },
];

export const CATEGORIES = [
  { id: "all",           label: "전체"  },
  { id: "drama",         label: "드라마" },
  { id: "series",        label: "시리즈" },
  { id: "entertainment", label: "예능"  },
  { id: "documentary",   label: "다큐"  },
] as const;

export const GENRES = [
  "SF",
  "로맨스",
  "스릴러",
  "범죄",
  "코미디",
  "판타지",
  "사극",
  "자연",
  "야생동물",
  "음악",
] as const;

export const GENRE_IMAGES: Record<string, string> = {
  "SF":       "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=220&fit=crop&q=75",
  "로맨스":   "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=220&fit=crop&q=75",
  "스릴러":   "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=220&fit=crop&q=75",
  "범죄":     "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop&q=75",
  "코미디":   "https://images.unsplash.com/photo-1527224538127-2104bb71c51b?w=400&h=220&fit=crop&q=75",
  "판타지":   "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=220&fit=crop&q=75",
  "사극":     "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=220&fit=crop&q=75",
  "자연":     "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=220&fit=crop&q=75",
  "야생동물": "https://images.unsplash.com/photo-1551524163-d31192ef6117?w=400&h=220&fit=crop&q=75",
  "음악":     "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=220&fit=crop&q=75",
};
