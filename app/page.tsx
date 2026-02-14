"use client";

import Image from "next/image";


import { useState, useEffect } from "react";

import styles from '@/app/ui/home.module.css';

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("カウントが変わった:", count);
  }, [count]);

  return (

    
    <main style={{ padding: "40px" }}>
      <h1>拓海のNext.jsスタート🔥</h1>
<Image
  src="https://via.placeholder.com/150"
  width={150}
  height={150}
  alt="test"
/>

      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>

    </main>
  );
}
