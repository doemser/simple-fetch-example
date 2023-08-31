import { useState } from "react";

export default function Home() {
  const [firstThing, setFirstThing] = useState("");
  const [loadFirst, setLoadFirst] = useState(false);

  const [secondThing, setSecondThing] = useState("");
  const [loadSecond, setLoadSecond] = useState(false);

  async function fetchSomething() {
    try {
      setLoadFirst(true);
      const responseFirst = await fetch("/api/first");
      const firstData = await responseFirst.json();
      setFirstThing(firstData.name);
      setLoadFirst(false);

      setLoadSecond(true);
      const responseSecond = await fetch("/api/second");
      const secondData = await responseSecond.json();
      setSecondThing(secondData.name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadSecond(false);
    }
  }

  return (
    <>
      <p>First thing: {loadFirst ? "loading.." : firstThing}</p>
      <p>Second thing: {loadSecond ? "loading.." : secondThing}</p>
      <hr />
      <button onClick={fetchSomething}>fetch</button>
    </>
  );
}
