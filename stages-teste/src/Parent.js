import React, { useState, useEffect } from "react";
import { Container, Heading } from "styled-minimal";
import data from './data.json';
import "./styles.css";

import Child from "./Child";

export default function Parent() {
  // Armazena o array a ser trabalhado
  const [stepsArr, setStepsArr] = useState([]);
  const [message, setMessage] = useState(null);

  // Gera um novo array na primeira renderização
  // Este novo array possui estrutura adequada à feature
  useEffect(() => {
    setStepsArr(data.steps.map(({ key, value }, index) => ({
      key,
      color: value,
      duration: data.durations[key],
      shouldRender: index === 0 ? true : false,
      expired: false,
    })));
  }, []);

  // Este callback, com base no Child, atualiza o stepsArr
  // definindo o próximo componente a ser renderizado
  const handleExpired = (index) => {
    setStepsArr((oldState) => oldState.map((curObj, curIndex) => {
      if (curIndex === index) {
        return {
          ...curObj,
          expired: true,
        };
      }
      if (curIndex === index + 1) {
        return {
          ...curObj,
          shouldRender: true,
        };
      }
      return curObj;
    }));
  };

  // Este useEffect assiste mudanças no stepsArr para verificar
  // se todos os Child renderizaram
  useEffect(() => {
    const isDone = stepsArr.every(({ expired }) => expired === true);
    if (isDone && stepsArr.length > 0) {
      setMessage(`It's done!`);
    }
  }, [stepsArr]);

  return (
    <Container>
      <Heading mb={4} textAlign="center">
        Stages<br/>{message}
      </Heading>
      {stepsArr.map(({ key, color, duration, shouldRender }, index) => (
        shouldRender && (
          <Child
            key={key}
            index={index}
            color={color}
            duration={duration}
            onExpired={handleExpired}
          />
        )
      ))}
    </Container>
  );
}
