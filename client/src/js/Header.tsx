import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "../scss/Header.scss";

interface Props {}

const Header = ({  }: Props) => {
  return <header>
      <div>반갑습니다! 오현석의 페이지입니다!</div>
  </header>
};

ReactDOM.render(<Header />, document.getElementById('header'));