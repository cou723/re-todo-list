const LogoIcon = (props: { size?: number }) => (
  <svg
    width={63 * (props.size ?? 1)}
    height={19 * (props.size ?? 1)}
    viewBox="0 0 63 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.17548 5.39443V16.6818H3.6243V5.39443H0V3.2947H9.79978V5.39443H6.17548Z"
      fill="black"
    />
    <path
      d="M20.4499 9.9319C20.4499 11.1473 20.3082 12.1955 20.0247 13.0764C19.748 13.9572 19.3633 14.681 18.8706 15.2478C18.3847 15.8146 17.811 16.2345 17.1496 16.5076C16.4949 16.7808 15.793 16.9173 15.0439 16.9173C13.3026 16.9173 11.9933 16.3335 11.1159 15.1659C10.2385 13.9914 9.79978 12.2877 9.79978 10.0548C9.79978 8.83935 9.93813 7.7912 10.2148 6.91033C10.4983 6.02947 10.883 5.30566 11.369 4.7389C11.8616 4.17215 12.4353 3.7522 13.09 3.47907C13.7514 3.20593 14.4567 3.06936 15.2058 3.06936C16.9471 3.06936 18.2565 3.65319 19.1339 4.82084C20.0112 5.9885 20.4499 7.69218 20.4499 9.9319ZM17.8178 10.0548C17.8178 8.47062 17.6085 7.28931 17.1901 6.51087C16.7717 5.73244 16.0832 5.34322 15.1249 5.34322C14.6457 5.34322 14.2373 5.44564 13.8999 5.65049C13.5624 5.84852 13.2823 6.14214 13.0596 6.53136C12.8436 6.92058 12.685 7.40198 12.5838 7.97556C12.4826 8.54232 12.4319 9.19443 12.4319 9.9319C12.4319 11.5161 12.6412 12.6974 13.0596 13.4758C13.4848 14.2543 14.1732 14.6435 15.1249 14.6435C15.604 14.6435 16.0124 14.5445 16.3498 14.3465C16.694 14.1416 16.9741 13.8446 17.1901 13.4553C17.4061 13.0661 17.5647 12.5881 17.6659 12.0214C17.7672 11.4478 17.8178 10.7923 17.8178 10.0548Z"
      fill="black"
    />
    <path
      d="M31.6873 9.81923C31.6873 10.8571 31.5591 11.7995 31.3026 12.6462C31.0529 13.4929 30.658 14.2167 30.1181 14.8176C29.5849 15.4117 28.8999 15.8726 28.063 16.2004C27.2261 16.5213 26.2238 16.6818 25.0562 16.6818H21.6952V3.2947H25.613C26.6254 3.2947 27.5096 3.42444 28.2655 3.68392C29.0281 3.93657 29.6625 4.3292 30.1687 4.86182C30.6749 5.39443 31.0529 6.07044 31.3026 6.88985C31.5591 7.70925 31.6873 8.68571 31.6873 9.81923ZM29.0146 9.98311C29.0146 9.2593 28.9573 8.61402 28.8425 8.04726C28.7278 7.4805 28.5321 7.00252 28.2553 6.6133C27.9854 6.21725 27.6209 5.9168 27.162 5.71195C26.703 5.5071 26.1327 5.40467 25.4511 5.40467H24.1856V14.5718H25.279C26.5006 14.5718 27.4286 14.2031 28.063 13.4656C28.6974 12.7281 29.0146 11.5673 29.0146 9.98311Z"
      fill="black"
    />
    <path
      d="M43.2486 9.9319C43.2486 11.1473 43.1069 12.1955 42.8234 13.0764C42.5467 13.9572 42.162 14.681 41.6693 15.2478C41.1834 15.8146 40.6097 16.2345 39.9483 16.5076C39.2936 16.7808 38.5917 16.9173 37.8425 16.9173C36.1012 16.9173 34.7919 16.3335 33.9145 15.1659C33.0371 13.9914 32.5984 12.2877 32.5984 10.0548C32.5984 8.83935 32.7368 7.7912 33.0135 6.91033C33.297 6.02947 33.6817 5.30566 34.1676 4.7389C34.6603 4.17215 35.234 3.7522 35.8886 3.47907C36.5501 3.20593 37.2553 3.06936 38.0045 3.06936C39.7458 3.06936 41.0551 3.65319 41.9325 4.82084C42.8099 5.9885 43.2486 7.69218 43.2486 9.9319ZM40.6164 10.0548C40.6164 8.47062 40.4072 7.28931 39.9888 6.51087C39.5703 5.73244 38.8819 5.34322 37.9235 5.34322C37.4443 5.34322 37.036 5.44564 36.6985 5.65049C36.3611 5.84852 36.081 6.14214 35.8583 6.53136C35.6423 6.92058 35.4837 7.40198 35.3825 7.97556C35.2812 8.54232 35.2306 9.19443 35.2306 9.9319C35.2306 11.5161 35.4398 12.6974 35.8583 13.4758C36.2835 14.2543 36.9719 14.6435 37.9235 14.6435C38.4027 14.6435 38.811 14.5445 39.1485 14.3465C39.4927 14.1416 39.7728 13.8446 39.9888 13.4553C40.2047 13.0661 40.3633 12.5881 40.4646 12.0214C40.5658 11.4478 40.6164 10.7923 40.6164 10.0548Z"
      fill="black"
    />
    <path d="M46.7109 19V0H52.036V1.94609H48.9888V17.0539H52.036V19H46.7109Z" fill="#5D4DBF" />
    <path d="M57.6952 19V17.0539H60.7222V1.94609H57.6952V0H63V19H57.6952Z" fill="#5D4DBF" />
  </svg>
);

export default LogoIcon;
