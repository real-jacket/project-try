import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './App.css';

function Box({ children }) {
  return <div className="box">{children}</div>;
}

function Circle({ children }) {
  return <div className="circle">{children}</div>;
}

function App() {
  const [reversed, setReversed] = useState(false);
  const app = useRef(null);
  // store the timeline in a ref.
  const tl = useRef<GSAPTimeline>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // add a box and circle animation to our timeline and play on first render
      console.log('creating timeline');
      tl.current && tl.current.progress(0).kill();
      tl.current = gsap
        .timeline()
        .to('.box', {
          rotation: 360,
        })
        .to('.circle', {
          x: 100,
        });
    }, app);
    return () => ctx.revert();
  }, []);

  const priceRef = useRef(null);
  const [n, setN] = useState(0);
  const [price, setPrice] = useState({ value: 22 });

  useLayoutEffect(() => {
    const target = { x: price.value };
    console.log('target: ', target);
    const ctx = gsap.context(() => {
      console.log('n: ', n);
      gsap.to(target, {
        duration: 0.5,
        x: Number(n) || 0,
        roundProps: 'x',
        onUpdate: () => setPrice({ value: target.x }),
      });
      return () => ctx.revert();
    });
  }, [n]);

  return (
    <div className="app" ref={app}>
      <div>
        <button
          onClick={() => {
            setN(n + +(Math.random() * 100).toFixed(0));
            setReversed(!reversed);
            tl?.current?.reversed?.(!reversed);
          }}
        >
          Toggle
        </button>
      </div>
      <div>{price.value}</div>
      <Box>box</Box>
      <Circle>circle</Circle>
    </div>
  );
}

export default App;
