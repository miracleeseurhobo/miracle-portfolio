import { useState, useEffect } from "react";

const BARS: string[][] = [
  ["end", "top"],
  ["side", "top", "left"],
  ["side", "top", "right"],
  ["middle"],
  ["side", "bottom", "left"],
  ["side", "bottom", "right"],
  ["end", "bottom"],
];

function Digit({ value }: { value: string }) {
  return (
    <figure className="lc-digit" data-digit={value}>
      {BARS.map((cls, i) => (
        <span key={i} className={cls.join(" ")} />
      ))}
    </figure>
  );
}

function DigitGroup({ value, extra = "" }: { value: number; extra?: string }) {
  const s = String(value).padStart(2, "0");
  return (
    <div className={`lc-group ${extra}`.trim()}>
      <Digit value={s[0]} />
      <Digit value={s[1]} />
    </div>
  );
}

function Digits({ value }: { value: number }) {
  return (
    <div className="lc-digits">
      <DigitGroup value={value} />
      <DigitGroup value={value} extra="lc-shadow lc-shadow1" />
      <DigitGroup value={value} extra="lc-shadow lc-shadow2" />
    </div>
  );
}

function Colon() {
  return (
    <div className="lc-colon-group">
      <figure className="lc-colon"><span /></figure>
      <figure className="lc-colon lc-shadow lc-shadow1"><span /></figure>
      <figure className="lc-colon lc-shadow lc-shadow2"><span /></figure>
    </div>
  );
}

const CSS = `
  .lc-clock {
    font-size: 1px;
    display: inline-block;
    perspective: 45rem;
    transform-style: preserve-3d;
    vertical-align: middle;
    overflow: visible;
  }
  .lc-wrapper {
    animation: lc-camera-rotate 40s ease-in-out forwards infinite;
    transform-style: preserve-3d;
  }
  .lc-main {
    display: flex;
    color: rgba(255, 255, 255, 0.5);
    gap: 2rem;
    position: relative;
    align-items: center;
    justify-content: center;
    animation: lc-camera-pan 30s linear forwards infinite;
    translate: 0rem 1rem 10rem;
    transform-style: preserve-3d;
  }
  .lc-digits {
    transform-style: preserve-3d;
    position: relative;
  }
  .lc-group {
    display: flex;
    gap: 2rem;
  }
  .lc-digit {
    position: relative;
    height: 16rem;
    aspect-ratio: 1 / 2;
    filter: drop-shadow(0px 0px 4px currentColor) drop-shadow(0px 0px 10px currentColor);
    margin: 0;
  }
  .lc-digit span {
    --act: 0;
    --signX: 1;
    --signY: 1;
    position: absolute;
    background-color: white;
    transition: all 0.3s cubic-bezier(0.17, 0.67, 0.5, 1.15);
    opacity: calc(0.03 + 0.97 * var(--act));
    transform: scale(var(--signX), var(--signY));
  }
  .lc-digit span.end {
    clip-path: polygon(15% 0%, 7.5% 20%, 25% 100%, 75% 100%, 92.5% 20%, 85% 0%);
    width: 100%;
    height: 10%;
  }
  .lc-digit span.end.top { top: 0; }
  .lc-digit span.end.bottom { top: initial; bottom: 0; --signY: -1; }
  .lc-digit span.side {
    clip-path: polygon(0% 15%, 20% 7.5%, 100% 22.5%, 100% 85%, 20% 95%, 0% 90%);
    height: 50%;
    width: 20%;
  }
  .lc-digit span.side.left { top: 0; left: 0; }
  .lc-digit span.side.left.bottom { top: initial; bottom: 0; --signY: -1; }
  .lc-digit span.side.right { top: 0; left: initial; right: 0; --signX: -1; }
  .lc-digit span.side.right.bottom { top: initial; bottom: 0; --signY: -1; }
  .lc-digit span.middle {
    clip-path: polygon(22.5% 0%, 6.5% 50%, 22.5% 100%, 77.5% 100%, 93.5% 50%, 77.5% 0%);
    top: 45%;
    height: 10%;
    width: 100%;
  }

  /* Segment activation per digit */
  .lc-digit[data-digit="0"] :not(.middle) { --act: 1; }
  .lc-digit[data-digit="1"] .right { --act: 1; }
  .lc-digit[data-digit="2"] :not(.top.left):not(.bottom.right) { --act: 1; }
  .lc-digit[data-digit="3"] :not(.left) { --act: 1; }
  .lc-digit[data-digit="4"] :not(.end):not(.bottom.left) { --act: 1; }
  .lc-digit[data-digit="5"] :not(.top.right):not(.bottom.left) { --act: 1; }
  .lc-digit[data-digit="6"] :not(.top.right) { --act: 1; }
  .lc-digit[data-digit="7"] .top,
  .lc-digit[data-digit="7"] .right { --act: 1; }
  .lc-digit[data-digit="8"] > * { --act: 1; }
  .lc-digit[data-digit="9"] :not(.bottom.left) { --act: 1; }

  /* Colon */
  .lc-colon-group {
    transform-style: preserve-3d;
  }
  .lc-colon {
    margin: 0;
  }
  .lc-colon span {
    display: flex;
    height: 16rem;
    flex-direction: column;
    justify-content: space-evenly;
    width: 4rem;
    align-items: center;
    filter: drop-shadow(0px 0px 4px currentColor) drop-shadow(0px 0px 10px currentColor);
  }
  .lc-colon span::before,
  .lc-colon span::after {
    content: "";
    display: block;
    width: 2rem;
    aspect-ratio: 1 / 1;
    background-color: white;
    border-radius: 2rem;
  }

  /* Shadows */
  .lc-shadow {
    top: 0;
    position: absolute;
    transform-origin: bottom center;
    transform: translateY(1rem) translateZ(2rem) rotateX(-90.1deg);
  }
  .lc-shadow .lc-digit span { opacity: var(--act); }
  .lc-shadow1 {
    opacity: 0.35;
    filter: blur(3px);
  }
  .lc-shadow1 > span,
  .lc-shadow1 .lc-digit {
    mask-image: linear-gradient(to bottom, white, rgba(0, 0, 0, 0));
  }
  .lc-shadow2 {
    opacity: 0.2;
    filter: blur(1px);
  }
  .lc-shadow2 > span,
  .lc-shadow2 .lc-digit {
    opacity: var(--act);
    mask-image: linear-gradient(to top, black, rgba(0, 0, 0, 0) 70%);
  }

  @keyframes lc-camera-rotate {
    0%   { transform: rotateY(-10deg); }
    50%  { transform: rotateY(10deg);  }
    100% { transform: rotateY(-10deg); }
  }
  @keyframes lc-camera-pan {
    0%   { transform: translate(0rem,    0rem);   }
    20%  { transform: translate(1rem,    2rem);   }
    40%  { transform: translate(-2rem,   2.5rem); }
    50%  { transform: translate(-1.5rem, 1.5rem); }
    70%  { transform: translate(-0.5rem, -0.5rem);}
    90%  { transform: translate(1.5rem,  -1rem);  }
    100% { transform: translate(0rem,    0rem);   }
  }
`;

export function LiveClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  return (
    <div className="lc-clock">
      <style>{CSS}</style>
      <div className="lc-wrapper">
        <div className="lc-main">
          <Digits value={h} />
          <Colon />
          <Digits value={m} />
          <Colon />
          <Digits value={s} />
        </div>
      </div>
    </div>
  );
}
